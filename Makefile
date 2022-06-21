help:
	@printf "usage: make [target] ...\n\n"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

# ---------------------------------
# Common project related commands.
# ---------------------------------

install: ## Install external dependencies and resources.
	@yarn
	@pip3 install mkdocs
	@$(MAKE) -C ./apps/prussiascan/ install
	@$(MAKE) -C ./apps/prussiascan.api/ install
	@$(MAKE) -C ./apps/prussiascan.auth/ install
	@$(MAKE) -C ./apps/prussiascan.aux.api/ install

create_resources: ## Create the local resources, such as data tables, buckets, etc.
	@$(MAKE) -C ./apps/prussiascan.api/ create_resources
	@$(MAKE) -C ./apps/prussiascan.auth/ create_resources
	@$(MAKE) -C ./apps/prussiascan.aux.api/ create_resources

list_resources: ## List all local resources
	@$(MAKE) -C ./apps/prussiascan.api/ list_resources

remove_resources: ## Remove all local resources
	@rm -rf ./.localstack/data

migrate_databases: ## Migrate databases of all applications
	@$(MAKE) -C ./apps/prussiascan.aux.api/ migrate_database

run_infra: ## Run the infrastructure locally
	@docker-compose up

stop_infra: ## Run the infrastructure locally
	@docker-compose stop

run: ## Run an application
ifeq ($(app),)
	$(error Please specify the "app" parameter. Example: "make run app=service")
else
	@$(MAKE) -C ./apps/$(app)/ run
endif

run_docs: ## Run the documentation locally
	@mkdocs serve -f docs/mkdocs.yml

ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

export AWS_PAGER=""
AWS:=aws --endpoint-url http://localhost:4566 --profile legacy

LAMBDA_SRC_S3_BUCKET:=gannochenko--legacy--prussiascan.api--lambda-src
LAMBDA_SRC_S3_REGION:=eu-central-1
LAMBDA_SRC_FN_NAME_GLOBAL_PREFIX:=prussiascan-api_
LAMBDA_SRC_ZIP:=latest.zip

help:
	@printf "usage: make [target] ...\n\n"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

# ---------------------------------
# Application related commands.
# ---------------------------------

install:
	@yarn
	@brew install awscli

create_resources: ## Create local resources, such as data tables, buckets, etc.
	@echo "Delete tables"

	-@$(AWS) dynamodb \
    	delete-table \
    	--table-name "prussiascan.api_ObjectCollection"
	-@$(AWS) dynamodb \
		delete-table \
		--table-name "prussiascan.api_Flags"

	@echo "Re-create tables"

	@$(AWS) dynamodb \
		create-table \
		--table-name "prussiascan.api_ObjectCollection" \
		--attribute-definitions \
			AttributeName=id,AttributeType=S \
		--key-schema \
			AttributeName=id,KeyType=HASH \
		--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

	@$(AWS) dynamodb \
		create-table \
		--table-name "prussiascan.api_Flags" \
		--attribute-definitions \
			AttributeName=code,AttributeType=S \
		--key-schema \
			AttributeName=code,KeyType=HASH \
		--provisioned-throughput ReadCapacityUnits=2,WriteCapacityUnits=2

	@echo "Re-create buckets"

	-@$(AWS) s3 rb s3://prussiascans-object-photos --force

	@$(AWS) s3 mb s3://prussiascans-object-photos
	@$(AWS) s3api put-bucket-acl --bucket prussiascans-object-photos --acl public-read

migrate_database: ## Migrate the database

run: ## Run the application locally on the host machine
	@yarn dotenv -e $(ROOT_DIR)/../../.env.local serverless offline start -r eu-central-1 --noTimeout --host 0.0.0.0

list_resources: ## List all available resources
	@$(AWS) dynamodb list-tables
	@$(AWS) s3api list-buckets --query "Buckets[].Name"

mongo2dynamo:
	@yarn dotenv -e $(ROOT_DIR)/../../.env.local dotenv ./script/mongo2dynamo.js

deploy:
ifeq ($(lambda),)
	$(error Please specify the "lambda" parameter. Example: "make deploy lambda=foo")
else
	@aws s3api create-bucket --bucket="$(LAMBDA_SRC_S3_BUCKET)" --region="$(LAMBDA_SRC_S3_REGION)" --create-bucket-configuration LocationConstraint="$(LAMBDA_SRC_S3_REGION)"

	@yarn
	@yarn webpack --config webpack.build.config.js --mode production --entry ./src/lambdas/"$(lambda)"/handler.js -o ./build/lambdas/"$(lambda)"/ || exit
	@cd ./build/lambdas/"$(lambda)"
	@zip ./"$(LAMBDA_SRC_ZIP)" main.js

	@aws s3 cp ./"$(LAMBDA_SRC_ZIP)" s3://"$(LAMBDA_SRC_S3_REGION)"/"$(lambda)"/"$(LAMBDA_SRC_ZIP)"
	@aws lambda update-function-code --function-name "$(LAMBDA_SRC_FN_NAME_GLOBAL_PREFIX)_$(lambda)" --s3-bucket "$(LAMBDA_SRC_S3_BUCKET)" --s3-key "$(lambda)"/"$(LAMBDA_SRC_ZIP)" --region="$(LAMBDA_SRC_S3_REGION)"
endif

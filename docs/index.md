# Prussia Scans

## Project list

Note: `prussiascans` is a work-in-progress title. This title will most likely be changed after going public.

| Project 	            | Public URL 	 | Description                                 |
|----------------------|---------------|---------------------------------------------|
| prussiascan  	       |  	            | The front-end for the prussiascans project. |
| prussiascan.api	     |  	            | The data API endpoint                       |
| prussiascan.auth	    |  	            | The authentication microservice             |
| prussiascan.aux.api	 |  	            | The microservise with auxiliary functions.  |
| ren39	               | https://ren39.ru | The Ren39 project source code.              |

## Local launch

1. Clone the repo, `cd` to the folder.
2. Run `make install` to install all local dependencies for every application.

## Running all services

1. Run `make run_infra` to launch local infrastructure.
2. Wait until the infrastructure is ready.
3. If not done before, in another terminal run `make create_resources` to create the resources in the Localstack.
4. In another terminal run `cd apps/prussiascan & yarn dev` to launch the front-end application.
5. In another terminal run: `cd apps/prussiascan.api && yarn dev` to launch the API microservice.
5. In another terminal run: `cd apps/prussiascan.auth && yarn dev` to launch the Auth microservice.

## Seeding data

// todo

### Inviting a user

1. Import the Postman collection from the `postman.json` file in order to be able to call the endpoints from there.
2. Call `legacy/auth/invite`, providing an email and roles in the body.
3. The person will receive an email with the link. Navigating to that link should automatically authenticate the user.

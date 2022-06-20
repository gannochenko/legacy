<p align="center">
<h3 align="center">The Heritage project</h3>

  <p align="center">
    <a href="https://github.com/gannochenko/legacy">Source</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Local installation](#local-installation)
* [Local launch](#local-launch)
* [Endpoints](#endpoints)
* [Troubleshooting](#troubleshooting)
* [Deployment](#deployment)
* [Contact](#contact)

## Project list

Note: `prussiascans` is a work-in-progress title. This title will most likely be changed after going public.

| Project 	            | Public URL 	 | Description                                 |
|----------------------|---------------|---------------------------------------------|
| prussiascan  	       |  	            | The front-end for the prussiascans project. |
| prussiascan.api	     |  	            | The data API endpoint                       |
| prussiascan.auth	    |  	            | The authentication microservice             |
| prussiascan.aux.api	 |  	            | The microservise with auxiliary functions.  |
| ren39	               | https://ren39.ru | The Ren39 project source code.              |

## Local installation

1. Clone the repo, `cd` to the folder.
2. Run `yarn setup` to install all npm modules for every application.

## Local launch

1. Run `yarn infra` to launch the local infrastructure.
2. Wait until the infrastructure is ready.
3. If not done before, in another terminal run `yarn seed` to create the resources in the Localstack.
4. In another terminal run `cd apps/prussiascan & yarn dev` to launch the front-end application.
5. In another terminal run: `cd apps/prussiascan.api && yarn dev` to launch the API microservice.
5. In another terminal run: `cd apps/prussiascan.auth && yarn dev` to launch the Auth microservice.

## Endpoints

Import the `postman_collection.json` file to Postman to be able to call the endpoints from there.

### Inviting a user

1. Call `legacy/auth/invite`, providing an email and roles in the body.
2. The person will receive an email with the link. Navigating to that link should automatically authenticate the user.

## Troubleshooting

#### Q: I have troubles launching localstack

A: Remove the `.localstack/data` folder and try restarting. Note, that all your local data will be lost, and you will have to run `yarn seed` once again.

## Deployment

To deploy, just create a PR from `dev` branch to `master`, and merge it.

The infrastructure lives in the [other repository](https://github.com/gannochenko/legacy_infra).

## Contact

Sergei Gannochenko - [Linkedin](https://www.linkedin.com/in/gannochenko/)

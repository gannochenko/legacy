<p align="center">
<h3 align="center">The Heritage project</h3>

  <p align="center">
    <a href="https://github.com/gannochenko/legacy">Source</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Installation](#local-installation)
* [Running locally](#running-locally)
* [Deployment](#deployment)
* [Contact](#contact)

## Project list

Note: `prussiascans` is a work-in-progress title. This title will most likely be changed after going public.

| Project 	            | Public URL 	 | Description                                 |
|----------------------|---------------|---------------------------------------------|
| prussiascan  	       |  	            | The front-end for the prussiascans project. |
| prussiascan.api	     |  	            | --                                          |
| prussiascan.auth	    |  	            | --                                          |
| prussiascan.aux.api	 |  	            | --                                          |
| ren39	               | https://ren39.ru | The Ren39 project source code.              |

## Local installation

1. Clone the repo, `cd` to the folder.
2. Run `yarn setup` to install all npm modules for every application.

## Running locally

1. Run `yarn infra` to launch the local infrastructure.
2. Wait until the infrastructure is ready.
3. If not done before, in the other terminal, run `yarn seed` to seed the resources in the Localstack.
4. In the other terminal, run `cd apps/prussiascan & yarn dev` to launch the front-end application.
5. In the other terminal, run: `cd apps/prussiascan.api && yarn dev`.
5. In the other terminal, run: `cd apps/prussiascan.auth && yarn dev`.
5. In the other terminal, run: `cd apps/prussiascan.aux.api && yarn dev`.

## Troubleshooting

#### Q: I have troubles launching localstack

A: Remove the `.localstack/data` folder and try restarting. Note: all your local data will be lost.

## Deployment

To deploy, just create a PR from `dev` branch to `master`, and merge it.

The infrastructure lives in the other repository.

## Contact

Sergei Gannochenko - [Linkedin](https://www.linkedin.com/in/gannochenko/)

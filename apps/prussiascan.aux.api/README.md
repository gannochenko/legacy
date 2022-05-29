<p align="center">
  <h3 align="center">The source code of the "prussiascan.aux.api" application</h3>

  <p align="center">
    <a href="https://github.com/gannochenko/legacy">Source</a>
  </p>
</p>

## Table of Contents

* [Local installation](#local-installation)
* [Local launch](#local-launch)
* [How it works](#how-it-works)
* [Contact](#contact)

## Local installation

1. copy `.env.example` to `.env`
2. run `yarn` to install the dependencies, if wasn't done before

## Local launch

1. run `yarn dev`

## How it works

The microservice contains the following serverless functions:

* `triggerDeployment` - function is executed periodically and check for a flag in the database. If the flag is *on*, it triggers the front-end build at Vercel. This function is not exposed via the API Gateway.

## Contact

Sergei Gannochenko - [Linkedin](https://www.linkedin.com/in/gannochenko/)

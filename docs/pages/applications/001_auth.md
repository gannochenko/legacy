# Auth application

The microservice contains the following serverless functions:

* `getUser` - function returns a user structure by a token provided. This function is not exposed via the Gateway API.
* `runAPI` - function provides access to the user API: invite, signup, etc.

## CI/CD

Before running CI/CD make sure that the lambda functions mentioned above exists.
There is an infrastructure repository containing terraform files that, being applied, create all the resources.

### Secrets

So far we do not use any software like Vault for managing secrets.
The following secrets should be obtained/generated and then added as [environment variables on GitHub](https://github.com/gannochenko/legacy/settings/environments):

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AWS_REGION`

The other env vars come from the infrastructure.

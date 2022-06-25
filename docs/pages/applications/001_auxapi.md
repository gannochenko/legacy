# Aux API application

The microservice contains the following serverless functions:

* `triggerDeployment` - function is executed periodically and check for a flag in the database. If the flag is *on*, it triggers the front-end build at Vercel. This function is not exposed via the API Gateway.

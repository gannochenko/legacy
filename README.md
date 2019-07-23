# The registry of architectural legacy

A title for the project: "Project "Minimum" - a minimalistic GraphQL backend

## Parts

* A front application, the main site
* An express application that serves the front application
* A headless CMS to handle content
* A database to store content (Postgres, self hosted or Saas)
* An image thumbnail generator service, SQS
* A service to store files (CDN, own server, etc)
* Redis as message broker
* A search engine (Elasticsearch + ???)
* Auth service

Additinal:
* Datbase viewer
* Redis viewer

## CDN list

* https://www.imgix.com
* https://cloudinary.com
* https://sirv.com
* https://spacechop.com/
* https://uploadcare.com/
* https://publit.io/

## Launch

~~~
./script/run.sh
~~~

TF_LOG=1 terraform apply -auto-approve
terraform destroy

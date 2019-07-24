# API server

## Development startup

~~~~
npm install;
npm run dev;
~~~~

## Usage

## Build and publish

The following command will make a production-ready build, create a docker image with tag "1.0.0" and publish to DockerHub:

~~~~
./script/push.sh 1.0.0
~~~~

To run migrations locally outside of the application:
~~~~
TYPEORM_URL=postgres://root:123@localhost:5432/legacy yarn run migrate
~~~~

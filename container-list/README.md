# Docker container list

## Development startup

~~~~
npm install;
npm run dev;
~~~~

## Usage

Go to your `compose.yml` and add the container:
~~~~
  container-list:
    image: "awesome1888/container-list"
    expose:
      - "8000"
    ports:
      - "8000:8000"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
    environment:
      - PORT=8000
~~~~

Choose the containers you would like to be visible and add the block of labels, like this:
~~~~
    labels:
        com.list.name: "Backend"
        com.list.sort: "1"
        com.list.description: "Main server that provides API"
        com.list.link.1: "GraphQL endpoint___/graphql"
        com.list.link.2: "Signup___/signup"
        com.list.link.whatever: "Whatever___/whatever?else=1"
~~~~

(`___` is a separator between text and URL)

Make sure that all the containers that were chosen as visible expose some port:
~~~~
    expose:
      - "4000"
    ports:
      - "4000:4000"
~~~~

Open `http://localhost:8000` (or whatever the port is) and enjoy.

## Build and publish

The following command will make a production-ready build, create a docker image with tag "1.0.0" and publish to DockerHub:

~~~~
./script/push.sh 1.0.0
~~~~

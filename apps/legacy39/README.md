# Legacy registry

## How to start and stop

### Development

To start a development version, type
~~~~
./scripts/start/desktop.front.sh
~~~~
(this will start both meteor app and the containerized environment)

To stop it, do Ctrl+C for the meteor app and stop the containerized environment:
~~~~
./scripts/halt/development.sh
~~~~

### Local docker test

## Other

To restore the database, the correct command would be:
~~~~
mongorestore --uri mongodb://localhost:3300/ --archive=/home/vagrant/volume-development/db/legacy.gz --gzip
~~~~

## Copyright

`awesome1888@gmail.com`

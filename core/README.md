# project-minimum-core

Some core stuff for the Project Minimum microservices

## Installation

## Usage

## Build

To re-build the development version on each file change:
~~~~
./script/run.sh
~~~~

## Development link

~~~
cd project-minimum-core/
npm link
cd whatever-project
npm link project-minimum-core
~~~

## Publish

To publish a new version:

* make changes
* increment module version in `package.json`
* sign-in into `npm`: `npm adduser awesome1888`
* `./script/publish.sh`

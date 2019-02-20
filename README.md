# Apptainer

### (Working title)

Docker-based replacement for other FOSS, [PuPHPet](https://puphpet.com).

Very early stages.

## How to Run ##

#### Using Docker

    docker container run --rm -it \
        -w /home/node/app \
        -v "${PWD}":/home/node/app \
        -p 3000:3000 \
        node:8-alpine yarn

then

    docker container run --rm -it \
        -w /home/node/app \
        -v "${PWD}":/home/node/app \
        -p 3000:3000 \
        node:8-alpine yarn run start

#### Using System Node

* `yarn`
* `yarn run start`
* Open [http://localhost:3000](http://localhost:3000)

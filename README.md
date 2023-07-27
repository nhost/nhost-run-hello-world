# nhost-run-hello-world

Hello World application showcasing what Nhost Run and how to leverage it. In short, Nhost Run is a service that allows you to run your own container images alongside your Nhost project. You can find more details in the [product page](https://nhost.io/product/run) and the [documentation](https://docs.nhost.io/run)

This repository includes:

1. a very basic node application
2. a Dockerfile to build a docker image with the node application
3. a configuration file to deploy the Nhost Run service
4. a github workflow to build the image, push it to the Nhost registry and then deploy it

## Goal

The goal of this repo is to demonstrate how to leverage github actions to test your application, build it, and deploy it to Nhost Run. For demonstration purposes we are going to be defining two environments; staging and production. On every push to main (i.e. by merging a PR) we will be deploying to production while on every push to a non-main branch we will be deploying to staging.

## Background

Before we start, we have a very simple node [app](app.js) you can start with `node app.js`:

``` shell
$ node app.js
Server running at http://0.0.0.0:3000/
```

And you can query it locally:

``` shell
$ curl http://localhost:3000
{"message":"Hello World"}
```

To build it we have a very simple [Dockerfile](./Dockerfile).

``` shell
$ docker build -t nhost-run-hello-world:local-dev .
[+] Building 5.4s (8/8) FINISHED
 => [internal] load .dockerignore                                                                         0.0s
 => => transferring context: 2B                                                                           0.0s
 => [internal] load build definition from Dockerfile                                                      0.0s
 => => transferring dockerfile: 101B                                                                      0.0s
 => [internal] load metadata for docker.io/library/node:18-slim                                           5.4s
 => [auth] library/node:pull token for registry-1.docker.io                                               0.0s
 => [internal] load build context                                                                         0.0s
 => => transferring context: 416B                                                                         0.0s
 => [1/2] FROM docker.io/library/node:18-slim@sha256:bfa807593c4e904c9dbdeec45a266d38040804e498c714bddf5  0.0s
 => CACHED [2/2] ADD app.js app.js                                                                        0.0s
 => exporting to image                                                                                    0.0s
 => => exporting layers                                                                                   0.0s
 => => writing image sha256:824993127072d1af8f53233038d396ffdb46854a844e07e49c26046efa59e311              0.0s
 => => naming to docker.io/library/nhost-run-hello-world:local-dev                                        0.0s
```

And finally, we have the [configuration file](./nhost-service.toml) for Nhost Run.

## CI Workflow

To test, build and deploy the service we are going to leverage an already-made [workflow](https://github.com/nhost-actions/workflows#build-and-release-nhost-runyaml). This workflow can do most of the heavy-lifting already; download Nhost CLI, authenticate, configure docker, build the image and push the new configuration to Nhost Run. This means we simply need to extend it to run our tests before running it.

To extend an existing workflow we can write our own workflow and call any already-made workflow we want, adding tasks, dependencies or combining workflows. You can find the result in [.github/workflows/wf_test_and_release.yaml](.github/workflows/wf_test_and_release.yaml).

As you can see the workflow does the following:

1. Takes similar inputs and secrets as [workflow](https://github.com/nhost-actions/workflows#build-and-release-nhost-runyaml).
2. Adds a "tests" job where we run our tests on nodejs 18 and 20.
3. Calls the workflow [build-and-release-nhost-run.yaml](https://github.com/nhost-actions/workflows#build-and-release-nhost-runyaml) but only after the job "tests" succeeded (`needs: [test]`)

After we have this workflow defined we can call it based on Github events to deploy to one environment or another. For instance, [release_production.yaml](.github/workflows/release_production.yaml) and [release_staging.yaml](.github/workflows/release_staging.yaml)

## Step-by-Step Guide

Ok, now that we know what we are trying to do and we have our workflows we need to configure the github repo and add some parameters. In particular we need:

1. A secret called `NHOST_PAT`. You can head to [Creating a PAT](https://github.com/nhost-actions/authenticate#creating-a-pat) for details on how to get one. Once you have it head to your github repository -> settings ->  Security -> Secrets and Variables -> Actions and click on "New Repository Secret".

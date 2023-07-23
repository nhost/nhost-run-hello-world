# cloud-run-hello-world

Hello World application showcasing what Nhost Cloud Run and how to leverage it. In short, Nhost Cloud Run is a service that allows you to run your own container images alongside your Nhost project. You can find more details in the [product page](https://nhost.io/product/run) and the [documentation](https://docs.nhost.io/run)

This repository includes:

1. a very basic node application
2. a Dockerfile to build a docker image with the node application
3. a configuration file to deploy the Nhost Run service
4. a github workflow to build the image, push it to the Nhost registry and then deploy it

## Background

Before we start with

```
docker buildx build --push --platform linux/amd64,linux/arm64 -t registry.eu-central-1.staging.nhost.run/d3dd347f-da4e-4d02-9f72-8bfad285f924:123 .
```

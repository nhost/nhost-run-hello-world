### Step by Step Demo

#### Creating the Run Services

First, to run this demo, you need two projects; a staging environment and a production environment:

![two projects](/img/run/ci_demo_1.png)

Now we can head to Run -> Add Service:

![create new service](/img/run/ci_demo_2.png)

As we are going to be deploying the service with the CI after we build the service right now we only care about setting the name and [pausing the service](/run/resources#pausing-a-service), you can leave the rest to their default values:

![configure the service](/img/run/ci_demo_3.png)

Now you can take note of the service ID:

![configure the service](/img/run/ci_demo_4.png)

And the image that was assigned to the service:

![configure the service](/img/run/ci_demo_5.png)

With staging prepared you can repeat these steps for your production app. When you are done you should have the following information:

* `SERVICE_ID_STAGING`: `2503b290-249c-42f5-b89e-fd9a98980e22`
* `IMAGE_STAGING`: `registry.eu-central-1.nhost.run/2503b290-249c-42f5-b89e-fd9a98980e22`
* `SERVICE_ID_PRODUCTION`: `c811ce4d-c928-4685-8a15-31ac0eabdd30`
* `IMAGE_PRODUCTION`: `registry.eu-central-1.nhost.run/c811ce4d-c928-4685-8a15-31ac0eabdd30`

#### Creating a PAT

To create a PAT first head to your account settings:

![head to account settings](/img/run/ci_demo_6.png)

Click "Create Personal Access Token":

![create personal access token](/img/run/ci_demo_7.png)

Give it a descriptive name and an expiration date:

![set name and expiration date](/img/run/ci_demo_8.png)

And take note of the PAT:

![set name and expiration date](/img/run/ci_demo_9.png)

#### Configuring Github

Now that we have all the data we need we can fork the project [nhost/nhost-run-hello-world](https://github.com/nhost/nhost-run-hello-world/) and head to our fork:

![fork](/img/run/ci_demo_10.png)

Now head to Settings -> Actions secrets and variables and click on New Repository Secret:

![secrets](/img/run/ci_demo_11.png)

And enter your PAT and hit Add Secret:

![enter PAT](/img/run/ci_demo_12.png)

When you are done, head to Variables, click on New Repository Variables and enter the rest of the data, after entering all the data you previously gathered you should have a view similar to this:

![variables](/img/run/ci_demo_13.png)

#### Triggering a deploy

Now that we have everything working we can make a change to the code and trigger a deploy:

![PR](/img/run/ci_demo_14.png)

The push to the branch will trigger a deploy to staging:

![deploy to staging](/img/run/ci_demo_15.png)

After completion we can head to the staging project and check the Run service configuration:

![run service configuration](/img/run/ci_demo_16.png)

As you can see now the configuration has been updated with the contents of the configuration file plus the image that was built and deployed.

Now we can visit the service URL and see how we get back the new message:

![query new message](/img/run/ci_demo_17.png)

When we are happy with the PR we can merge it:

![query new messagr](/img/run/ci_demo_18.png)

which will trigger a deploy to production automatically:

![query new messagr](/img/run/ci_demo_19.png)

after completion we can head to the production project and verify the service configuration has also been updated correctly:

![query new messagr](/img/run/ci_demo_20.png)

and finally we can verify that querying the URL returns the new message:

![query new messagr](/img/run/ci_demo_21.png)

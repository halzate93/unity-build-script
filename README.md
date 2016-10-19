# Unity Build Script
A simple command line tool that triggers builds in Unity Cloud Build using it's REST API located at
https://build-api.cloud.unity3d.com

## Installation
This script is built using [Node.js](https://nodejs.org) command line tools, so you need to have it installed.

Then you can use **npm** to install the command line tool:
```
$ npm install unity-build -g
```

You can download this repository and link the script to your /bin path as well:
```
$ git clone https://github.com/halzate93/unity-build-script.git
$ cd unity-build-script
$ npm link
```

## Usage
You need to provide the details of the project you want to build:
- **Organization Id**: It's the name of the organization in Unity ID.
- **Project Id**: It's the unique identifier of the project, you can find it in the project's cloud build site.
- **Target Id**: You can specify which target to trigger, if you don't provide any it defaults to \_all.

Also you need to provide your **API key**, you can find it in your profile in Cloud Build.

You can pass these as command line parameters:
```
$ unity-build -k <your_api_key> -o <your_organization> -p <your_project_id> -t <your_target_id>
```

You can run the help command to see what every option does:
```
$ unity-build --help

  Usage: unity-build [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -v, --verbose               Verbose the request process
    -p, --project [project_id]  Set the project id that should be built
    -o, --org [org_id]          Set the organization id that contains the project to build
    -k, --key [api_key]         Set your api key to use as credentials to log into Cloud Build
    -t, --target [target]       Set the build target, defaults to [_all] if missing
```

A better option would be to store the parameters in environment variables:
```
$ export CLOUD_BUILD_API_KEY=<your_api_key>
$ export ORGANIZATION_ID=<your_org_id>
$ export PROJECT_ID=<your_project_id>
```
If you want these to stay between sesions you should store them on the config file according to your platform specifics.

**Command line arguments have priority over environment variables.**

Then you can just run it like this:
```
$ unity-build
```

If something isn't working, you can run the script with the --verbose option. Which will print information related to the request.
```
$ unity-build -v
```
## Automation
You can use a program like *cron* or setup a task on a hosted machine to trigger your builds daily, weekly or at specific times. To see more on this take a look at this instruction on how to do it on [heroku](https://devcenter.heroku.com/articles/scheduler). 

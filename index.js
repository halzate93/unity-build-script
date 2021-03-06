#!/usr/bin/env node

// Change the config directory if not set
var path = require ('path')
if (!process.env.NODE_CONFIG_DIR)
{
  var config_dir = path.join (process.env.HOME, '.unity_build')
  process.env.NODE_CONFIG_DIR = config_dir
}

// load required modules
var request = require ('superagent')
var config = require ('config')
var options = require ('commander')

// parse command line arguments
options
  .version('0.1.1')
  .option('-v, --verbose', 'Verbose the request process')
  .option('-p, --project [project_id]', 'Set the project id that should be built')
  .option('-o, --org [org_id]', 'Set the organization id that contains the project to build')
  .option('-k, --key [api_key]', 'Set your api key to use as credentials to log into Cloud Build')
  .option('-t, --target [target]', 'Set the build target, defaults to [_all] if missing')
  .parse(process.argv);

if (options.verbose)
  console.log ("options: " + JSON.stringify (options))

if (options.verbose)
  console.log ("settings: " + JSON.stringify (config))

// set parameters, command line options have priority over config file
var domain = config.domain
var api_key = options.key || config.api_key
var org_id = options.org || config.org_id
var project_id = options.project || config.project_id
var build_target = options.target || config.target || '_all'

// construct request url which identifies the resource to build
var url = `${domain}/orgs/${org_id}/projects/${project_id}/buildtargets/${build_target}/builds`
if (options.verbose)
  console.log ("url: " + url)

// construct headers with authentication
var headers = {
  "Authorization": "Basic " + api_key,
  "Content-Type": "application/json",
}
if (options.verbose)
  console.log ("headers: " + JSON.stringify (headers))

// construct the request body with build parameters
var body = {
  "clean": config.clean,
  "delay": config.delay
}
if (options.verbose)
  console.log ("body: " + JSON.stringify (body))

// make ajax request to the api
request.post (url)
  .set (headers) // set authorization
  .send (body) // set the body with parameters
  .end (function (error, response) // send request
  {
    if (error)
    {
      console.log ("There was a problem with the request")
      if (options.verbose)
        console.log (JSON.stringify (error))
    }
    else
    {
      console.log ("Build has been started successfully")
      if (options.verbose)
        console.log (JSON.stringify (response))
    }
  })

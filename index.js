#!/usr/bin/env node

// load required modules
var request = require ('superagent')
var config = require ('config')

// load the configuration file
var settings = config.get ('cloudbuild')
console.log ("settings: " + JSON.stringify (settings))

// construct request url which identifies the resource to build
var url = `${settings.domain}/orgs/${settings.org_id}/projects/`
        + `${settings.project_id}/buildtargets/${settings.build_target_id}/builds`
console.log ("url: " + url)

// construct headers with authentication
var headers = {
  "Authorization": "Basic " + settings.api_key,
  "Content-Type": "application/json",
}
console.log ("headers: " + JSON.stringify (headers))

// construct the request body with build parameters
var body = {
  "clean": settings.clean,
  "delay": settings.delay
}
console.log ("body: " + JSON.stringify (body))

// make ajax request to the api
request.post (url)
  .set (headers) // set authorization
  .send (body) // set the body with parameters
  .end (function (error, response) // send request
  {
    if (error)
      console.log ("There was a problem with the request:\n${error}", error)
    else
      console.log ("Build has been started successfully:\n${response}", response)
  })

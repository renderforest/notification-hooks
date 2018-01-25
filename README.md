# notification-hooks
Notification Hooks

[![Build Status](https://travis-ci.org/renderforest/notification-hooks.svg?branch=master)](https://travis-ci.org/renderforest/notification-hooks)
[![GitHub issues](https://img.shields.io/github/issues/renderforest/notification-hooks.svg)](https://github.com/renderforest/notification-hooks/issues)
[![GitHub release](https://img.shields.io/github/release/renderforest/notification-hooks.svg)](https://github.com/renderforest/notification-hooks/releases)
[![GitHub stars](https://img.shields.io/github/stars/renderforest/notification-hooks.svg)](https://github.com/renderforest/notification-hooks/stargazers)

[![Dep](https://img.shields.io/david/renderforest/notification-hooks.svg)](https://david-dm.org/renderforest/notification-hooks)
[![DevDep](https://img.shields.io/david/dev/renderforest/notification-hooks.svg)](https://david-dm.org/renderforest/notification-hooks?type=dev)


# API

Environment variables(s):

* SLACK_WEB_HOOK_URL


## Slack API

#### notifyError(...)
  ``` javascript
     const SlackHooks = require('notification-hooks').Slack
  
     const options = {
        text: 'Hello world!', // supports both string & object
        channel: '#media-upload',
        username: '@albert @ryan',
        iconEmoji: ':lion_face:', // default value is ':fire:'
        codeSnippet: true // default value is `false`
     }  
     
     SlackHooks.notifyError(options).then().catch()
  ```

#### notifyWarn(...)
  ``` javascript
     const SlackHooks = require('notification-hooks').Slack
  
     const options = {
        text: 'Hi there!', // supports both string & object
        channel: '#backend',
        username: '@cris @ryan',
        iconEmoji: ':bus:', // default value is ':warning:'
        codeSnippet: false // sdefault value is `false`  
     }  
  
     SlackHooks.notifyWarn(options).then().catch()
  ```
  
#### notifyInfo(...)
  ``` javascript
     const SlackHooks = require('notification-hooks').Slack
     
     const options = {
        text: 'Hello!', // supports both string & object
        channel: '#front',
        username: '@john',
        iconEmoji: ':airplane:', // default value is ':information_source:'
        codeSnippet: true // default value is `false`   
     }
     
     SlackHooks.notifyError(options).then().catch()
  ```
  
# Development
In case you add new third party dependencies, use flow-typed npm package to add annotations for that packages.
 * npm i -g flow-typed
 * flow-typed install --ignoreDeps dev
 

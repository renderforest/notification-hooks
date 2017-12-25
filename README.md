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
  
     const text = 'Hello world!'      // supports both string & object
     const channel = '#media-upload'
     const username = '@albert @ryan'       
     const icon_emoji = ':lion_face:' // defaults to - ':fire:'
     
     SlackHooks.notifyError(text, channel, username, icon_emoji).then().catch()
  ```

#### notifyWarn(...)
  ``` javascript
     const SlackHooks = require('notification-hooks').Slack
  
     const text = 'Hi there!'         // supports both string & object
     const channel = '#backend'
     const username = '@cris @ryan'       
     const icon_emoji = ':bus:'       // defaults to - ':warning:'
     
     SlackHooks.notifyError(text, channel, username, icon_emoji).then().catch()
  ```
  
#### notifyInfo(...)
  ``` javascript
     const SlackHooks = require('notification-hooks').Slack
  
     const text = 'Hello!'            // supports both string & object
     const channel = '#front'
     const username = '@john'       
     const icon_emoji = ':airplane:'  // defaults to - ':information_source:'
     
     SlackHooks.notifyError(text, channel, username, icon_emoji).then().catch()
  ```
  
# Development
In case you add new third party dependencies, use flow-typed npm package to add annotations for that packages.
 * npm i -g flow-typed
 * flow-typed install --ignoreDeps dev
 

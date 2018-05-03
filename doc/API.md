# API ✍

Environment variables(s):

* SLACK_WEB_HOOK_URL


## Slack API

#### notifyError(...)
  ``` javascript
     const SlackHooks = require('notification-hooks').Slack
  
     const options = {
        channel: '#media-upload',
        codeSnippet: false, // default value is `true`
        iconEmoji: ':lion_face:', // default value is ':fire:'
        text: 'Hello world!', // supports string, Object, Error
        username: '@albert @ryan'
     }  
     
     SlackHooks.notifyError(options).then().catch()
  ```

#### notifyWarn(...)
  ``` javascript
     const SlackHooks = require('notification-hooks').Slack
  
     const options = {
        channel: '#backend',
        codeSnippet: false, // default value is `true`  
        iconEmoji: ':bus:', // default value is ':warning:'
        text: 'Hi there!', // supports both string & Object
        username: '@cris @ryan'
     }
  
     SlackHooks.notifyWarn(options).then().catch()
  ```
  
#### notifyInfo(...)
  ``` javascript
     const SlackHooks = require('notification-hooks').Slack
     
     const options = {
        channel: '#front',
        codeSnippet: true, // default value is `true`   
        iconEmoji: ':airplane:', // default value is ':information_source:'
        text: 'Hello!', // supports both string & Object
        username: '@john'
     }
     
     SlackHooks.notifyError(options).then().catch()
  ```

// @flow
'use strict'

const requestPromise = require('request-promise')

const SLACK_WEB_HOOK_URL = process.env.SLACK_WEB_HOOK_URL

/**
 * @private
 * @param {Object} options
 * @param {string} options.channel
 * @param {boolean} options.codeSnippet
 * @param {string} options.iconEmoji
 * @param {Object | string | Error} options.text
 * @param {string} options.username
 * @return {{channel, text, username, icon_emoji}}
 * @description Constructs payload for slack.
 *  Use ``` to send msg as code block.
 */
function _payloadForSlack (options: IOptions) {
  const { channel, codeSnippet, iconEmoji, text, username } = options

  const msg = typeof text === 'string'
    ? text
    : JSON.stringify(text, null, 2)

  return {
    channel,
    icon_emoji: iconEmoji,
    text: codeSnippet ? ['```', msg, '```'].join('\n') : msg,
    username
  }
}

/**
 * @private
 * @param {Object} options
 * @param {string} options.channel
 * @param {boolean} options.codeSnippet
 * @param {string} options.iconEmoji
 * @param {Object | string | Error} options.text
 * @param {string} options.username
 * @returns {Promise.<>}
 * @description Send slack msg.
 */
function _sendSlackMsg (options: IOptions) {
  return requestPromise({
    url: SLACK_WEB_HOOK_URL,
    method: 'PUT',
    form: JSON.stringify(_payloadForSlack(options))
  })
}

/**
 * @public
 * @param {Object} options
 * @param {string} options.channel
 * @param {Object | string | Error} options.text
 * @param {string} options.username
 * @param {boolean} [options.codeSnippet=false]
 * @param {string} [options.iconEmoji=:fire:]
 * @return {Promise.<>}
 * @description Notify error.
 */
function notifyError (options: IOptions) {
  if (!options.iconEmoji) {
    options.iconEmoji = ':fire:'
  }

  if (!options.hasOwnProperty('codeSnippet')) {
    options.codeSnippet = true
  }

  return _sendSlackMsg(options)
}

/**
 * @public
 * @param {Object} options
 * @param {string} options.channel
 * @param {Object | string} options.text
 * @param {string} options.username
 * @param {boolean} [options.codeSnippet=false]
 * @param {string} [options.iconEmoji=:warning:]
 * @return {Promise.<>}
 * @description Notify warn.
 */
function notifyWarn (options: IOptions) {
  if (!options.iconEmoji) {
    options.iconEmoji = ':warning:'
  }

  if (!options.hasOwnProperty('codeSnippet')) {
    options.codeSnippet = true
  }

  return _sendSlackMsg(options)
}

/**
 * @public
 * @param {Object} options
 * @param {string} options.channel
 * @param {Object | string} options.text
 * @param {string} options.username
 * @param {boolean} [options.codeSnippet=false]
 * @param {string} [options.iconEmoji=:information_source:]
 * @return {Promise.<>}
 * @description Notify info.
 */
function notifyInfo (options: IOptions) {
  if (!options.iconEmoji) {
    options.iconEmoji = ':information_source:'
  }

  if (!options.hasOwnProperty('codeSnippet')) {
    options.codeSnippet = true
  }

  return _sendSlackMsg(options)
}

module.exports = {
  notifyError,
  notifyWarn,
  notifyInfo,
  __tests__: {
    _payloadForSlack,
    _sendSlackMsg
  }
}

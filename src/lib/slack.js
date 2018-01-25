// @flow
'use strict'

const requestPromise = require('request-promise')

const SLACK_WEB_HOOK_URL = process.env.SLACK_WEB_HOOK_URL

/**
 * @private
 * @param {Object} options
 * @param {Object | string} options.text
 * @param {string} options.channel
 * @param {string} options.username
 * @param {string} options.iconEmoji
 * @param {boolean} options.codeSnippet
 * @return {{channel, text, username, icon_emoji}}
 * @description Constructs payload for slack.
 *  Use ``` to send msg as code block.
 */
function _payloadForSlack (options: IOptions) {
  const msg = typeof options.text === 'string'
    ? options.text
    : JSON.stringify(options.text, null, 2)

  return {
    channel: options.channel,
    text: options.codeSnippet ? ['```', msg, '```'].join('\n') : msg,
    username: options.username,
    icon_emoji: options.iconEmoji
  }
}

/**
 * @private
 * @param {Object} options
 * @param {Object | string} options.text
 * @param {string} options.channel
 * @param {string} options.username
 * @param {string} options.iconEmoji
 * @param {boolean} options.codeSnippet
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
 * @param {Object | string | Error} options.text
 * @param {string} options.channel
 * @param {string} options.username
 * @param {string} [options.iconEmoji=:fire:]
 * @param {boolean} [options.codeSnippet=false]
 * @return {Promise.<>}
 * @description Notify error.
 */
function notifyError (options: IOptions) {
  if (!options.iconEmoji) {
    options.iconEmoji = ':fire:'
  }

  if (!options.hasOwnProperty('codeSnippet')) {
    options.codeSnippet = false
  }

  return _sendSlackMsg(options)
}

/**
 * @public
 * @param {Object} options
 * @param {Object | string} options.text
 * @param {string} options.channel
 * @param {string} options.username
 * @param {string} [options.iconEmoji=:warning:]
 * @param {boolean} [options.codeSnippet=false]
 * @return {Promise.<>}
 * @description Notify warn.
 */
function notifyWarn (options: IOptions) {
  if (!options.iconEmoji) {
    options.iconEmoji = ':warning:'
  }

  if (!options.hasOwnProperty('codeSnippet')) {
    options.codeSnippet = false
  }

  return _sendSlackMsg(options)
}

/**
 * @public
 * @param {Object} options
 * @param {Object | string} options.text
 * @param {string} options.channel
 * @param {string} options.username
 * @param {string} [options.iconEmoji=:information_source:]
 * @param {boolean} [options.codeSnippet=false]
 * @return {Promise.<>}
 * @description Notify info.
 */
function notifyInfo (options: IOptions) {
  if (!options.iconEmoji) {
    options.iconEmoji = ':information_source:'
  }

  if (!options.hasOwnProperty('codeSnippet')) {
    options.codeSnippet = false
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

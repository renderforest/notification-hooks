// 
'use strict'

const requestPromise = require('request-promise')

const SLACK_WEB_HOOK_URL = process.env.SLACK_WEB_HOOK_URL

/**
 * @private
 * @param {Object} options
 * @param {Object | string} options.text
 * @param {string} options.channel
 * @param {string} options.username
 * @param {string} options.icon_emoji
 * @param {boolean} options.code
 * @return {{channel, text, username, icon_emoji}}
 * @description Constructs payload for slack.
 *  Use ``` to send msg as code block.
 */
function _payloadForSlack (options) {
  const msg = typeof options.text === 'string'
    ? options.text
    : JSON.stringify(options.text, null, 2)

  return {
    channel: options.channel,
    text: options.code ? ['```', msg, '```'].join('\n') : msg,
    username: options.username,
    icon_emoji: options.icon_emoji
  }
}

/**
 * @private
 * @param {Object} options
 * @param {Object | string} options.text
 * @param {string} options.channel
 * @param {string} options.username
 * @param {string} options.icon_emoji
 * @param {boolean} options.code
 * @returns {Promise.<>}
 * @description Send slack msg.
 */
function _sendSlackMsg (options) {
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
 * @param {string} [options.icon_emoji=:fire:]
 * @param {boolean} [options.code=false]
 * @return {Promise.<>}
 * @description Notify error.
 */
function notifyError (options) {
  if (!options.icon_emoji) {
    options.icon_emoji = ':fire:'
  }

  if (!options.hasOwnProperty('code')) {
    options.code = false
  }

  return _sendSlackMsg(options)
}

/**
 * @public
 * @param {Object} options
 * @param {Object | string} options.text
 * @param {string} options.channel
 * @param {string} options.username
 * @param {string} [options.icon_emoji=:warning:]
 * @param {boolean} [options.code=false]
 * @return {Promise.<>}
 * @description Notify warn.
 */
function notifyWarn (options) {
  if (!options.icon_emoji) {
    options.icon_emoji = ':warning:'
  }

  if (!options.hasOwnProperty('code')) {
    options.code = false
  }

  return _sendSlackMsg(options)
}

/**
 * @public
 * @param {Object} options
 * @param {Object | string} options.text
 * @param {string} options.channel
 * @param {string} options.username
 * @param {string} [options.icon_emoji=:information_source:]
 * @param {boolean} [options.code=false]
 * @return {Promise.<>}
 * @description Notify info.
 */
function notifyInfo (options) {
  if (!options.icon_emoji) {
    options.icon_emoji = ':information_source:'
  }

  if (!options.hasOwnProperty('code')) {
    options.code = false
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

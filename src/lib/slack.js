const nodeFetch = require('node-fetch')
const config = require('../../config/config')

const { SLACK_WEB_HOOK_URL } = config

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
function _payloadForSlack (options) {
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
function _sendSlackMsg (options) {
  return nodeFetch(SLACK_WEB_HOOK_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(_payloadForSlack(options))
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
function notifyError (options) {
  if (options.text instanceof Error) {
    options.text = Object.assign({}, options.text, { message: options.text.message })
  }

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
function notifyWarn (options) {
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
function notifyInfo (options) {
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

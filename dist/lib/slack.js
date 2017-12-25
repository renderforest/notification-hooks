// 
'use strict'

const requestPromise = require('request-promise')

const SLACK_WEB_HOOK_URL = process.env.SLACK_WEB_HOOK_URL

/**
 * @private
 * @param {Object | string} text
 * @param {string} channel
 * @param {string} username
 * @param {string} icon_emoji
 * @returns {{channel, text, username, icon_emoji}}
 * @description Constructs payload for slack.
 *  Use ``` to send msg as code block.
 */
function _payloadForSlack (text, channel, username, icon_emoji) {
  const msg = typeof text === 'string'
    ? text
    : JSON.stringify(text, null, 2)

  return {
    channel,
    text: ['```', msg, '```'].join('\n'),
    username,
    icon_emoji
  }
}

/**
 * @private
 * @param {Object | string} text
 * @param {string} channel
 * @param {string} username
 * @param {string} icon_emoji
 * @returns {Promise.<>}
 * @description Send slack msg.
 */
function _sendSlackMsg (text, channel, username, icon_emoji) {
  return requestPromise({
    url: SLACK_WEB_HOOK_URL,
    method: 'PUT',
    form: JSON.stringify(_payloadForSlack(text, channel, username, icon_emoji))
  })
}

/**
 * @public
 * @param {Object | string | Error} text
 * @param {string} channel
 * @param {string} username
 * @param {string} [icon_emoji=:information_source:]
 * @return {Promise.<>}
 * @description Notify error.
 */
function notifyError (text, channel, username, icon_emoji = ':fire:') {
  if (text instanceof Error) {
    text = Object.assign({}, text, { message: text.message })
  }

  return _sendSlackMsg(text, channel, username, icon_emoji)
}

/**
 * @public
 * @param {Object | string} text
 * @param {string} channel
 * @param {string} username
 * @param {string} [icon_emoji=:information_source:]
 * @return {Promise.<>}
 * @description Notify warn.
 */
function notifyWarn (text, channel, username, icon_emoji = ':warning:') {
  return _sendSlackMsg(text, channel, username, icon_emoji)
}

/**
 * @public
 * @param {Object | string} text
 * @param {string} channel
 * @param {string} username
 * @param {string} [icon_emoji=:information_source:]
 * @return {Promise.<>}
 * @description Notify info.
 */
function notifyInfo (text, channel, username, icon_emoji = ':information_source:') {
  return _sendSlackMsg(text, channel, username, icon_emoji)
}

module.exports = {
  notifyError,
  notifyWarn,
  notifyInfo
}
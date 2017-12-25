// @flow
'use strict'

const requestPromise = require('request-promise')

const SLACK_WEB_HOOK_URL = process.env.SLACK_WEB_HOOK_URL

/**
 * @private
 * @description Constructs payload for slack.
 *  Use ``` to send msg as code block.
 */
function _payloadForSlack (text: IText, channel: string, username: string, icon_emoji: string) {
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
 * @returns {Promise.<>}
 * @description Send slack msg.
 */
function _sendSlackMsg (text: IText, channel: string, username: string, icon_emoji: string) {
  return requestPromise({
    url: SLACK_WEB_HOOK_URL,
    method: 'PUT',
    form: JSON.stringify(_payloadForSlack(text, channel, username, icon_emoji))
  })
}

/**
 * @public
 * @param {object | string | Error} text
 * @param {string} channel
 * @param {string} username
 * @param {string} [icon_emoji=:information_source:]
 * @return {Promise.<>}
 * @description Notify error.
 */
function notifyError (text: IText, channel: string, username: string, icon_emoji: string = ':fire:') {
  if (text instanceof Error) {
    text = Object.assign({}, text, { message: text.message })
  }
  return _sendSlackMsg(text, channel, username, icon_emoji)
}

/**
 * @public
 * @return {Promise.<>}
 * @description Notify warn.
 */
function notifyWarn (text: IText, channel: string, username: string, icon_emoji: string = ':warning:') {
  return _sendSlackMsg(text, channel, username, icon_emoji)
}

/**
 * @public
 * @return {Promise.<>}
 * @description Notify info.
 */
function notifyInfo (text: IText, channel: string, username: string, icon_emoji: string = ':information_source:') {
  return _sendSlackMsg(text, channel, username, icon_emoji)
}

module.exports = {
  notifyError,
  notifyWarn,
  notifyInfo
}

'use strict'

const Slack = require('../../src/index').Slack

describe('lib/slack: ', () => {
  describe('_payloadForSlack(): ', () => {
    test('should return updated object. In case if type of `text` is string.', () => {
      const text = 'mock-text'
      const channel = 'mock-channel'
      const username = 'mock-username'
      const icon_emoji = 'mock-icon_emoji'

      const expectedValue = Slack.__tests__._payloadForSlack(text, channel, username, icon_emoji)
      const updatedText = ['```', text, '```'].join('\n')
      expect(expectedValue.channel).toBe(channel)
      expect(expectedValue.text).toBe(updatedText)
      expect(expectedValue.username).toBe(username)
      expect(expectedValue.icon_emoji).toBe(icon_emoji)
    })

    test('should return updated object. In case if type of `text` is object.', () => {
      const text = { text: 'mock-text' }
      const channel = 'mock-channel'
      const username = 'mock-username'
      const icon_emoji = 'mock-icon_emoji'

      const expectedValue = Slack.__tests__._payloadForSlack(text, channel, username, icon_emoji)
      const convertedText = JSON.stringify(text, null, 2)
      const updatedText = ['```', convertedText, '```'].join('\n')
      expect(expectedValue.channel).toBe(channel)
      expect(expectedValue.text).toBe(updatedText)
      expect(expectedValue.username).toBe(username)
      expect(expectedValue.icon_emoji).toBe(icon_emoji)
    })
  })

  describe('_sendSlackMsg(): ', () => {
    // Save original env.
    const env = Object.assign({}, process.env)

    process.env.SLACK_WEB_HOOK_URL = 'mock-SLACK_WEB_HOOK_URL'

    test('should be valid. `request-promise` is mocked.', () => {
      const text = 'mock-text'
      const channel = 'mock-channel'
      const username = 'mock-username'
      const icon_emoji = 'mock-icon_emoji'

      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(text, channel, username, icon_emoji))
      expect.assertions(3)
      return Slack.__tests__._sendSlackMsg(text, channel, username, icon_emoji)
        .then((data) => {
          expect(data.url).toBe(process.env.SLACK_WEB_HOOK_URL)
          expect(data.method).toBe('PUT')
          expect(data.form).toBe(expectedForm)
        })
    })

    // Revert changes. Set original one.
    process.env = env
  })
  describe('notifyError(): ', () => {
    test('should be valid. `icon_emoji` should be `:fire:` ', () => {
      const text = 'mock-text'
      const channel = 'mock-channel'
      const username = 'mock-username'

      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(text, channel, username, ':fire:'))
      return Slack.notifyError(text, channel, username)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })
  })
})

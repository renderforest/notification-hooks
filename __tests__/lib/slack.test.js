'use strict'
// Save original env.
const env = Object.assign({}, process.env)

process.env.SLACK_WEB_HOOK_URL = 'mock-SLACK_WEB_HOOK_URL'

const Slack = require('../../src/index').Slack

describe('lib/slack: ', () => {
  describe('_payloadForSlack(): ', () => {
    test('should return updated object. Type of `text` argument is string.', () => {
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

    test('should return updated object. Type of `text` argument is Object.', () => {
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
  })

  describe('notifyError(): ', () => {
    test('should be valid. `text` argument is instance of `Error`.', () => {
      const text = new Error('mock-text')
      const channel = 'mock-channel'
      const username = 'mock-username'

      const textToPayload = Object.assign({}, text, { message: text.message })
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(textToPayload, channel, username, ':fire:'))
      return Slack.notifyError(text, channel, username)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })

    test('should be valid. Check if default argument `icon_emoji` is `:fire:`.', () => {
      const text = 'mock-text'
      const channel = 'mock-channel'
      const username = 'mock-username'

      const icon_emoji = ':fire:'
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(text, channel, username, icon_emoji))
      return Slack.notifyError(text, channel, username)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })
  })

  describe('notifyWarn(): ', () => {
    test('should be valid. Check if default argument `icon_emoji` is `:warning:`.', () => {
      const text = 'mock-text'
      const channel = 'mock-channel'
      const username = 'mock-username'

      const icon_emoji = ':warning:'
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(text, channel, username, icon_emoji))
      return Slack.notifyWarn(text, channel, username)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })
  })

  describe('notifyInfo(): ', () => {
    test('should be valid. Check if default argument `icon_emoji` is `information_source`.', () => {
      const text = 'mock-text'
      const channel = 'mock-channel'
      const username = 'mock-username'

      const icon_emoji = ':information_source:'
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(text, channel, username, icon_emoji))
      return Slack.notifyInfo(text, channel, username)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })
  })
})

afterAll(() => {
  // Set original env.
  process.env = env
})

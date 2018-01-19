'use strict'
// Save original env.
const env = Object.assign({}, process.env)

process.env.SLACK_WEB_HOOK_URL = 'mock-SLACK_WEB_HOOK_URL'

const Slack = require('../../src/index').Slack

describe('lib/slack: ', () => {
  describe('_payloadForSlack(): ', () => {
    test('should return updated object. Type of `text` argument is string.', () => {
      const options = {
        text: 'mock-test',
        channel: 'mock-channel',
        username: 'mock-username',
        icon_emoji: 'mock-icon_emoji',
        code: true
      }

      const expectedValue = Slack.__tests__._payloadForSlack(options)
      const updatedText = ['```', options.text, '```'].join('\n')
      expect(expectedValue.channel).toBe(options.channel)
      expect(expectedValue.text).toBe(updatedText)
      expect(expectedValue.username).toBe(options.username)
      expect(expectedValue.icon_emoji).toBe(options.icon_emoji)
    })

    test('should return updated object. Type of `text` argument is Object.', () => {
      const options = {
        text: { text: 'mock-text' },
        channel: 'mock-channel',
        username: 'mock-username',
        icon_emoji: 'mock-icon_emoji',
        code: false
      }

      const expectedValue = Slack.__tests__._payloadForSlack(options)
      const convertedText = JSON.stringify(options.text, null, 2)
      expect(expectedValue.channel).toBe(options.channel)
      expect(expectedValue.text).toBe(convertedText)
      expect(expectedValue.username).toBe(options.username)
      expect(expectedValue.icon_emoji).toBe(options.icon_emoji)
    })
  })

  describe('_sendSlackMsg(): ', () => {
    test('should be valid. `request-promise` is mocked.', () => {
      const options = {
        text: { text: 'mock-text' },
        channel: 'mock-channel',
        username: 'mock-username',
        icon_emoji: 'mock-icon_emoji',
        code: false
      }

      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(options))

      expect.assertions(3)
      return Slack.__tests__._sendSlackMsg(options)
        .then((data) => {
          expect(data.url).toBe(process.env.SLACK_WEB_HOOK_URL)
          expect(data.method).toBe('PUT')
          expect(data.form).toBe(expectedForm)
        })
    })
  })

  describe('notifyError(): ', () => {
    test('should be valid. `text` argument is instance of `Error`.', () => {
      const options = {
        text: new Error('mock-text'),
        channel: 'mock-channel',
        username: 'mock-username'
      }

      const optionsForExpectedForm = Object.assign({}, options, { icon_emoji: ':fire:' })
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(optionsForExpectedForm))

      return Slack.notifyError(options)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })

    test('should be valid. Check if default argument `icon_emoji` is `:fire:`.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username'
      }

      const optionsForExpectedForm = Object.assign({}, options, { icon_emoji: ':fire:' })
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(optionsForExpectedForm))

      return Slack.notifyError(options)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })

    test('should be valid. In case if `icon_emoji` is custom and `code` is falsy.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username',
        icon_emoji: ':mock-icon_emoji:',
        code: false
      }

      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(options))

      return Slack.notifyError(options)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })
  })

  describe('notifyWarn(): ', () => {
    test('should be valid. Check if default argument `icon_emoji` is `:warning:`.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username'
      }

      const optionsForExpectedForm = Object.assign({}, options, { icon_emoji: ':warning:' })
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(optionsForExpectedForm))

      return Slack.notifyWarn(options)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })

    test('should be valid. In case if `icon_emoji` is custom and `code` is truthy.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username',
        icon_emoji: ':mock-icon_emoji:',
        code: true
      }

      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(options))

      return Slack.notifyWarn(options)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })
  })

  describe('notifyInfo(): ', () => {
    test('should be valid. Check if default argument `icon_emoji` is `information_source`.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username'
      }

      const optionsForExpectedForm = Object.assign({}, options, { icon_emoji: ':information_source:' })
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(optionsForExpectedForm))

      return Slack.notifyInfo(options)
        .then(data => {
          expect(data.form).toBe(expectedForm)
        })
    })

    test('should be valid. In case if `icon_emoji` is custom and `code` is truthy.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username',
        icon_emoji: ':mock-icon_emoji:',
        code: true
      }

      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(options))

      return Slack.notifyInfo(options)
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

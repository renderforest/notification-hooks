const config = require('../../config/config')

// Save original config.
const originalConfig = Object.assign({}, config)

config.SLACK_WEB_HOOK_URL = 'mock-SLACK_WEB_HOOK_URL'

const { SLACK_WEB_HOOK_URL } = config

const Slack = require('../../src/index').Slack

describe('lib/slack: ', () => {
  describe('_payloadForSlack(): ', () => {
    test('should return updated object. Type of `text` argument is string.', () => {
      const options = {
        text: 'mock-test',
        channel: 'mock-channel',
        username: 'mock-username',
        iconEmoji: 'mock-iconEmoji',
        codeSnippet: true
      }

      const expectedValue = Slack.__tests__._payloadForSlack(options)
      const updatedText = ['```', options.text, '```'].join('\n')
      expect(expectedValue.channel).toBe(options.channel)
      expect(expectedValue.text).toBe(updatedText)
      expect(expectedValue.username).toBe(options.username)
      expect(expectedValue.icon_emoji).toBe(options.iconEmoji)
    })

    test('should return updated object. Type of `text` argument is Object.', () => {
      const options = {
        text: { text: 'mock-text' },
        channel: 'mock-channel',
        username: 'mock-username',
        iconEmoji: 'mock-icon_emoji',
        codeSnippet: false
      }

      const expectedValue = Slack.__tests__._payloadForSlack(options)
      const convertedText = JSON.stringify(options.text, null, 2)
      expect(expectedValue.channel).toBe(options.channel)
      expect(expectedValue.text).toBe(convertedText)
      expect(expectedValue.username).toBe(options.username)
      expect(expectedValue.icon_emoji).toBe(options.iconEmoji)
    })
  })

  describe('_sendSlackMsg(): ', () => {
    test('should be valid. `node-fetch` is mocked.', () => {
      const options = {
        text: { text: 'mock-text' },
        channel: 'mock-channel',
        username: 'mock-username',
        icon_emoji: 'mock-icon_emoji',
        codeSnippet: false
      }

      const expectedBody = JSON.stringify(Slack.__tests__._payloadForSlack(options))

      expect.assertions(3)
      return Slack.__tests__._sendSlackMsg(options)
        .then((data) => {
          expect(data.url).toBe(SLACK_WEB_HOOK_URL)
          expect(data.params.method).toBe('PUT')
          expect(data.params.body).toBe(expectedBody)
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

      const optionsForExpectedForm = Object.assign({}, options, {
        iconEmoji: ':fire:',
        codeSnippet: true,
        text: {
          message: options.text.message
        }
      })
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(optionsForExpectedForm))

      return Slack.notifyError(options)
        .then(data => {
          expect(data.params.body).toBe(expectedForm)
        })
    })

    test('should be valid. Check if default argument `iconEmoji` is `:fire:`.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username'
      }

      const optionsForExpectedForm = Object.assign({}, options, { iconEmoji: ':fire:', codeSnippet: true })
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(optionsForExpectedForm))

      return Slack.notifyError(options)
        .then(data => {
          expect(data.params.body).toBe(expectedForm)
        })
    })

    test('should be valid. In case if `iconEmoji` is custom and `codeSnippet` is falsy.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username',
        iconEmoji: ':mock-icon_emoji:',
        codeSnippet: false
      }

      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(options))

      return Slack.notifyError(options)
        .then(data => {
          expect(data.params.body).toBe(expectedForm)
        })
    })
  })

  describe('notifyWarn(): ', () => {
    test('should be valid. Check if default argument `iconEmoji` is `:warning:`.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username'
      }

      const optionsForExpectedForm = Object.assign({}, options, { iconEmoji: ':warning:', codeSnippet: true })
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(optionsForExpectedForm))

      return Slack.notifyWarn(options)
        .then(data => {
          expect(data.params.body).toBe(expectedForm)
        })
    })

    test('should be valid. In case if `iconEmoji` is custom and `codeSnippet` is truthy.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username',
        iconEmoji: ':mock-iconEmoji:',
        codeSnippet: true
      }

      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(options))

      return Slack.notifyWarn(options)
        .then(data => {
          expect(data.params.body).toBe(expectedForm)
        })
    })
  })

  describe('notifyInfo(): ', () => {
    test('should be valid. Check if default argument `iconEmoji` is `information_source`.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username'
      }

      const optionsForExpectedForm = Object.assign({}, options, {
        iconEmoji: ':information_source:',
        codeSnippet: true
      })
      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(optionsForExpectedForm))

      return Slack.notifyInfo(options)
        .then(data => {
          expect(data.params.body).toBe(expectedForm)
        })
    })

    test('should be valid. In case if `iconEmoji` is custom and `codeSnippet` is truthy.', () => {
      const options = {
        text: 'mock-text',
        channel: 'mock-channel',
        username: 'mock-username',
        iconEmoji: ':mock-iconEmoji:',
        codeSnippet: true
      }

      const expectedForm = JSON.stringify(Slack.__tests__._payloadForSlack(options))

      return Slack.notifyInfo(options)
        .then(data => {
          expect(data.params.body).toBe(expectedForm)
        })
    })
  })
})

afterAll(() => {
  // Set original env.
  config.SLACK_WEB_HOOK_URL = originalConfig.SLACK_WEB_HOOK_URL
})

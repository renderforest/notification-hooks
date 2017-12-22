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

    test('should return updated object. In case if type of `text` is string.', () => {
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
})

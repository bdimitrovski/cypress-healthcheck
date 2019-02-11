require('dotenv').config()

const SlackWebhook = require('slack-webhook')
const slack = new SlackWebhook(process.env.SLACK_WEBHOOK_KEY)

const fs = require('fs')

const report = fs.readFileSync('./health-check.json', 'utf-8')

let result
let tests
let failures
let title

const data = JSON.parse(report)

if (data.failures.length) {
  failures = data.failures
  title = '<!channel> ' + 'Failing test(s) for yourawesomeapp.com'

  result = failures.map((failure) => {
    return {
      "fallback": "Test summary",
      "color": "danger",
      "text": ":x: " + failure.title
    }
  })

} else {
  title = 'Health check for yourawesomeapp.com'
  result = [
    {
      "fallback": "Test summary",
      "color": "good",
      "text": ":white_check_mark: All tests pass!" 
    }
  ]
}

slack.send({
  text: title,
  attachments: result
})
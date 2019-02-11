# slack-webhook

## Installation

```bash
npm i -S slack-webhook
```

## Usage

### Initialization

Setup an [incoming webhook](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) and copy the webhook url. This is the only required parameter to initialize the module.

```js
var SlackWebhook = require('slack-webhook')

var slack = new SlackWebhook('https://hooks.slack.com/services/your/webhook/url')
```

Optionally, you can pass in a `defaults` attribute to set defaults for the webhook's `username`, `icon_emoji` and `channel`. If no `defaults` attribute is used, it will default to the configuration that was used on the set up page.

```js
var slack = new SlackWebhook('https://hooks.slack.com/services/your/webhook/url', {
  defaults: {
    username: 'Bot',
    channel: '#general',
    icon_emoji: ':robot_face:'
  }
})
```

### Sending a message

There are two ways to send a message. The first is by passing a string as the argument.

```js
slack.send('some text')
```

The second is to pass a payload. Any options you pass in here will override the default ones you created at initialization.

```js
slack.send({
  text: 'some text',
  attachments: [
    // optional attachment data
  ],
  username: 'new username',
  icon_emoji: ':scream_cat:',
  channel: '#another-channel'
})
```

Both versions return a promise.

```js
slack.send('some text').then(function (res) {
  // succesful request
}).catch(function (err) {
  // handle request error
})
```

### Configuring Promise Library

By default, this module uses Node >= v4's `Promise` object, but you can configure it to use your preferred `Promise` library.

```js
// define it on initialization
var bluebird = require('bluebird')
var slack = new SlackWebhook('https://hooks.slack.com/services/your/webhook/url', {
  Promise: bluebird
})

// define it after initialization
var q = require('q')
var slack = new SlackWebhook('https://hooks.slack.com/services/your/webhook/url')
slack.Promise = q.Promise
```

## Tests

```
npm t
```

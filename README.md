# cypress-healthcheck
The "just add water" Cypress + Slack healthcheck reporting tools for your app.

## Why Cypress.io + Slack?

[Cypress.io](https://www.cypress.io/) is an amazing and easy to use E2E, integration and service testing tool which lives inside your codebase. Writing tests with Cypress is a breeze, and you can get started really quick.

However, sometimes you just want to check if your production app is alive and kicking, that is, if a user clicks on a certain element does something happen, is the app responsive, are certain critical elements or components present etc.

This is a perfect use case for Cypress and Slack, to help notify you if any production issues occur.

## Installation

Simply clone the repo and run:

```bash
npm install
```

Then, create a `.env` file in your project root, with the Slack Incoming Webhook key:

```bash
SLACK_WEBHOOK_KEY="YOUR_SLACK_INCOMING_WEBHOOK_KEY"
``` 

[How to setup incoming slack webhooks](https://api.slack.com/incoming-webhooks)

This demo uses the [Vue.js HN clone](https://vue-hn.herokuapp.com/top) and `mocha-spec-json-output-reporter` to output the test results. Feel free to use any other [reporter](https://docs.cypress.io/guides/tooling/reporters.html) you like.

## Usage

You can run this either locally or on your server with a cronjob to automate the tests. To run locally, just do a simple:

```bash
npm run healthcheck
```

Make sure to customize `cypress.json` to your own needs, and write some more tests in `cypress/integration`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

# mocha-spec-json-output-reporter
mocha spec + json output file reporter

Combines the spec and json reporter but instead of outputting the json to the console, writes it to a file

# Install
```
npm install --save-dev mocha-spec-json-output-reporter
```

# Run with Mocha
```
mocha -R mocha-spec-json-output-reporter
```

# Output file
The default file output will be `mocha-output-<date>` in the current working directory

## Reporter Options
* fileName - specify exact name of output file
* filePath - specify exact directory to put output file - this path must exist
* hierarchy - (true|false) - if enabled will place inner describe blocks as inner test suites of the parent describe block

```
mocha --reporter-options fileName=my-file.json,filePath=/mydirectory/subfolder,hierarchy=true
```

### Example Output - Default Mode
```
{
  "stats": {
    "suites": 3,
    "tests": 6,
    "passes": 3,
    "pending": 1,
    "failures": 2,
    "start": "2018-03-12T21:38:41.618Z",
    "end": "2018-03-12T21:38:41.634Z",
    "duration": 16
  },
  "suites": [
    {
      "title": "suite 1",
      "tests": [
        {
          "title": "test pass",
          "duration": 0,
          "result": "passed",
          "err": {}
        },
        {
          "title": "test fail",
          "duration": 0,
          "result": "failed",
          "err": {
            "stack": "AssertionError [ERR_ASSERTION]: null == true\n    at Context.it (test\\sample-test.js:7:32)",
            "message": "null == true",
            "generatedMessage": true,
            "name": "AssertionError [ERR_ASSERTION]",
            "code": "ERR_ASSERTION",
            "actual": null,
            "expected": true,
            "operator": "=="
          }
        },
        {
          "title": "skipped test",
          "result": "pending",
          "err": {}
        }
      ]
    },
    {
      "title": "nested describe",
      "tests": [
        {
          "title": "nested test pass",
          "duration": 0,
          "result": "passed",
          "err": {}
        },
        {
          "title": "nested test fail",
          "duration": 0,
          "result": "failed",
          "err": {
            "stack": "AssertionError [ERR_ASSERTION]: null == true\n    at Context.it (test\\sample-test.js:11:41)",
            "message": "null == true",
            "generatedMessage": true,
            "name": "AssertionError [ERR_ASSERTION]",
            "code": "ERR_ASSERTION",
            "actual": null,
            "expected": true,
            "operator": "=="
          }
        }
      ]
    },
    {
      "title": "suite 2",
      "tests": [
        {
          "title": "suite2 pass",
          "duration": 0,
          "result": "passed",
          "err": {}
        }
      ]
    }
  ],
  "pending": [
    {
      "title": "skipped test",
      "result": "pending",
      "err": {}
    }
  ],
  "failures": [
    {
      "title": "test fail",
      "duration": 0,
      "result": "failed",
      "err": {
        "stack": "AssertionError [ERR_ASSERTION]: null == true\n    at Context.it (test\\sample-test.js:7:32)",
        "message": "null == true",
        "generatedMessage": true,
        "name": "AssertionError [ERR_ASSERTION]",
        "code": "ERR_ASSERTION",
        "actual": null,
        "expected": true,
        "operator": "=="
      }
    },
    {
      "title": "nested test fail",
      "duration": 0,
      "result": "failed",
      "err": {
        "stack": "AssertionError [ERR_ASSERTION]: null == true\n    at Context.it (test\\sample-test.js:11:41)",
        "message": "null == true",
        "generatedMessage": true,
        "name": "AssertionError [ERR_ASSERTION]",
        "code": "ERR_ASSERTION",
        "actual": null,
        "expected": true,
        "operator": "=="
      }
    }
  ],
  "passes": [
    {
      "title": "test pass",
      "duration": 0,
      "result": "passed",
      "err": {}
    },
    {
      "title": "nested test pass",
      "duration": 0,
      "result": "passed",
      "err": {}
    },
    {
      "title": "suite2 pass",
      "duration": 0,
      "result": "passed",
      "err": {}
    }
  ]
}
```

### Example Output - Hierarchy
```
{
  "stats": {
    "suites": 3,
    "tests": 6,
    "passes": 3,
    "pending": 1,
    "failures": 2,
    "start": "2018-03-12T21:39:37.802Z",
    "end": "2018-03-12T21:39:37.817Z",
    "duration": 15
  },
  "suites": [
    {
      "title": "suite 1",
      "tests": [
        {
          "title": "test pass",
          "duration": 0,
          "result": "passed",
          "err": {}
        },
        {
          "title": "test fail",
          "duration": 2,
          "result": "failed",
          "err": {
            "stack": "AssertionError [ERR_ASSERTION]: null == true\n    at Context.it (test\\sample-test.js:7:32)",
            "message": "null == true",
            "generatedMessage": true,
            "name": "AssertionError [ERR_ASSERTION]",
            "code": "ERR_ASSERTION",
            "actual": null,
            "expected": true,
            "operator": "=="
          }
        },
        {
          "title": "skipped test",
          "result": "pending",
          "err": {}
        }
      ],
      "suites": [
        {
          "title": "nested describe",
          "tests": [
            {
              "title": "nested test pass",
              "duration": 0,
              "result": "passed",
              "err": {}
            },
            {
              "title": "nested test fail",
              "duration": 0,
              "result": "failed",
              "err": {
                "stack": "AssertionError [ERR_ASSERTION]: null == true\n    at Context.it (test\\sample-test.js:11:41)",
                "message": "null == true",
                "generatedMessage": true,
                "name": "AssertionError [ERR_ASSERTION]",
                "code": "ERR_ASSERTION",
                "actual": null,
                "expected": true,
                "operator": "=="
              }
            }
          ],
          "suites": []
        }
      ]
    },
    {
      "title": "suite 2",
      "tests": [
        {
          "title": "suite2 pass",
          "duration": 0,
          "result": "passed",
          "err": {}
        }
      ],
      "suites": []
    }
  ],
  "pending": [
    {
      "title": "skipped test",
      "result": "pending",
      "err": {}
    }
  ],
  "failures": [
    {
      "title": "test fail",
      "duration": 2,
      "result": "failed",
      "err": {
        "stack": "AssertionError [ERR_ASSERTION]: null == true\n    at Context.it (test\\sample-test.js:7:32)",
        "message": "null == true",
        "generatedMessage": true,
        "name": "AssertionError [ERR_ASSERTION]",
        "code": "ERR_ASSERTION",
        "actual": null,
        "expected": true,
        "operator": "=="
      }
    },
    {
      "title": "nested test fail",
      "duration": 0,
      "result": "failed",
      "err": {
        "stack": "AssertionError [ERR_ASSERTION]: null == true\n    at Context.it (test\\sample-test.js:11:41)",
        "message": "null == true",
        "generatedMessage": true,
        "name": "AssertionError [ERR_ASSERTION]",
        "code": "ERR_ASSERTION",
        "actual": null,
        "expected": true,
        "operator": "=="
      }
    }
  ],
  "passes": [
    {
      "title": "test pass",
      "duration": 0,
      "result": "passed",
      "err": {}
    },
    {
      "title": "nested test pass",
      "duration": 0,
      "result": "passed",
      "err": {}
    },
    {
      "title": "suite2 pass",
      "duration": 0,
      "result": "passed",
      "err": {}
    }
  ]
}
```

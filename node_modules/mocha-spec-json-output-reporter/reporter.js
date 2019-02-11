const mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const inherits = require('util').inherits;

module.exports = Reporter;

function Reporter(runner, options) {
  mocha.reporters.Spec.call(this, runner);

  const self = this;
  const suites = [];
  const parentSuites = [];
  const pending = [];
  const failures = [];
  const passes = [];
  let currentSuite = null;

  const date = moment().format('YYYYMMDDHHmmss');
  const defaultFileName = `mocha-output-${date}.json`;
  const defaultFilePath = process.cwd();

  let fileName = defaultFileName;
  let filePath = path.join(defaultFilePath, fileName);
  let hierarchyMode = false;

  if (options && options.reporterOptions) {
    if (options.reporterOptions.fileName) {
      fileName = options.reporterOptions.fileName;
      filePath = path.join(defaultFilePath, fileName);
    }
    if (options.reporterOptions.filePath) {
      filePath = path.join(options.reporterOptions.filePath, fileName);
    }
    if (options.reporterOptions.hierarchy) {
      hierarchyMode = options.reporterOptions.hierarchy === 'true';
    }
  }

  runner.on('suite', (suite) => {
    if (suite.title) {
      const newSuite = {
        title: suite.title,
        tests: [],
      };
      if (hierarchyMode) {
        newSuite.suites = [];
        if (parentSuites.length === 0) {
          suites.push(newSuite);
        } else {
          parentSuites[parentSuites.length - 1].suites.push(newSuite);
        }
        parentSuites.push(newSuite);
      } else {
        suites.push(newSuite);
      }
      currentSuite = newSuite;
    }
  });

  runner.on('suite end', (suite) => {
    if (hierarchyMode) {
      parentSuites.pop();
    }
  });

  runner.on('test end', (test) => {
    currentSuite.tests.push(formatTest(test));
  });

  runner.on('pass', (test) => {
    passes.push(test);
  });

  runner.on('fail', (test) => {
    failures.push(test);
  });

  runner.on('pending', (test) => {
    pending.push(test);
  });

  runner.once('end', () => {
    const obj = {
      stats: self.stats,
      suites,
      pending: pending.map(formatTest),
      failures: failures.map(formatTest),
      passes: passes.map(formatTest),
    };

    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
  });
}

const getTestResult = (test) => {
  if (test.state) {
    return test.state;
  }
  if (test.pending === true) {
    return 'pending';
  }
  return 'unknown';
};

const formatTest = (test) => ({
  title: test.title,
  duration: test.duration,
  result: getTestResult(test),
  err: errorJSON(test.err || {}),
});

const errorJSON = (err) => {
  const res = {};
  Object.getOwnPropertyNames(err).forEach((key) => {
    res[key] = err[key];
  }, err);
  return res;
};

inherits(Reporter, mocha.reporters.Spec);

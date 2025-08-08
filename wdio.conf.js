import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
    // WebdriverIO will run your tests using as many workers as possible in a single process.
    // In order to run your tests with workers, set environment variable like
    // WDIO_LOG_LEVEL=0 --maxInstances=10 or run wdio with --env maxInstances=10
    // https://webdriver.io/docs/configuration#maxinstances
    maxInstances: 1,
    
    // Define which test specs should run. The pattern is relative to the directory
    // of the configuration file being run.
    specs: [
        './test/specs/**/*.test.js'
    ],
    
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure you capabilities.
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    // For Chrome/Chromium https://googlechromelabs.github.io/chrome-for-testing/
    // If you use a different path than the standard `/usr/bin/google-chrome` you
    // probably need to configure the `chromeBinary` capability
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--window-size=1920,1080'
            ]
        }
    }],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',

    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'https://web-production-c47e.up.railway.app',

    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,

    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,

    // Default request retries count
    connectionRetryCount: 3,

    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: [],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',

    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,

    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,

    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,

    // Test reporter for stdout.
    // The only one supported by default is 'spec'
    // see also: https://webdriver.io/docs/reporters
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
        }]
    ],

    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        retries: 1
    },

    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        // Create screenshots directory if it doesn't exist
        const screenshotsDir = path.join(__dirname, 'test', 'screenshots');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }
    },

    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} browser list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {Object} wdio instance
     */
    before: function (capabilities, specs) {
        // Add custom browser commands
        browser.addCommand('waitForElement', async function(selector, timeout = 10000) {
            const element = await $(selector);
            await element.waitForDisplayed({ timeout });
            return element;
        });

        browser.addCommand('waitForElementNotPresent', async function(selector, timeout = 10000) {
            const element = await $(selector);
            await element.waitForDisplayed({ timeout, reverse: true });
        });

        browser.addCommand('takeScreenshot', async function(name) {
            await browser.saveScreenshot(`./test/screenshots/${name}_${Date.now()}.png`);
        });
    },

    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    beforeCommand: function (commandName, args) {
    },

    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    beforeSuite: function (suite) {
        console.log(`🧪 Starting test suite: ${suite.title}`);
    },

    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function (test, context) {
        console.log(`📝 Running test: ${test.title}`);
    },

    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before collecting
     * beforeEach hook)
     */
    beforeHook: function (test, context) {
    },

    /**
     * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after executing the
     * afterEach hook)
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }) {
    },

    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {Object}  test             test object
     * @param {Object}  context          scope object the test was executed with
     * @param {Array}   results          array of result object
     * @param {Array}   errors           array of Error
     * @param {Number}  duration         time the test took in milliseconds to run
     * @param {Number}  retries          number of retries used
     */
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Take screenshot on test failure
            browser.takeScreenshot(`failed_${test.title.replace(/\s+/g, '_')}`);
        }
    },

    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    afterSuite: function (suite) {
        console.log(`🏁 Completed test suite: ${suite.title}`);
    },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object
     */
    afterCommand: function (commandName, args, result, error) {
    },

    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test result.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. '0-0')
     */
    after: function (result, capabilities, specs) {
    },

    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    afterSession: function (config, capabilities, specs) {
    },

    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: function(exitCode, config, capabilities, results) {
        console.log(`🎯 Test execution completed with exit code: ${exitCode}`);
    },

    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    onReload: function(oldSessionId, newSessionId) {
    }
};

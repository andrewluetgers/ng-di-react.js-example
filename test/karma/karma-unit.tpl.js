module.exports = function ( karma ) {
  karma.set({
    /** 
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      <% scripts.forEach(function(file) { %>'<%= file %>',
      <% }); %>
    ],

    exclude: [
      'src/**/*.eg.js'
    ],

    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-firefox-launcher', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-junit-reporter'],

    // level of logging
	// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
	// CLI --log-level debug
	logLevel: karma.LOG_WARN,

	// use dots reporter, as travis terminal does not support escaping sequences
	// possible values: 'dots', 'progress', 'junit', 'teamcity'
	// CLI --reporters progress
	reporters: ['progress', 'junit'],

	junitReporter: {
	  // will be resolved to basePath (in the same way as files/exclude patterns)
	  outputFile: 'test/reports/test-results.xml'
	},

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9018,
    runnerPort: 9101,
    urlRoot: '/',

    /**
     * Disable file watching by default.
     */
    autoWatch: false,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'Chrome'
    ],
      //'Firefox',
      //'Chrome'
      //'PhantomJS'

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 5000

  });
};
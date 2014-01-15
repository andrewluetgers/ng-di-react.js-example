/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
	/**
	 * The `build_dir` folder is where our projects are compiled during
	 * development and the `compile_dir` folder is where our app resides once it"s
	 * completely built.
	 */
	build_dir: "build",
	compile_dir: "bin",
	source_dir: "src",

	/**
	 * This is a collection of file patterns that refer to our app code (the
	 * stuff in `src/`). These file paths are used in the configuration of
	 * build tasks. `js` is all project javascript, less tests. `ctpl` contains
	 * our reusable components" (`src/common`) template HTML files, while
	 * `atpl` contains the same, but for our app"s code. `html` is just our
	 * main HTML file, stylus is our main stylesheet, and `unit` contains our
	 * app"s unit tests.
	 */
	app_files: {
		js: [ "src/**/*.js", "src/**/*.jsx", "!src/**/*.spec.js", "!src/**/*.eg.js"],
		example: ["src/**/*.eg.js"],
		spec: ['src/**/*.spec.js'],
		html: [ "src/index.html" ],
		stylus: "src/index.styl"
	},

	build_js_files: [ "build/**/*.js", "!build/vendor/**/*.js"], // used for js-hint
	compiled_specs: ['test/compiled-specs/**/*.spec.js'],

	/**
	 * This is the same as `app_files`, except it contains patterns that
	 * reference vendor code (`vendor/`) that we need to place into the build
	 * process somewhere. While the `app_files` property ensures all
	 * standardized files are collected for compilation, it is the user"s job
	 * to ensure non-standardized (i.e. vendor-related) files are handled
	 * appropriately in `vendor_files.js`.
	 *
	 * The `vendor_files.js` property holds files to be automatically
	 * concatenated and minified with our project source files.
	 *
	 * The `vendor_files.css` property holds any CSS files to be automatically
	 * included in our app.
	 */
	vendor_files: {
		js: [
			"vendor/jquery/jquery-2.0.3.js",
			"vendor/lodash/lodash-2.4.1.js",
			"vendor/director/director-1.2.0.js",
			"vendor/react-0.8.0/build/react.js",
			"vendor/di/ng-di.js",
			"vendor/vendor.js"
		],
		css: [
			"vendor/bootstrap-glyphicons/css/bootstrap-glyphicons.css"
		],
		fonts: [
			"vendor/bootstrap-glyphicons/fonts/*"
		]
	},

	test_files: {
		js: [
			"test/react-fix/react-fix.js",
			"vendor/jquery/jquery-2.0.3.js",
			"vendor/lodash/lodash-2.4.1.js",
			"vendor/director/director-1.2.0.js",
			"test/react-addons-test/react-addons-test.js",
			"test/ngTest/ngTest.js",
			"test/jasmine-matchers/matchers.js",
			"vendor/di/ng-di.js",
			"vendor/di/mock.js",
			"vendor/vendor.js",
			'build/src/**/*.js',
			'test/compiled-specs/**/*.spec.js'

		]
	},

	debug_files: {
		js: [
			"debug/debug.js"
		]
	}
};

module.exports = function ( grunt ) {
	
	/** 
	 * Load required Grunt tasks. These are installed based on the versions listed
	 * in `package.json` when you do `npm install` in this directory.
	 */
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-conventional-changelog');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-ng-di-annotate');
	grunt.loadNpmTasks('grunt-react');

	// we in debug mode?

	var debug = !!grunt.option('debug');

	/**
	 * Load in our build configuration file.
	 */
	var userConfig = require('./build.config.js');
	var jshintConfig = require('./jshint.config.json');

	/**
	 * This is the configuration object Grunt uses to give each plugin its 
	 * instructions.
	 */
	var taskConfig = {
		/**
		 * We read in our `package.json` file so we can access the package name and
		 * version. It's already there, so we don't repeat ourselves here.
		 */
		pkg: grunt.file.readJSON("package.json"),

		/**
		 * The banner is the comment that is placed at the top of our compiled 
		 * source files. It is first processed as a Grunt template, where the `<%=`
		 * pairs are evaluated based on this very configuration object.
		 */
		meta: {
			banner: 
				'/**\n' +
				' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
				' */\n'
		},

		/**
		 * Creates a changelog on a new version.
		 */
		changelog: {
			options: {
				dest: 'CHANGELOG.md',
				template: 'changelog.tpl'
			}
		},

		/**
		 * Increments the version number, etc.
		 */
		bump: {
			options: {
				files: [
					"package.json"
				],
				commit: false,
				commitMessage: 'chore(release): v%VERSION%',
				commitFiles: [
					"package.json"
				],
				createTag: false,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				pushTo: 'origin'
			}
		},

		/**
		 * The directories to delete when `grunt clean` is executed.
		 */
		clean: [ 
			'<%= build_dir %>', 
			'<%= compile_dir %>',
			'<%= compiled_specs %>'
		],

		/**
		 * The `copy` task just copies files from A to B. We use it here to copy
		 * our project assets (images, fonts, etc.) and javascripts into
		 * `build_dir`, and then to copy the assets to `compile_dir`.
		 */
		copy: {
			build_assets: {
				files: [
					{ 
						src: [ '**' ],
						dest: '<%= build_dir %>/assets/',
						cwd: 'src/assets',
						expand: true
					}
			 ]	 
			},
			build_appjs: {
				files: [
					{
						src: [ '<%= app_files.js %>' ],
						dest: '<%= build_dir %>/',
						cwd: '.',
						expand: true
					}
				]
			},
			build_vendorjs: {
				files: [
					{
						src: [ '<%= vendor_files.js %>' ],
						dest: '<%= build_dir %>/',
						cwd: '.',
						expand: true
					}
				]
			},
			build_vendorcss: {
				files: [
					{
						src: [ '<%= vendor_files.css %>' ],
						dest: '<%= build_dir %>/',
						cwd: '.',
						expand: true
					}
				]
			},
			build_vendorfonts: {
				files: [
					{
						src: [ '<%= vendor_files.fonts %>' ],
						dest: '<%= build_dir %>/',
						cwd: '.',
						expand: true
					}
				]
			},
			compile_assets: {
				files: [
					{
						src: [ '**' ],
						dest: '<%= compile_dir %>/assets',
						cwd: '<%= build_dir %>/assets',
						expand: true
					}
				]
			}
		},

		/**
		 * `grunt concat` concatenates multiple source files into a single file.
		 */
		concat: {
			/**
			 * The `compile_js` target is the concatenation of our application source
			 * code and all specified vendor source code into a single file.
			 */
			compile_js: {
				options: {
					banner: '<%= meta.banner %>'
				},
				src: [
					'<%= vendor_files.js %>',
					'<%= build_dir %>/src/**/*.js',
					debug ? '<%= debug_files.js %>' : []
				],
				dest: '<%= compile_dir %>/assets/<%= pkg.name %>.js'
			},
			compile_css: {
				src: [
					'<%= vendor_files.css %>',
					'<%= compile_dir %>/assets/<%= pkg.name %>.css'
				],
				dest: '<%= compile_dir %>/assets/<%= pkg.name %>.css'
			}
		},


		/**
		 * `ngAnnotate` annotates the sources before minifying. That is, it allows us
		 * to code without the array syntax.
		 */
		ngAnnotate: {
			compile: {
				files: [
					{
						src: [ '<%= app_files.js %>' ],
						cwd: '<%= build_dir %>',
						dest: '<%= build_dir %>',
						expand: true
					}
				]
			}
		},

		react: {
			appFiles: {
				files: [{
					src: [ '<%= app_files.js %>' ],
					cwd: '<%= build_dir %>',
					dest: '<%= build_dir %>',
					ext: '.js',
					expand: true
				}]
			},
			testFiles: {
				files: [{
					src: ['**/*.spec.js', '**/*.spec.jsx'],
					cwd: '<%= source_dir %>',
					dest: 'test/compiled-specs',
					ext: '.spec.js',
					expand: true
				}]
			}
		},


		/**
		 * Minify the sources!
		 */
		uglify: {
			compile: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
				}
			}
		},

		/**
		 * Stylus compilation and minification automatically.
		 */
		stylus: {
			buildDest: '<%= build_dir %>/assets/<%= pkg.name %>.css',
			build: {

				files: {
					'<%= stylus.buildDest %>': ['<%= app_files.stylus %>'] // compile and concat into single file
				},
				options: {
					urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
					compress: false
				}
			},
			compileDest: '<%= compile_dir %>/assets/<%= pkg.name %>.css',
			compile: {

				files: {
					'<%= stylus.compileDest %>': ['<%= app_files.stylus %>'] // compile and concat into single file
				},
				options: {
					urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
					compress: true
				}
			}
		},


		/**
		 * `jshint` defines the rules of our linter as well as which files we
		 * should check. This file, all javascript sources, and all our unit tests
		 * are linted based on the policies listed in `options`. But we can also
		 * specify exclusionary patterns by prefixing them with an exclamation
		 * point (!); this is useful when code comes from a third party but is
		 * nonetheless inside `src/`.
		 */
		jshint: {
			src: [ 
				'<%= build_js_files %>'
			],
			test: [
				'<%= compiled_specs %>'
			],
			example: [
				'<%= app_files.example %>'
			],
			gruntfile: [
				'Gruntfile.js'
			],
			options: jshintConfig.options,
			globals: jshintConfig.globals
		},



		/**
		 * The Karma configurations.
		 */
		karma: {
			options: {
				configFile: '<%= build_dir %>/karma-unit.js'
			},
			unit: {
				runnerPort: 9101, // important!
				port: 9877, // important!
				background: true
			},
			continuous: {
				background: false,
				singleRun: true
			}
		},


		/**
		 * The `index` task compiles the `index.html` file as a Grunt template. CSS
		 * and JS files co-exist here but they get split apart later.
		 */
		index: {

			/**
			 * During development, we don't want to wait for compilation,
			 * concatenation, minification, etc. So to avoid these steps, we simply
			 * add all script files directly to the index.html. The
			 * `src` property contains the list of included files.
			 */
			build: {
				dir: '<%= build_dir %>',
				src: [
					'<%= vendor_files.js %>',
					'<%= build_dir %>/src/**/*.js',
					'<%= vendor_files.css %>', // also uncomment vendor_files.css in build.config.js
					'<%= stylus.buildDest %>'
				]
			},

			/**
			 * When it is time to have a completely compiled application, we can
			 * alter the above to include only a single JavaScript and a single CSS
			 * file. Now we're back!
			 */
			compile: {
				dir: '<%= compile_dir %>',
				src: [
					//'<%= vendor_files.js %>', // vendor js is added into clario.js
					'<%= concat.compile_js.dest %>',
					//'<%= vendor_files.css %>', // vendor css is added into clario.css
					'<%= stylus.compileDest %>'
				]
			}
		},

		/**
		 * This task compiles the karma template so that changes to its file array
		 * don't have to be managed manually.
		 */
		karmaconfig: {
			unit: {
				dir: '<%= build_dir %>',
				src: [ 
					'<%= test_files.js %>'
				]
			}
		},

		/**
		 * And for rapid development, we have a watch set up that checks to see if
		 * any of the files listed below change, and then to execute the listed 
		 * tasks when they do. This just saves us from having to type "grunt" into
		 * the command-line every time we want to see what we're working on; we can
		 * instead just leave "grunt watch" running in a background terminal. Set it
		 * and forget it, as Ron Popeil used to tell us.
		 *
		 * But we don't need the same thing to happen for all the files. 
		 */
		delta: {
			/**
			 * By default, we want the Live Reload to work for all tasks; this is
			 * overridden in some tasks (like this file) where browser resources are
			 * unaffected. It runs by default on port 35729, which your browser
			 * plugin should auto-detect.
			 */
			options: {
				livereload: true
			},

			/**
			 * When the Gruntfile changes, we just want to lint it. In fact, when
			 * your Gruntfile changes, it will automatically be reloaded!
			 */
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: [ 'jshint:gruntfile' ],
				options: {
					livereload: false
				}
			},

			/**
			 * When our JavaScript source files change, we want to run lint them and
			 * run our unit tests.
			 */
			jssrc: {
				files: [
					'<%= app_files.js %>'
				],
				tasks: [ 'copy:build_appjs', 'react', 'ngAnnotate', 'jshint:src', 'karma:unit:run' ]
			},

			/**
			 * When assets are changed, copy them. Note that this will *not* copy new
			 * files, so this is probably not very useful.
			 */
			assets: {
				files: [ 'src/assets/**/*' ],
				tasks: [ 'copy:build_assets' ]
			},

			/**
			 * When index.html changes, we need to compile it.
			 */
			html: {
				files: [ '<%= app_files.html %>' ],
				tasks: [ 'index:build' ]
			},


			/**
			 * When the CSS files change, we need to compile and minify them.
			 */
			stylus: {
				files: [ 'src/**/*.styl' ],
				tasks: [ 'stylus:build' ]
			},

			/**
			 * When a JavaScript unit test file changes, we only want to lint it and
			 * run the unit tests. We don't want to do any live reloading.
			 */
			jsunit: {
				files: [
					'<%= app_files.spec %>'
				],
				tasks: [ 'react', 'ngAnnotate', 'jshint:test', 'karma:unit:run' ],
				options: {
					livereload: false
				}
			}
		}
	};

	grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

	/**
	 * In order to make it safe to just compile or copy *only* what was changed,
	 * we need to ensure we are starting from a clean, fresh build. So we rename
	 * the `watch` task to `delta` (that's why the configuration var above is
	 * `delta`) and then add a new task called `watch` that does a clean build
	 * before watching for changes.
	 */
	grunt.renameTask( 'watch', 'delta' );
	grunt.registerTask( 'watch', [ 'build', 'karma:unit', 'delta' ] );

	/**
	 * The default task is to build and compile.
	 */
	grunt.registerTask( 'default', [ 'build', 'compile' ] );

	/**
	 * The `build` task gets your app ready to run for development and testing.
	 */
	grunt.registerTask( 'build', [
		'clean', 'stylus:build', 'copy:build_vendorcss', 'copy:build_vendorfonts', 'copy:build_assets',
		'copy:build_appjs', 'react', 'ngAnnotate', 'jshint', 'copy:build_vendorjs',
		'index:build', 'karmaconfig', 'karma:continuous'
	]);

	/**
	 * The `compile` task gets your app ready for deployment by concatenating and
	 * minifying your code.
	 */
	grunt.registerTask( 'compile', [
		'stylus:compile', 'copy:compile_assets', 'concat', 'index:compile' // , 'uglify'
	]);

	/**
	 * A utility function to get all app JavaScript sources.
	 */
	function filterForJS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.js$/ );
		});
	}

	/**
	 * A utility function to get all app CSS sources.
	 */
	function filterForCSS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.css$/ );
		});
	}

	/** 
	 * The index.html template includes the stylesheet and javascript sources
	 * based on dynamic names calculated in this Gruntfile. This task assembles
	 * the list into variables for the template to use and then runs the
	 * compilation.
	 */
	grunt.registerMultiTask('index', 'Process index.html template', function () {
		var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g' );
		var jsFiles = filterForJS(this.filesSrc).map( function(file) {
			return file.replace( dirRE, '' );
		});
		var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
			return file.replace( dirRE, '' );
		});

		grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
			process: function ( contents, path ) {
				return grunt.template.process( contents, {
					data: {
						scripts: jsFiles,
						styles: cssFiles,
						version: grunt.config( 'pkg.version' )
					}
				});
			}
		});
	});

	/**
	 * In order to avoid having to specify manually the files needed for karma to
	 * run, we use grunt to manage the list for us. The `karma/*` files are
	 * compiled as grunt templates for use by Karma. Yay!
	 */
	grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
		var jsFiles = filterForJS( this.filesSrc );
//		console.log("test files:", jsFiles);
		grunt.file.copy( 'test/karma/karma-unit.tpl.js', grunt.config( 'build_dir' ) + '/karma-unit.js', {
			process: function ( contents, path ) {
				return grunt.template.process( contents, {
					data: {
						scripts: jsFiles
					}
				});
			}
		});
	});

};

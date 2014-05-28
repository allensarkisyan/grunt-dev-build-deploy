/**
 * @name grunt-build-deploy
 * @version 1.0.0
 * @author Allen Sarkisyan
 */
var fs = require('fs');

module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');
	var buildConfig = grunt.file.readJSON('build-config.json');
	var devOpsConfig = grunt.file.readJSON('continuous-devops-config.json');

	buildConfig.cssmin.options.banner = buildConfig.uglify.options.banner = buildConfig.banner;

	grunt.initConfig({
		pkg: pkg,
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					nodeArgs: ['--debug'],
					watchedFolders: devOpsConfig.nodemon.watchedFolders,
					env: {
						PORT: '80'
					},
					ignore: devOpsConfig.nodemon.ignore,
					callback: function (nodemon) {
						nodemon.on('log', function (event) {
							console.log(event.colour);
						});

						nodemon.on('restart', function () {
							setTimeout(function() {
								fs.writeFileSync('.rebooted', 'rebooted');
							}, 1000);
						});
					}
				}
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: false,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					jQuery: true
				},
				'-W099': true,
				'-W083': true
			},
			dev: {
				src: devOpsConfig.jshint.files
			}
		},
		clean: buildConfig.clean.directories,
		concat: buildConfig.concat.files,
		cssmin: {
			minify: {
				options: buildConfig.cssmin.options,
				files: buildConfig.cssmin.files
			}
		},
		uglify: {
			options: buildConfig.uglify.options,
			production: buildConfig.uglify.environment.production
		},
		copy: buildConfig.copy,
		watch: {
			npm: {
				files: ['package.json'],
				tasks: ['shell:npm-install'],
				options: { spawn: false }
			},
			scripts: {
				files: devOpsConfig.watch.scripts.files,
				tasks: ['jshint'],
				options: { spawn: false }
			},
			views: {
				/* hack for now .rebooted - need to figure out a way to run multiple livereload servers with no conflicts */
				files: devOpsConfig.watch.views.files,
				options: {
					spawn: false,
					livereload: true
				}
			},
			karma: {
				files: devOpsConfig.watch.karma.files,
				tasks: ['jshint', 'karma:continuous:run']
			}
		},
		shell: {
			'npm-install': { command: 'npm install' }
		},
		karma: {
			options: {
				configFile: 'karma.conf.js',
				runnerPort: 9999,
				logLevel: 'ERROR',
				browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS']
			},
			continuous: {
				options: {
					background: true,
					singleRun: false,
					files: devOpsConfig.karma.test.files,
					browsers: ['PhantomJS']
				}
			},
			test: {
				options: {
					singleRun: true,
					reporters: ['progress', 'coverage'],
					coverageReporter: {
						type : 'html',
						dir : 'tests/coverage/'
					},
					files: devOpsConfig.karma.test.files,
					preprocessors: devOpsConfig.karma.test.preprocessors
				}
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true,
				limit: 100
			},
			dev: {
				tasks: ['nodemon:dev', 'watch:npm', 'watch:scripts', 'watch:views']
			},
			test: {
				tasks: ['watch:karma']
			},
			TDD: {
				tasks: ['nodemon:dev', 'watch']
			}
		}
	});

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	/* Dev environment */
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('dev', ['concurrent:dev']);

	grunt.registerTask('dev:tdd', ['karma:continuous:start', 'concurrent:test']);

	grunt.registerTask('test', ['karma:test:start']);

	grunt.registerTask('TDD', ['karma:continuous:start', 'concurrent:TDD']);

	grunt.registerTask('build:production', [
		'clean:build',
		'clean:public',
		'jshint:dev',
		'concat',
		'cssmin',
		'uglify:production',
		'copy:production'
	]);

	grunt.registerTask('compile', [
		'build:production'
	]);

	grunt.registerTask('default', 'compile');
};
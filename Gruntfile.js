/**
 * @name grunt-build-deploy
 * @version 1.0.0
 * @author Allen Sarkisyan
 */
module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');
	var buildConfig = grunt.file.readJSON('build-config.json');

	buildConfig.cssmin.options.banner = buildConfig.uglify.options.banner = buildConfig.banner;

	grunt.initConfig({
		pkg: pkg,
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
				src: [
					'Gruntfile.js'
				]
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
		copy: buildConfig.copy
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

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
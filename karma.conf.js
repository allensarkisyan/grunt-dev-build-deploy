module.exports = function(config) {
	config.set({
		basePath: '',
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],
		files: [],
		exclude: [],
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {},
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],
		port: 9999,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: [],
		singleRun: false
	});
};
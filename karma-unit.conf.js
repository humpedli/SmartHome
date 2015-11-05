var sharedConfig = require('./karma-shared.conf.js');

module.exports = function (config) {
    var conf = sharedConfig(config);

    conf.files = conf.files.concat([
        //Angular mocks
        'bower_components/angular-mocks/angular-mocks.js',

        //Unit test files
        'src/test/unit/**/*.spec.js'
    ]);

    // the default configuration
    conf.junitReporter = {
        outputDir: 'test-results', // results will be saved as $outputDir/$browserName.xml
        outputFile: 'unit-test.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
        suite: '', // suite will become the package name attribute in xml testsuite element
        useBrowserName: false // add browser name to report and classes names
    };

    config.set(conf);
};

var gutil = require('gulp-util');

/**
 *  Gulp Paths
 */
exports.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e'
};

// Wiredep
exports.wiredep = {
    directory: 'bower_components'
};

// Error Handler
exports.errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};

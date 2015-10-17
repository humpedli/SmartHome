'use strict';

var $, IS_RELEASE_BUILD, IS_HOST_DEFINED, IS_DEBUG, files, gulp, paths, prepend, order = {};

//Load gulp
gulp = require('gulp');

//Load gulp plugins
$ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'log', 'del', 'main-bower-files']
});

//Folder paths
paths = {
    src: 'src',
    build: 'dist',
    scripts: 'js',
    views: 'views',
    styles: 'css',
    fonts: 'fonts',
    images: 'images',
	backendMain: 'dist/api'
};

//App path
paths.app = paths.src + '/frontend';

//Libraries path
paths.libraries = paths.scripts + '/lib';

//File paths
files = {
    index: 'index.html',
    templates: '**/*.tpl.html',
    css: '**/*.css',
    less: '**/*.less',
    js: '**/*.js',
    configjs: 'config.js',
    config: {
        production: 'config.json',
        development: 'devConfig.json'
    },
    images: 'assets/images/**/*',
    fonts: 'assets/fonts/**/*',
    icons: 'assets/icons/**/*',
	backendMain: ['backend/.htaccess', 'backend/index.php']
};

files.styles = [files.css, '**/main.less'];
files.watchStyles = [files.css, files.less];

//Order of the files
order.js = [
    '**/main.module.js',
    files.js
];

IS_RELEASE_BUILD = $.util.env.production != null; // jshint ignore:line
IS_DEBUG = $.util.env.debug != null; // jshint ignore:line
IS_HOST_DEFINED = $.util.env.host != null; // jshint ignore:line

/*
 * Clean build folder and config.js
 */
gulp.task('clean', function () {
    return $.del([paths.build, paths.app + '/config.js'], function (err) {
        if (err !== null) {
            return $.util.log(err);
        }
    });
});

/*
 * Process scripts
 */
gulp.task('scripts', ['config'], function () {
    return gulp.src(files.js, {
        cwd: paths.app
    })
        .pipe($.changed(paths.scripts, {
            cwd: paths.build
        }))

        //Wrap in codes to avoid globals
        .pipe($.wrap('(function(){\n<%= contents %>\n})(this);'))

        //Check code with JSHint
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.flatten())

        //Ignore spec files in release build
        .pipe($.if(IS_RELEASE_BUILD, $.ignore('*.spec.js')))

        //Order JS files
        .pipe($.if(IS_RELEASE_BUILD, $.order(order.js)))

        //Debug for order check
        .pipe($.if(IS_DEBUG, $.debug()))

        .pipe($.if(IS_RELEASE_BUILD, $.concat('app.js')))
        .pipe($.if(IS_RELEASE_BUILD, $.ngAnnotate()))
        .pipe($.if(IS_RELEASE_BUILD, $.uglify()))
        .pipe($.if(IS_RELEASE_BUILD, $.rev()))
        .pipe(gulp.dest(paths.scripts, {
            cwd: paths.build
        }));
});

/*
 *  Compile Lass files to build folder
 */
gulp.task('styles', ['fonts'], function () {

    var lessFilter = $.filter('**/main.less');

    //Process less files
    return gulp.src(files.styles, {
        cwd: paths.src
    })
        //Filter sass files and compile them
        .pipe(lessFilter)

        //Debug for order check
        .pipe($.if(IS_DEBUG, $.debug()))

        .pipe($.less())
        .on('error', function (error) {
            console.log(error);
        })

        //Restore filter to include css files too
        .pipe(lessFilter.restore())

        //Add vendor css files
        .pipe($.addSrc($.mainBowerFiles(files.css)))
        .pipe($.flatten())

        //Debug for order check
        .pipe($.if(IS_DEBUG, $.debug()))

        .pipe($.if(IS_RELEASE_BUILD, $.concat('style.css')))
        .pipe($.if(IS_RELEASE_BUILD, $.minifyCss()))
        .pipe($.if(IS_RELEASE_BUILD, $.rev()))

        //If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.styles, {
            cwd: paths.build
        }));
});

/*
 * Compile templates and copy HTML files to paths.views
 */
gulp.task('templates', function () {
    return gulp.src(files.templates, {
        cwd: paths.app
    })
        // Check if changed
        .pipe($.changed(paths.views, {
            cwd: paths.build
        }))

        .pipe($.flatten())
        .pipe($.if(IS_RELEASE_BUILD, $.minifyHtml()))
        .pipe($.if(IS_RELEASE_BUILD, $.angularTemplatecache({
            module: 'smartHome',
            root: paths.views
        })))
        .pipe($.if(IS_RELEASE_BUILD, $.rev()))
        .pipe($.if(IS_RELEASE_BUILD, $.uglify()))

        //If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.views, {
            cwd: paths.build
        }));
});


/*
 * Copy fonts to paths.fonts
 */
gulp.task('fonts', function () {
// Get fonts from bower_components
    gulp.src($.mainBowerFiles(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2']))

        //Check if changed
        .pipe($.changed(paths.fonts, {
            cwd: paths.build
        }))

        //If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.fonts, {
            cwd: paths.build
        }));

//Get fonts from files.fonts
    return gulp.src(files.fonts, {
        cwd: paths.src
    })
        //Check if changed
        .pipe($.changed(paths.fonts, {
            cwd: paths.build
        }))

        //If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.fonts, {
            cwd: paths.build
        }));
});


/*
 *  Images
 */
gulp.task('images', function () {
//Get images from files.images
    return gulp.src(files.images, {
        cwd: paths.src
    })

        //Check if changed
        .pipe($.changed(paths.images, {
            cwd: paths.build
        }))

        //If it's a release build, then compress them
        .pipe($.if(IS_RELEASE_BUILD, $.imageOptimization({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))

        //If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.images, {
            cwd: paths.build
        }));
});


/*
 *  Extras
 */
gulp.task('icons', function () {
//Get extra files
    return gulp.src(files.icons, {
        cwd: paths.src
    })
        .pipe(gulp.dest(paths.build));
});

/*
 *  Backend main files copy
 */
gulp.task('backend', function () {
//Get extra files
	return gulp.src(files.backendMain, {
		cwd: paths.src
	})
		.pipe($.if(IS_RELEASE_BUILD, gulp.dest(paths.backendMain)));
});

/*
 *  Config
 */
gulp.task('config', function () {
    //Use different config files for production and development
    var source = (IS_RELEASE_BUILD) ? files.config.production : files.config.development;

    return gulp.src(source, {
        cwd: paths.app
    }).pipe($.ngConfig('smartHome', {
        createModule: false,
        wrap: true
    }))
        .pipe($.rename(files.configjs))
        .pipe(gulp.dest(paths.app));
});


/*
 * Compile index and inject css and scripts tags
 */
gulp.task('index', ['styles', 'images', 'icons', 'scripts', 'templates', 'backend'], function () {
    var libraries, scripts, styles;

    //Add scripts
    scripts = gulp.src(order.js, {
        cwd: paths.build,
        read: false
    })
        //Ignore libs
        .pipe($.ignore('**/lib/*.js'))

        //Order js files
        .pipe($.order(order.js));

    //Add styles
    styles = gulp.src(paths.styles + '/*.css', {
        cwd: paths.build,
        read: false
    })
        //Order css files
        .pipe($.order(order.css));

    //Add libraries from bower
    libraries = gulp.src($.mainBowerFiles({
        debugging: IS_DEBUG,
        checkExistence: true
    }))
        .pipe($.ignore.include(files.js))

        //Debug for order check
        .pipe($.if(IS_DEBUG, $.debug()))

        .pipe($.if(IS_RELEASE_BUILD, $.concat('libs.js')))
        .pipe($.if(IS_RELEASE_BUILD, $.ngAnnotate()))
        .pipe($.if(IS_RELEASE_BUILD, $.uglify()))
        .pipe($.if(IS_RELEASE_BUILD, $.rev()))
        .pipe(gulp.dest(paths.libraries, {
            cwd: paths.build
        }));

    //Generate index.html
    return gulp.src(files.index, {
        cwd: paths.app
    })
        .pipe($.inject(libraries, {
            addRootSlash: false,
            name: 'libraries'
        }))
        .pipe($.inject(scripts, {
            addRootSlash: false
        }))
        .pipe($.inject(styles, {
            addRootSlash: false
        }))
        .pipe($.if(IS_RELEASE_BUILD, $.minifyHtml()))
        .pipe(gulp.dest(paths.build));
});

prepend = function (string, array) {
    var i, item, len, returnArray;
    returnArray = [];
    if (Array.isArray(array)) {
        for (i = 0, len = array.length; i < len; i++) {
            item = array[i];
            returnArray.push(string + '/' + item);
        }
        return returnArray;
    }
    return string + '/' + array;
};


/**
 * Watch if resources change
 */
gulp.task('watch', ['index'], function () {
    if (!IS_RELEASE_BUILD) {
        $.livereload.listen();
        gulp.watch(prepend(paths.app, files.index), ['index']);
        gulp.watch(prepend(paths.app, files.templates), ['templates']);
		gulp.watch(prepend(paths.app, files.watchStyles), ['styles', 'index']);
        gulp.watch(prepend(paths.app, files.js), ['index']);
    }
});

/**
 * Start a dev webserver
 */
gulp.task('serve', ['index', 'watch'], function () {
    gulp.src(paths.build)
        .pipe($.webserver({
            livereload: true,
            open: true,
            host: (IS_HOST_DEFINED) ? $.util.env.host : undefined,
            port: 8000,
            proxies: [{
                source: '/api/',
                target: 'http://nas.kinsztler.hu/api/'
            }]
        }));
});

gulp.task('default', ['index']);

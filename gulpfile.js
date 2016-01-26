var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    path = require('path'),
    webserver = require('gulp-webserver'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

var config = {
    lessPath: path.join('resources', 'less'),
    bowerDir: 'bower_components',
    appPath: path.join('.', 'app')
}

/**
 * CSS Tasks
 */
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

var fontPaths = [
    path.join(config.bowerDir, 'fontawesome', 'fonts', '**.*'),
    path.join(config.bowerDir, 'bootstrap', 'fonts', '**.*'),
];

gulp.task('icons', function() {
    return gulp.src(fontPaths)
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', function() {
    gulp.src(path.join('resources','less','application.less'))
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [
                path.join(config.bowerDir, 'bootstrap', 'less'),
                path.join(config.bowerDir, 'fontawesome', 'less')
            ]
        }))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join('public','css')));
});

gulp.task('build-css', ['bower', 'icons', 'css']);

/**
 * JS Tasks
 */
 var jsPaths = [
    path.join(config.bowerDir, 'jquery', 'dist', 'jquery.js'),
    path.join(config.bowerDir, 'bootstrap', 'dist', 'js', 'bootstrap.js'),
    path.join('.', 'resources', 'js', 'main.js')
 ];

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify(path.join('.','app','main.js'))
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest(path.join('.', 'resources', 'js')));
})

gulp.task('js', ['browserify'], function() {
    gulp.src(jsPaths)
      .pipe(concat('application.js'))
      .pipe(gulp.dest(path.join('.','public','js')))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(path.join(config.lessPath, '**', '*.less'), ['css']);
    gulp.watch(path.join(config.appPath, '**', '*.js'), ['js']);
});

gulp.task('connect', function () {
    gulp.src('public')
        .pipe(webserver({
            livereload: false,
            directoryListing: false,
            open: "http://localhost:8000/index.html"
        }));
})

gulp.task('dev', ['watch', 'connect']);
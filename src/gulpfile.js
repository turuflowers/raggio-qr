var gulp = require('gulp');
var connect = require('gulp-connect-php');
var httpProxy = require('http-proxy');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync').create();
var del = require('del');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var fs = require('fs');
var data = require('gulp-data');
var nunjucksRender = require('gulp-nunjucks-render');
var $ = gulpLoadPlugins();
var reload = browserSync.reload;
var wrap = require('gulp-wrap');
var sitemap = require('gulp-sitemap');

var config = {
  sassPath: './resources/sass',
  bowerDir: './bower_components'
};

var dev = false;

var exec = require('child_process').exec;


// FOR BOTH
gulp.task('icons', function () {
    return gulp.src(config.bowerDir + '/components-font-awesome/fonts/**.*')
        .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
        )
        .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('styles', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'app/styles/*.css',
        'app/styles/*.scss'
    ])
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.if(dev, $.sourcemaps.write()))
        .pipe($.if(dev, gulp.dest('.tmp/styles'), gulp.dest('dist/styles')))
        .pipe(reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src([
        'app/scripts/**/*.js'
    ])
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.if(dev, $.sourcemaps.write('.')))
        .pipe($.if(dev, gulp.dest('.tmp/scripts'), gulp.dest('dist/scripts')))
        .pipe(reload({stream: true}));
});

// inject bower components
gulp.task('wiredep', function () {
    gulp.src('app/styles/*.scss')
        .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
        ignorePath: /^(\.\.\/)+/
    }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/nunjucks/layout.nunjucks')
        .pipe(wiredep({
            exclude: ['bootstrap-sass', 'magnific-popup'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app/nunjucks'));
});

// FOR DEV
gulp.task('clean', del.bind(null, ['.tmp']));

gulp.task('nunjucks', [], function () {

    // english

    var manageEnvironment = function(environment) {
        environment.addFilter('slug', function(str) {
            return str && str.replace(/\s/g, '-', str).toLowerCase();
        });

        environment.addGlobal('language', 'es')
    }

    // Gets .html and .nunjucks files in pages
    gulp.src('app/pages/**/*.+(html|nunjucks)')

        .pipe(data(function(file) {
            return JSON.parse(fs.readFileSync('app/nunjucks/meta.json'));
        }))

        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['app/nunjucks'],
            watch: true,
            manageEnv: manageEnvironment
        }))
        // output files in app folder
        .pipe(gulp.dest('.tmp'))


});

gulp.task('serve', function () {
    dev = true;

    runSequence(['clean', 'wiredep'], ['nunjucks', 'styles', 'scripts', 'fonts'], function () {


        const phpPort = 8011;
        const httpPort = 9011;

        connect.server({
            port: phpPort,
            base: 'app',
            open: false
        });

        const proxy = httpProxy.createProxyServer({});

        browserSync.init({
            notify: false,
            port: httpPort,
            server: {
                baseDir: ['.tmp', 'app'],
                routes: {
                    '/bower_components': 'bower_components'
                },
                middleware: function (req, res, next) {
                    const url = require('url').parse(req.url);

                    if (url.pathname.match(/^\/app\/?/)) {
                        proxy.web(req, res, {target: 'http://127.0.0.1:' + phpPort});
                    } else {
                        next();
                    }
                }
            }
        });

        gulp.watch([
            'app/*.html',
            'app/pages/**/*.md',
            'app/**/*.nunjucks',
            'app/images/**/*',
            '.tmp/fonts/**/*'
        ]).on('change', reload);

        gulp.watch('app/**/*.nunjucks', ['nunjucks']);
        gulp.watch('app/styles/**/*.scss', ['styles']);
        gulp.watch('app/scripts/**/*.js', ['scripts']);
        gulp.watch('dist/fonts/**/*', ['fonts']);
        gulp.watch('bower.json', ['wiredep', 'fonts']);
    });
});

// FOR BUILD
gulp.task('clean-dist', function() {
    return del(
        [
            'dist/**',
            '!dist',
            '!dist/images/**',
            '!dist/fonts/**',
            '!dist/.htaccess'
        ]);
});

gulp.task('html', ['nunjucks'], function () {
    return gulp.src('.tmp/**/*.html')
        .pipe($.useref({searchPath: ['.tmp', '.']}))
        // .pipe($.if(/\.html$/, $.htmlmin({
        //     collapseWhitespace: true,
        //     minifyCSS: true,
        //     minifyJS: {compress: {drop_console: true}},
        //     processConditionalComments: true,
        //     removeComments: true,
        //     removeEmptyAttributes: true,
        //     removeScriptTypeAttributes: true,
        //     removeStyleLinkTypeAttributes: true
        // })))
        .pipe(gulp.dest('dist'));
});

gulp.task('assets', ['icons', 'fonts'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('compress', function () {
    return gulp.src([
        'dist/**/*.js',
        'dist/**/*.css'
    ])
    .pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
    .pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
    .pipe(gulp.dest('dist/'))
});


// RUN
gulp.task('build', ['default']);

gulp.task('default', function () {
    runSequence(['clean-dist'], ['wiredep'], ['html', 'assets', 'styles'], ['compress'])
});

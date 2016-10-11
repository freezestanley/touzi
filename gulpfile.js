
'use strict';

var gulp     = require('gulp');
// var sass     = require('gulp-ruby-sass');
var sass     = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gutil    = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');
var uglify   = require('gulp-uglify');
var injectDeps = require('gulp-inject-deps');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var replace = require( 'gulp-replace' );


// projects directories and pathes
var dir = {
    sass: './css/_scss',
    css: './css',
    img: './images'
}, paths = {
    sass: dir.sass + '/**/*.scss',
    img: dir.img + '/**/*.*',
    css: dir.css + '/*.css',
}, output = {
    img: './images'
}, seed_files = [

    // lib
    './js/lib/jquery-1.11.3.min.js',
    './js/lib/require.js',
    './js/lib/underscore-min.js',

    // util
    './js/zero/util/*.js',

    // base
    './js/zero/controller.js',
    './js/zero/zero.seed.js'
];

function onError (err){
    gutil.beep()
    console.log( err );
}


/* ============
 * Task: compile .scss file
 * ============
 **/
// gulp.task( 'sass', function () {
//
//     return sass(paths.sass, {
//                 style: ['compressed'],
//                 emitCompileError:true
//             })
//         .on('error', onError)
//         .pipe(autoprefixer({
//             browsers: ['ie 6-8', 'last 5 version'],
//             cascade: false
//          }))
//         .pipe(gulp.dest(dir.css));
// });

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass({outputStyle: 'compressed'}).on('error', onError))
    .pipe(autoprefixer({
      browsers: ['ie 6-8', 'last 5 version'],
      cascade: false
    }))
    .pipe(gulp.dest(dir.css));
});
/* ============
 * Task: watch .scss file
 * ============
 **/
gulp.task( 'watch:sass', function () {

    gulp.watch( paths.sass, [ 'sass' ]);
});

gulp.task( 'build:img', function(){

    return gulp.src( paths.img )
       .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
       .pipe(gulp.dest(output.img));
});

gulp.task( 'seed', function(){

     return gulp.src( seed_files )
        .pipe( concat( 'zero.seed.dev.js' ))
        .pipe( gulp.dest( './js' ))
        .pipe( uglify( ) ).on('error', onError )
        .pipe( rename( 'zero.seed.js' ) )
        .pipe( gulp.dest( './js' ))
})

gulp.task( 'server', function(){

    browserSync({
        server: true,
        startPath:'/views/index.html',
        notify: false
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    var reload = browserSync.reload;
    gulp.watch(["./js/*.js", "./views/**/*.html", "./css/*.css"]).on('change', reload);
})

gulp.task( 'default', ['watch:sass'] );

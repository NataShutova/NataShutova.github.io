var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache       = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    svgSprite   = require('gulp-svg-sprite');

gulp.task('sass', function() {
    return gulp.src('app/sass/*.+(scss|sass)')
    .pipe(sass())
    .pipe(autoprefixer(['last 10 versions', '> 1%'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
   return gulp.src([
       'app/libs/jquery/dist/jquery.min.js',
       'app/libs/OwlCarousel/dist/owl.carousel.min.js',
   ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});


gulp.task('css-min', ['sass'], function() {
   return gulp.src(['app/css/main.css',
      'app/css/libs.css'             ])
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clear', function() {
    return cache.clearAll();
});


gulp.task('img', function() {
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});


gulp.task('sprite', function() {
    var config = {
    mode: {
        css: {		
            render: {
                scss: true
            }
        }
    }
}
    gulp.src('app/img/*.svg')
	.pipe(svgSprite(config))
	.pipe(gulp.dest('app/sass'));
});


gulp.task('watch', ['browser-sync', 'css-min', 'scripts',], function(){
    gulp.watch('app/sass/*.+(scss|sass)', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/css/**/*.css', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts', 'fonts'], function() {
    var buildCss = gulp.src([
        'app/css/main.min.css',
        'app/css/libs.min.css'
    ])
    .pipe(gulp.dest('dist/css'));
    
    var buildFonts = gulp.src('app/font/**/*')
    .pipe(gulp.dest('dist/fonts'));
    
    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));
    
    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});
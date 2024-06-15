const {src, dest, watch, parallel, series} = require('gulp');
const sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync').create(),
    newer = require('gulp-newer'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    clean = require('gulp-clean'),
    avif = require('gulp-avif'),
    webp = require('gulp-webp'),
    svgSprite = require('gulp-svg-sprite'),
    fonter = require('gulp-fonter'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    imagemin = require('gulp-imagemin');

function styles() {
    return src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
        .pipe(concat('styles.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return src(['app/js/**/*.js', '!app/js/main.min.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function images() {
    return src('app/images/src/*.{png,jpg,jpeg}')
        .pipe(newer('app/images'))
        .pipe(avif({quality: 50}))
        .pipe(src('app/images/src/*.*'))
        .pipe(newer('app/images'))
        .pipe(webp())
        .pipe(src('app/images/src/*.*'))
        .pipe(newer('app/images'))
        .pipe(imagemin())
        .pipe(dest('app/images'));
}

function fonts() {
    return src('app/fonts/**/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('app/fonts/**/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'));
}

function cleanSprite() {
    return src(['app/images/stack', 'app/images/sprite.svg'], {allowEmpty: true, base: 'app/images'})
        .pipe(clean())
}

function sprite() {
    return src('app/images/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images'));
}

function watcher() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/main.js'], scripts);
    watch(['app/images/src'], images);
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

function build() {
    return src([
        'app/css/styles.min.css',
        'app/js/main.min.js',
        'app/images/dist/*.*',
        '!app/images/dist/*.svg',
        '!app/images/dist/stack/',
        'app/images/dist/sprite.svg',
        'app/**/*.html',
        'app/fonts/**/*.woff2'
    ], {base: 'app', allowEmpty: true})
        .pipe(dest('dist'));
}

function cleanDist() {
    return src('dist', {allowEmpty: true})
        .pipe(clean());
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.clean = cleanDist;
exports.sprite = series(cleanSprite, sprite);

exports.watch = parallel(styles, images, scripts, watcher);
exports.build = series(cleanDist, build);

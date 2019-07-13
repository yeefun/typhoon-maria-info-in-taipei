const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const gulpSequence = require('gulp-sequence');
const browserSync = require('browser-sync').create();

const parseArgs = require('minimist');
const envOptions = {
  string: 'env',
  default: {
    env: 'dev',
  },
}
const options = parseArgs(process.argv.slice(2), envOptions);



gulp.task('clean', () => {
  return gulp.src('./dist/', {
      read: false
    })
    .pipe($.clean());
});



gulp.task('pug', () => {
  return gulp.src('./src/**/*.pug')
    .pipe($.plumber())
    .pipe($.pug({
      // pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});



gulp.task('css', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.postcss([autoprefixer()]))
    .pipe($.if(options.env === 'prod', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});



gulp.task('babel', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.if(options.env === 'prod', $.uglify({
      compress: {
        drop_console: true,
      },
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});



gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    // reloadDebounce: 800,
  });
});



// 監聽檔案變動
gulp.task('watch', () => {
  gulp.watch('./src/**/*.pug', ['pug']);
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/js/**/*.js', ['babel']);
});





// 開發流程
gulp.task('default', ['pug', 'css', 'babel', 'browser-sync', 'watch']);

// 發布流程
gulp.task('build', gulpSequence('clean', 'pug', 'css', 'babel'));
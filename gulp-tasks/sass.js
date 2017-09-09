'use strict';

const maps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      autoPrefix = require('gulp-autoprefixer'),
      minifyCSS = require('gulp-clean-css');

// COMPILE SASS
module.exports = (gulp) => {
  return () => {
    return gulp.src('assets/css/main.sass')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(autoPrefix())
      .pipe(minifyCSS())
      .pipe(maps.write('./sourcemaps'))
      .pipe(gulp.dest('public/css'))
  };
};
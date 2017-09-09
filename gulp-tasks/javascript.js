'use strict';

const maps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      babel = require('gulp-babel'),
      uglify = require('gulp-uglify');

const files = [
  'assets/js/tools/jQuery-begin.js',
  'assets/js/_vars.js',
  // JavaScript files go here
  'assets/js/_events.js',
  'assets/js/tools/jQuery-end.js'
];

// CONCAT JAVASCRIPT
module.exports = (gulp) => {
  return () => {
    return gulp.src(files)
      .pipe(maps.init())
      .pipe(concat('main.js'))
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(uglify())
      .pipe(maps.write('./sourcemaps'))
      .pipe(gulp.dest('public/js'))
  };
};
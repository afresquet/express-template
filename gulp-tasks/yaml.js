'use strict';

const yaml = require('gulp-yaml');

// CONVERT .yml TO .json
module.exports = (gulp) => {
  return () => {
    return gulp.src('locales/*.yml')
      .pipe(yaml({space: 2}))
      .pipe(gulp.dest('locales/json'))
  };
};
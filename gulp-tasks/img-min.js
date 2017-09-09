'use strict';

const imagemin = require('gulp-imagemin');

// MINYFY IMAGES
module.exports = (gulp) => {
  return () => {
    return gulp.src('assets/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('public/img'));
  };
};
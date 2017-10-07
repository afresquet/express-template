const pump = require('pump'),
      imagemin = require('gulp-imagemin');

// MINYFY IMAGES
module.exports = gulp => () => {
    pump([
        gulp.src('assets/img/**/*'),
        imagemin(),
        gulp.dest('public/img')
      ],
      cb
    );
  };
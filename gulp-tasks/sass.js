const maps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      autoPrefix = require('gulp-autoprefixer'),
      minifyCSS = require('gulp-clean-css');

// COMPILE SASS
module.exports = gulp => cb => {
    pump([
        gulp.src('assets/css/main.sass'),
        maps.init(),
        sass(),
        autoPrefix(),
        minifyCSS(),
        maps.write('./sourcemaps'),
        gulp.dest('public/css')
      ],
      cb
    );
  };
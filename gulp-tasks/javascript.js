const pump = require('pump'),
      maps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      babel = require('gulp-babel');

const files = [
  'assets/js/tools/jQuery-begin.js',
  'assets/js/*.js',
  'assets/js/tools/jQuery-end.js'
];

// CONCAT JAVASCRIPT
module.exports = gulp => cb => {
    pump([
        gulp.src(files),
        maps.init(),
        concat('main.js'),
        babel({
          presets: ['babili']
        }),
        maps.write('./sourcemaps'),
        gulp.dest('public/js')
      ],
      cb
    );
  };
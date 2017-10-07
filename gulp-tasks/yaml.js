const pump = require('pump'),
      yaml = require('gulp-yaml');

// CONVERT .yml TO .json
module.exports = gulp => cb => {
    pump([
        gulp.src('locales/*.yml'),
        yaml({space: 2}),
        gulp.dest('locales/json')
      ],
      cb
    );
  };
const gulp = require('gulp');

// getTask()
const getTask = task => require('./gulp-tasks/' + task)(gulp);

// DEFAULT
gulp.task('default', ['browser-sync', 'watch']);

// WATCH
gulp.task('watch', getTask('watch'));

// COMPILE SASS
gulp.task('sass', getTask('sass'));

// CONCAT JAVASCRIPT
gulp.task('javascript', getTask('javascript'));

// CREATE ROUTE FILES
gulp.task('route', getTask('route'));

// CONVERT .yml TO .json
gulp.task('yaml', getTask('yaml'));

// MINIFY IMAGES
gulp.task('img-min', getTask('img-min'));

// DEVELOPER SERVER
gulp.task('nodemon', getTask('nodemon'));
gulp.task('browser-sync', ['nodemon'], getTask('browser-sync'));
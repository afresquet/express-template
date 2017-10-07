// WATCH
module.exports = gulp => () => {
    gulp.watch('assets/css/**/*', ['sass']);
    gulp.watch('assets/js/**/*', ['javascript']);
    gulp.watch('assets/img/*', ['img-min'])
    gulp.watch('locales/*.yml', ['yaml']);
  };
const browserSync = require('browser-sync');

// COMPILE SASS
module.exports = gulp => () => {
    browserSync.init(null, {
      proxy: "http://localhost:3000",
      files: ["./views/**", "./public/css/**", './public/img/**'],
      browser: "google chrome",
      port: 4000
    });
  };
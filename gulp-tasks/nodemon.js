const nodemon = require('gulp-nodemon'),
      browserSync = require('browser-sync');

let browserReloadDelay = 500;

// NODEMON
module.exports = gulp => cb => {
    var started = false;
    
    return nodemon({
      script: 'app.js'
    }).on('start', () => {
      if (!started) {
        cb();
        started = true; 
      } 
    }).on('restart', () => {
      setTimeout(() => {
        browserSync.reload({
          stream: false
        });
      }, browserReloadDelay);
    });
  };
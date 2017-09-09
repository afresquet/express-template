'use strict';

const nodemon = require('gulp-nodemon'),
      browserSync = require('browser-sync');

let browserReloadDelay = 500;

// NODEMON
module.exports = (gulp) => {
  return (cb) => {
    var started = false;
    
    return nodemon({
      script: 'index.js'
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
};
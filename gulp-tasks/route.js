'use strict';

const fs = require('fs'),
      file = require('gulp-file'),
      clipboardy = require('clipboardy');

let name = process.argv.splice(4).toString();

let jsContent =
`'use strict';
  
const router = require('express').Router();
  
router.get('/', (req, res) => res.render('${name}', { t: res.__ }));
  
module.exports = router;`;
      
let clipboard =
`const ${name} = require('./routes/${name}'); // ${name}.js
app.use('/${name}', ${name});`;
      
let pugContent =
`extends layouts/main

block content
  section.${name}
    .container`;
      
let sassContent = `section.${name}`;

// CREATE ROUTE FILES
module.exports = (gulp) => {
  return () => {
    fs.access(`./routes/${name}.js`, (fileNotExists) => {
      if (fileNotExists) {
        file(`${name}.js`, jsContent)
          .pipe(gulp.dest('routes'))
        console.log(`Route file created at './routes/${name}.js'.`);
        clipboardy.writeSync(clipboard);
        console.log('Route copied to the clipboard, paste it in \'./app.js\' under // ROUTES\n');
      } 
      else console.log('A Route file with that name already exists.\n');
    });

    fs.access(`./views/${name}.pug`, (fileNotExists) => {
      if (fileNotExists) {
        file(`${name}.pug`, pugContent)
          .pipe(gulp.dest('views'))
        console.log(`Pug file created at './views/${name}.pug'.\n`);
      }
      else console.log('A Pug file with that name already exists.\n');
    });

    fs.access(`./assets/css/pages/${name}.sass`, (fileNotExists) => {
      if (fileNotExists) {
        file(`${name}.sass`, sassContent)
          .pipe(gulp.dest('assets/css/pages'))
        console.log(`Sass file created at './assets/css/pages/${name}.sass'.`);
        console.log(`Add it to './assets/css/main.sass' as '@import 'pages/${name}''\n`)
      }
      else console.log('A Sass file with that name already exists.\n');
    });
  };
};
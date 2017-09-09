# My Express Template

This is the template that I use to create Express applications.

Probably some things could be better, it's just a learning project but I'll update it as I learn more stuff.

Any feedback is appreciated.

---

## Table of Contents

1. [TL;DR](#tldr)
2. [Getting Started](#getting-started)
   * [System Preparation](#system-preparation)
   * [Local Instalation](#local-installation)
3. [Views](#views)
4. [Sass](#sass)
5. [JavaScript](#javascript)
6. [Gulp](#gulp)
   * [watch](#gulp-watch)
   * [sass](#gulp-sass)
   * [javascript](#gulp-javascript)
   * [img-min](#gulp-img-min)
   * [route](#gulp-route--r-nameofroute)
   * [yaml](#gulp-yaml)
   * [nodemon](#gulp-nodemon)
   * [browser-sync](#gulp-browser-sync)
   * [Create a new task](#create-a-new-task)
   * [Add a task to gulpfile.js](#add-a-task-to-gulpfilejs)
7. [i18n](#i18n)

---

## TL;DR

* Install locally following the [Getting Started](#getting-started) section.

* Run the command `gulp` inside the directory to start the server and browser-sync. This also watches for files and restarts the server/reloads the browser when needed.

* Files are written modularly, and Gulp takes care of making them work. Just need to add them where gulp requires to (Sass files under `./assets/css/main.scss` and Javascript files in the `files` array under `./gulp-tasks/javascript.js`).

* Internationalization with [i18n](#i18n) is built in. Make the _.yml_ files under `./locales/` and they get converted into _.json_. Their route and cookie also get automatically created.

---

## Getting Started

### System Preparation

1. Install [Node.js](https://nodejs.org/).
2. Install [Gulp](https://github.com/gulpjs/gulp) globally running `npm install gulp -g`.

### Local Installation

1. Clone or download this repository.
2. Run `npm install` inside its directory.

---

## Views

Pug is the View Engine used, the files get automatically rendered as HTML.

Find the views folders under `./views/`

---

## Sass

Sass is used to style the pages, it gets both compiled to CSS and minified with **Gulp**.

Place the Sass files under `./assets/css/`

### main.sass

This is where every file gets imported into a single file. It should be declared in the desired order with the keyword `@import` followed by the _file source_, like this:

```sass
@import 'base/base'

@import 'layouts/container'

@import 'modules/header'
@import 'modules/footer'

@import 'pages/index'
```

The compiled and minified file, and its sourcemap, are located at `./public/css/`.

---

## Javascript

Javascript files go inside `./assets/js/`

Everything should be written on its own file to keep the scripts modular, but declaring variables in `_vars.js` and declaring events in `_events.js`.

To see where to add the files to get them compiled, check the [`gulp javascript` task](#gulp-javascript).

The compiled and minified file, and its sourcemap, are located at `./public/js/`.

---

## [Gulp](https://github.com/gulpjs/gulp)

**Gulp** is used for development in this app. The _gulpfile_ is located at `./gulpfile.js`.

It runs the server, watches files and runs the necesary tasks when different files get modified.

The command used to run all the previously said is:

```sh
$ gulp 
```

We'll look at all the available tasks now.

### `$ gulp watch`

This task is found in `./gulp-tasks/watch.js` and watches for four things:

1. Modified `.sass` files under `./assets/css/`, runs the task `sass`.
2. Modified `.js` files under `./assets/js/`, runs the task `javascript`.
3. Adding images under `./assets/img`, runs the task `img-min`.
4. Modified `.yml` files under `./locales/`, runs the task `yaml`.

### `$ gulp sass`

This task is found in `./gulp-tasks/sass.js` and does the following:

1. Compiles the `main.sass` file into CSS.
2. Adds any necessary prefixes required by some browsers.
3. Minifies the file to make its size smaller.
4. Creates a sourcemap for clarity.

The resulting files go to `./public/css/`.

### `$ gulp javascript`

This task is found in `./gulp-tasks/javascript.js` and does the following:

1. Concatenates all provided files into a single one.
2. Converts file to ES5 (couldn't get it to work with the minifier nor the sourcemaps without this ¯\\\_(ツ)_/¯).
3. Minifies the file to make its size smaller.
4. Creates a sourcemap for clarity.

To know what files the task should concatenate, they need their path to be declared in the _files_ array at the task file:

```javascript
const files = [
  'assets/js/tools/jQuery-begin.js',
  'assets/js/_vars.js',
  // Files go here
  'assets/js/_events.js',
  'assets/js/tools/jQuery-end.js'
];
```

Adding a file to the array requires a Gulp restart.

The resulting files go to `./public/js/`.

### `$ gulp img-min`

This task is found in `./gulp-tasks/img-min.js` and minifies the images to make them use less space.

The optimized images go to `./public/img/`.

### `$ gulp route -r nameOfRoute`

This task is found in `./gulp-tasks/route.js` and does the following:

1. Creates the route file under `./routes/`.
2. Copies some content to the clipboard to add to `index.js` to make the route work.
3. Creates a pug file for the route under `./views/`.
4. Creates a sass file for the page under `./assets/css/pages/` (which needs to be added to `main.sass`).

The content to be set inside of each file and clipboard can be changed inside the task file, their variables are:

```javascript
let jsContent = `...`;

let clipboard = `...`;

let pugContent = `...`;

let sassContent = `...`;
```

### `$ gulp yaml`

This task is found in `./gulp-tasks/yaml.js` and converts the locale files from `.yml` to `.json`.

### `$ gulp nodemon`

This task is found in `./gulp-tasks/nodemon.js` and does the following:

1. Starts the server.
2. Restarts the server whenever a file changes.

### `$ gulp browser-sync`

This task is found in `./gulp-tasks/browser-sync.js` and does the following:

1. Runs the [`nodemon`](#gulp-nodemon) task.
2. Starts a Browser Sync server and opens a new [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html) window with it.
3. Reloads the browser whenever a file changes.

### Create a new task

To create a new task make a new file under `./gulp-tasks/` with the name of the task and the _.js_ extension.

The file should look like this:

```javascript
'use strict';

// REQUIRES (requiring gulp is not needed)
const example = require('gulp-example');

// TASK EXPORT
module.exports = (gulp) => {
  return () => {
    // This should be the task function
    return gulp.src('foo/bar.js')
      .pipe(example())
      .pipe(gulp.dest('foo'))
  };
};
```

### Add a task to `gulpfile.js`

Once the task is created it has to be added to the _gulpfile_.

To do that use the `getTask('fileNameHere')` function as the callback function like this:

```javascript
gulp.task('sass', getTask('sass'));
```

Note that the parameter inside `getTask()` has to be a string and the exact name of the file without the extension.

---

## [i18n](https://github.com/mashpie/i18n-node)

To use more than one language add the locale files inside `./locales/` as _.yml_ files.

Routes and cookies get automatically created for each locale file except the default (default locale has to be hardcoded) under `./routes/locales.js`.

Locale files get converted from _.yml_ to _.json_ with **Gulp**.

i18n is added as a local automatically for every route created with the [`$ gulp route`](#gulp-route--r-nameofroute) command, under the object `t` like this:

```javascript
res.render('pug-file', {
  t: res.__
});
```

It's used inside a pug file like this:

```pug
h1 #{t('foo.bar')}
```
Which outputs the content of the current locale file:
```yml
foo:
  bar: "Hello world!"
```
# Gulp 4 Frontend Starter Pack

[![Gulp](https://img.shields.io/badge/Gulp-version:_4.0.2-red?logo=gulp)](https://www.npmjs.com/package/gulp/v/4.0.2)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fkirillosipets.ru)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](http://opensource.org/licenses/MIT "Feel free to contribute.")

Author: Kirill Osipets

🔗 [kirillosipets.ru](https://kirillosipets.ru)

## Description
Starter pack for Sass/SCSS/JS + imagege optimization and font converter.

**Plugins:**

- "browser-sync": "^3.0.2"
- "gulp": "^4.0.2"
- "gulp-autoprefixer": "^8.0.0"
- "gulp-avif": "^1.1.1"
- "gulp-clean": "^0.4.0"
- "gulp-concat": "^2.6.1"
- "gulp-fonter": "^0.3.0"
- "gulp-imagemin": "^7.1.0"
- "gulp-include": "^2.4.1"
- "gulp-newer": "^1.4.0"
- "gulp-sass": "^5.1.0"
- "gulp-svg-sprite": "^2.0.3"
- "gulp-ttf2woff2": "^4.0.1"
- "gulp-uglify-es": "^3.0.0"
- "gulp-webp": "^4.0.1"
- "sass": "^1.77.2"

## Getting Started
To get started with [Node.js](https://nodejs.org/), follow these steps:

### Installation:
`npm install`

### Usage:
`gulp watch` — styles, scripts, images, fonts watcher

`gulp styles` – style compiller

`gulp scripts` – script compiller

`gulp images` – image optimization

`gulp fonts` – fonts compiler

`gulp build` – production build

### Structure:

**Development folders** # Base app development structure

```
app/ # Working dir
  |- scss/src  # Sass source
  |- scss/css  # Compiled minified CSS
  |- js #JS source and minified compiled JS
  |- images/src # Non-optimized images
  |- images # Optimized images and svg stack
  |- fonts # Non-converted and converted fonts
  |- *.html # All html files
```

**Production** # Compiled and ready for deployment dir
```
dist
  |- css
  |- images
  |- js
  |- fonts
  |- *.html
```

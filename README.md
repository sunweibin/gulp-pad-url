# gulp-pad-url

[![NPM version][npm-image]][npm-url]

针对html页面中的静态资源路径进行额外的补充，例如：添加cdn前缀，时间戳

  > 之前用过一个gulp-prefix的插件，可以添加cdn前缀，但是不能够添加时间戳
  > 而自己的项目有仅仅只需要针对html页面修改一些静态的路径，所以在gulp-prefix的基础上修改源代码
  > 能够完成自己的需求，现在开放出来给大家使用看看

## Install
```
  npm install gulp-pad-url --save-dev

  yarn add gulp-pad-url
```

## Usage 1
```javascript

var gulp = require('gulp'),
    padUrl = require('gulp-pad-url');

gulp.task('prefix', function(){
  var prefixUrl = "http://mydomain.com/assets";

  gulp.src('index.html')
    .pipe(padUrl(prefixUrl, null, '{{'))
    .pipe(gulp.dest('build'));
});

```


## Usage 2
```javascript

var gulp = require('gulp'),
    padUrl = require('gulp-pad-url');

gulp.task('prefix', function(){
  var prefixUrl = "http://mydomain.com/assets";

  gulp.src('index.html')
    .pipe(padUrl(function(uri) {
      return uri.path;
    }, null, '{{'))
    .pipe(gulp.dest('build'));
});

```

## API

### padurl(string|fn, selector, ignore)

selector为选择器：

```
  [
    { match: "script[src]", attr: "src" },
    { match: "link[href]", attr: "href"},
    { match: "img[src]", attr: "src"},
    { match: "input[src]", attr: "src"},
  ]
```

如果第一个参数为string,则该参数将作为符合selector和ignore的静态资源路径的前缀
ignore为正则表达式

如果第一个参数为Function,则该函数获取一个uri的参数，并且返回的路径将直接作为静态资源路径
其中uri.path为html页面中读取到的代码中的路径


## Thank you!
[gulp-prefix](https://github.com/007design/gulp-prefix)


[npm-image]: https://img.shields.io/npm/v/@sunweibin/gulp-pad-url.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@sunweibin/gulp-pad-url

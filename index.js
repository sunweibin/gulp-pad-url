'use strict';
var through = require('through2'),
    url = require("url"),
    urljoin = require("url-join"),
    trumpet = require("trumpet"),
    concat  = require("concat-stream"),
    _padUrler;

_padUrler = function(pader, attr, invalid) {
  return function(node) {
    node.getAttribute(attr, function(uri) {

      uri = url.parse(uri, false, true);

      if(uri.host || !uri.path)
        return;

      if (!/^[!#$&-;=?-\[\]_a-z~\.\/\{\}]+$/.test(uri.path)) {
        return;
      }

      if (invalid && invalid.test(uri.path)){
        return;
      }
      // 此处为修改gulp-prefix的代码的地方
      // var file_prefix = (typeof prefix === 'function') ? prefix(uri) : prefix;
      // node.setAttribute(attr, urljoin(file_prefix, uri.path));
      if (typeof pader === 'function') {
        node.setAttribute(attr, urljoin(pader(uri)));
      } else {
        node.setAttribute(attr, urljoin(pader, uri.path));
      }
    });
  };
};

module.exports = function(prefix, selectors, ignore) {

  return through.obj(function(file, enc, cb) {

    if (!selectors) {
      selectors = [
      { match: "script[src]", attr: "src" },
      { match: "link[href]", attr: "href"},
      { match: "img[src]", attr: "src"},
      { match: "input[src]", attr: "src"},
      { match: "img[data-ng-src]", attr: "data-ng-src"}
      ];
    }

    if(!prefix)
      cb(null, file);

    else {
      var tr = trumpet();

      for (var a in selectors)
        tr.selectAll(selectors[a].match, _padUrler(prefix, selectors[a].attr, ignore))

      tr.pipe(concat(function (data) {
        if (Array.isArray(data) && data.length === 0) data = null;
        file.contents = data;
        cb(null, file);
      }));

      file.pipe(tr);
    }
  });
};
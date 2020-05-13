koa-proxy2
==========

![Build Status](https://img.shields.io/travis/bornkiller/koa-proxy2/master.svg?style=flat)
![Coverage Report](http://img.shields.io/coveralls/bornkiller/koa-proxy2.svg?style=flat)
![Package Dependency](https://david-dm.org/bornkiller/koa-proxy2.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/koa-proxy2/dev-status.svg?style=flat)

Make it convenience for mock nginx trick when use angular, make backward proxy easier. And please pay attention, the
repo just for make development server when debug.

## Inspiration
use angular and nginx to develop web project, it make me feel helpless when communicate with real backend API through nginx, while I only mock static server, proxy server not included. To avoid directly modify the code in the nginx server root, and intercept specific URL for data mock, the scalable proxy module with nodejs become necessary. 

## Usage
With time passing by, `koa-proxy2` integrate with body parser, therefore you don't have to use body parse middleware, like `koa-body` or something else, while never cause problem if you used for some reason. It support `json`, `urlencoded`, `multipart/form-data` proxy work well.

I separate the `proxy rule` alone.

The `proxy rule` act like followings:

```javascript
{
  // URL match rule for specific path request proxy, required
  proxy_location: '/v1/version',
  // target backend, different between with URL or not, required
  proxy_pass: 'http://api.google.com',
  // whether the proxy_location within micro service
  // when true, will remove the first path section, optional
  proxy_micro_service: false,
  // when active url merge mode, rather than default nginx proxy style 
  // details see below, optional
  proxy_merge_mode: false
}
```

`proxy_location` could be string or regular expression, when the original path match the string or regular expression, the proxy actived, otherwise, will just transfer the request next.

`proxy_pass` has different behaviour just like nginx. The above example, request `/v1/version` will resolved into `http://api.google.com/v1/version`, while when proxy_pass equals `http://api.google.com/` or with specific path, the original request path will omit.

`proxy_micro_service` will modify the URL, for example, when `true`, url path `/product/listProduct/` will become `/listProduct/`.

`proxy_merge_mode` whether use url merge, for example:

```
var rules;

// when request path '/world/user/'
// final url 'http://www.reverseflower.com/list/'
rules = [{
    proxy_location: /user\/$/,
    proxy_pass: 'http://www.reverseflower.com/list/'
}];

// when request path '/world/user/'
// final url 'http://www.reverseflower.com/list/world/user/'
rules = [{
  proxy_location: /user\/$/,
  proxy_pass: 'http://www.reverseflower.com/list/',
  proxy_merge_mode: true
}];
```

the `module configuration` act like belows:

```javascript	
{
  // whether parse the body, default true
  body_parse: true,
  // reserve the query string after path, default true.
  keep_query_string: true,
  // HTTP request timeout milliseconds, default 3000
  proxy_timeout: 3000,
  // which method should proxy, default ['GET', 'POST', 'PUT', 'DELETE']
  proxy_methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // array consist of proxy rule, default []
  proxy_rules: [{
    proxy_location: '/version/',
    proxy_pass: 'http://localhost:5000/proxy/',
    proxy_micro_service: false,
    proxy_merge_mode: false
  }]
}
```

## Practice
Assume all real backend api follow the pattern `/v1/*`, all static files are in `./static`, you will need:

```javascript
var path = require('path');
var koa = require('koa');
var serve = require('koa-static');
var proxy = require('koa-proxy2');
var app = koa();

app.use(proxy({
  proxy_rules: [
    {
      proxy_location: /^\/v(?:0|1)/,
      proxy_pass: 'http://192.168.100.124',
      proxy_micro_service: false,
      proxy_merge_mode: false
    }
  ]
}));
app.use(serve(path.join(__dirname, 'static')));
app.use(function *() {
    this.type = 'html';
    this.body = fs.readFileSync(path.join(__dirname, 'static/index.html'), {encoding: 'utf-8'});
});
app.listen(1336);
```

## Change Log
+ 2015/07/10 v0.11.0
Add `proxy_micro_service`, `proxy_merge_mode` support.
+ 2015/06/01 v0.10.0
Modify into more nginx style, improve router functional match.
+ 2015/03/30 v0.7.2
Fix fatal nodejs and iojs compatibility bug.
+ 2015/02/11 v0.7.0
Fix fatal proxy bug, add `text/plain` body support, update all module dependency.
+ 2015/02/02 v0.6.0
Remove unnecessary dependent package, fix cookie transfer fatal BUG.
+ 2014/12/24 v0.5.5
Add `multipart/form-data` body parser error handler, support `formidable` module options pass.
+ 2014/12/23 v0.5.0
Add `multipart/form-data` mime type support.
+ 2014/12/21 v0.4.5
Remove `koa-body` dependency, as well as `multipart/form-data` support.
+ 2014/12/18 v0.4.0
Fix content transfer bugs.

## License

  MIT

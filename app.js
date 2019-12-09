const Koa = require('koa');
const Router = require('koa-router');

let app = new Koa();
let router = new Router();
let BodyParser = require('koa-bodyparser');
let static = require('koa-static');


app
    .use(router.routes())
    .use(static('./dist'))
    .use(BodyParser())

app.listen(3000);
console.log(`listening on port 3000`)
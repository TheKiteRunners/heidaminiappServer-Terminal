const Koa = require('koa');
const router = require('koa-router')();//函数
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const https = require('https');
const staticFiles = require('./static-files');

const options = {
  key: fs.readFileSync(__dirname + '/214286140310098.key'),
  cert: fs.readFileSync(__dirname + '/214286140310098.pem')
}

const app = new Koa();
app.use(bodyParser());
app.use(staticFiles('/static/', __dirname + '/static'));

// log request url
app.use(async(ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  await next();
})


const controller = require('./controller');
app.use(controller());

https.createServer(options, app.callback()).listen(8081, '127.0.0.1', ()=>console.log('start 8081'));
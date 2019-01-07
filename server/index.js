const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')
const bodyParser = require('body-parser')

const expressSession = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(expressSession);

const user = require("./interfaces/user")
const geo = require("./interfaces/geo")
const search = require("./interfaces/search")
const category = require("./interfaces/category")
const cart = require("./interfaces/cart")
const order = require("./interfaces/order")
const passport = require('./utils/passport');

app.set('port', port)

// 创建Redis客户端
const redisClient = redis.createClient(dbConfig.redis);
// 设置Express的Session存储中间件
app.use(expressSession({store:new RedisStore({client: redisClient}), name:'zgmt',rolling:'true',secret:'mzg', resave:false, saveUninitialized:true}));

//mongoose连接
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser:true
})

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use("/users",user);
  app.use("/geo",geo);
  app.use("/search",search);
  app.use("/category",category);
  app.use("/cart",cart);
  app.use("/order",order);
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

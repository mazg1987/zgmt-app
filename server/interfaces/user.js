var express = require('express')
var router = express.Router()
// 用自己账号给用户发邮件
const nodeMailer = require('nodemailer')
const Email = require('../dbs/config')

const passport = require('../utils/passport')

//Redis数据库
const Redis = require('redis');
const dbConfig = require('../dbs/config')
const Store = Redis.createClient(dbConfig.redis);

//引入User模型
const User = require('../dbs/models/user')

//发送验证码接口
router.post('/verify',async function (req, res) {
  //获取用户名信息
  const username = req.body.username

  //这里要通过回调函数才能获得redis中的数据
  Store.hget(`nodemail:${username}`, 'expire' ,async function(err,saveExpire){
    console.log(saveExpire)
    //如果用户的验证码没有过期
    if (saveExpire && new Date().getTime() - saveExpire < 0) {
      res.status(200).json({
        code: -1,
        msg: '验证请求过于频繁，1分钟内1次'
      })
      return false
    }
    // 发邮件配置
    const transporter = nodeMailer.createTransport({
      host: Email.smtp.host,
      port: 587,
      // false: 监听其他端口
      secure: false,
      auth: {
        user: Email.smtp.user,
        pass: Email.smtp.pass
      }
    })
    // 对外发送什么信息, 接收方式是什么
    const ko = {
      code: Email.smtp.code(),
      expire: Email.smtp.expire(),
      email: req.body.email,
      user: req.body.username
    }
    // 邮件显示什么内容
    const mailOptions = {
      from: `认证邮件<${Email.smtp.user}>`,
      to: ko.email,
      subject: '《极客营高仿美团网全栈实战》注册码',
      html: `您在《极客营高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
    }
    console.log(mailOptions);
    // 发送邮件
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err)
      } else {
        // redis 存储用户信息
        Store.hmset(
          `nodemail:${ko.user}`,
          'code',
          ko.code,
          'expire',
          ko.expire,
          'email',
          ko.email
        )
      }
    })
    // 发送邮件完毕给客户端响应
    res.status(200).json({
      code: 0,
      msg: '验证码已经发送，可能会有延时，有效期1分钟'
    })
  })
})

//注册请求
router.post("/signup",async function(req,res){
  const { username, password, email, code } = req.body
  // 验证码
  if (code) {
    // redis 获取验证码和过期时间
    Store.hmget(`nodemail:${username}`, ['code', 'expire'],async function (err, data) {
      //根据用户输入的验证码和数据库中的验证码进行对比
      if (code === data[0]) {
        if (new Date().getTime() - data[1] > 0) {
          res.status(200).json({
            code: -1,
            msg: '验证码已过期，请重新尝试'
          })
          return false
        }
      } else {
        res.status(200).json({
          code: -1,
          msg: '请填写正确的验证码'
        })
      }

      //根据用户名从数据查询有没有指定用户
      const user = await User.find({ username })
      if (user.length) {
        res.status(2000).json({
          code: -1,
          msg: '用户名已被注册'
        })
        return
      }

      // 如果注册请求没有问题，则将用户信息写入数据库
      const nuser = new User({
        username,
        password,
        email
      })
      nuser.save().then(function(user,err){
        if(err){
          res.status(200).json({
            code: -1,
            message: '注册失败'
          })
          return
        }
        res.status(200).json({
          code: 0,
          message: '恭喜您注册成功'
        })
      })
    });
  }
})


router.post('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.status(200).json({
        code: -1,
        msg: err
      })
    }
    if (!user) {
      res.status(200).json({
        code: 1,
        msg: info
      })
      return
    }

    /*
     passport扩展了HTTP request，添加了四种方法。
     •	logIn(user, options, callback)：用login()也可以。作用是为登录用户初始化session。options可设置session为false，即不初始化session，默认为true。
     •	logOut()：别名为logout()。作用是登出用户，删除该用户session。不带参数。
     •	isAuthenticated()：不带参数。作用是测试该用户是否存在于session中（即是否已登录）。若存在返回true。事实上这个比登录验证要用的更多，毕竟session通常会保留一段时间，在此期间判断用户是否已登录用这个方法就行了。
     •	isUnauthenticated()：不带参数。和上面的作用相反。
     * */
    req.logIn(user, function(err) {
      if (err) {
        res.status(200).json({
          code: -1,
          msg: err
        })
      }
      res.status(200).json({
        code: 0,
        msg: '登录成功',
        user
      })
    });
  })(req, res, next);
});

//获取登陆用户的信息
router.get('/getUser',function(req,res){
  if (req.isAuthenticated()) {
    const { username, email } = req.session.passport.user
    res.status(200).json({
      user: username,
      email,
      login:true
    })
  } else {
    res.status(200).json({
      user: '',
      email: '',
      login:false
    })
  }
})


router.get('/exit',async function(req,res){
  await req.logout();
  if (!req.isAuthenticated()) {
    res.status(200).json({
      code: 0
    })
  } else {
    res.status(200).json({
      code: -1
    })
  }
})

module.exports = router

const passport = require('passport')
const  LocalStrategy = require('passport-local').Strategy
const UserModel = require("../dbs/models/user")

//使用本地策略进行验证
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  //根据用户名和密码进行验证
  function(username,password,done) {
    //根据用户名从mongodb中查找信息
    UserModel.findOne({ username: username }, function(err, user) {
      //console.log("验证方法查找用户",err,user);
      //如果出错，回调错误
      if (err) { return done(err); }
      //如果没有查到信息，回调指定消息出去
      if (!user) {
        return done(null, false, { message: '用户名不存在.' });
      }
      //如果密码不正确，回调指定消息出去
      if (user.password !== password){
        return done(null, false, { message: '密码不匹配.' });
      }
      //如果没有出错，回调当前查询到的用户对象出去
      return done(null, user);
    });
  })
)

//序列化,登陆成功的时候会执行该方法，将用户id写入到session中
passport.serializeUser(function(user, done) {
  //console.log("序列化",user);
  done(null, user);
})

//反序列化，登陆成功之后访问所有页面都会执行该方法。好处是可以直接根据req.isAuthenticated()判断用户有无登陆
passport.deserializeUser(function(user, done) {
  return done(null, user)
})

module.exports = passport;

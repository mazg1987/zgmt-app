var express = require('express')
var router = express.Router()
var md5 = require('crypto-js/md5')

//引入Cart模型
const Order = require('../dbs/models/order')
const Cart = require('../dbs/models/cart')

router.post("/createOrder",function(req,res) {
    //获取请求参数
    const {id, price, count} = req.body;
    //console.log(id, price, count);
    const time = Date()
    //订单id
    const orderID = md5(Math.random() * 1000 + time).toString()
    //如果用户没有登陆
    if (!req.isAuthenticated()) {
      res.status(200).json({
        code: -1,
        msg: 'please login'
      })
      return;
    }
    else{
      Cart.findOne({ cartNo: id }).then(function(cart,err){
        if(err){
           res.status(200).json({
             code: -1,
             msg: '购物车数据不存在'
           })
           return;
         }
         new Order({
           id: orderID,
           count,
           total: price * count,
           time,
           user: req.session.passport.user,
           name: cart.detail[0].name,
           imgs: cart.detail[0].imgs,
           status: 0
         }).save()
         .then(function(data,err){
           if (err) {
             res.status(200).json({
               code: -1,
               msg: '生成订单错误'
             })
             return;
           }
           else {
             //删除购物车
             cart.remove();
             //返回购物车的信息
             res.status(200).json({
               code: 0,
               id: orderID
             })
           }
         })
      })
    }
  }
)

//获取订单
router.get("/getOrders",function(req,res){
  if(!req.isAuthenticated()){
    res.status(200).json({
      code: -1,
      list: [],
      msg: 'please login'
    })
  }
  else{
    Order.find({ "user.name" : req.session.passport.user.name }).
    then(function(orders,err){
      if(err){
        res.status(200).json({
          code: -1,
          list: [],
          msg: '服务端错误'
        })
      }
      else{
        res.status(200).json({
          code: 0,
          list: orders
        })
      }
    })
  }
})

module.exports = router

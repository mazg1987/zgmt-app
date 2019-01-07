var express = require('express')
var router = express.Router()
var md5 = require('crypto-js/md5')

//引入Cart模型
const Cart = require('../dbs/models/cart')

//创建购物车
router.post('/create',async function(req,res){
  if (!req.isAuthenticated()) {
    res.status(200).json({
      code: -1,
      msg: 'please login'
    })
  }
  else {
    const time = Date()
    const cartNo = md5(Math.random() * 1000 + time).toString()
    const { id, detail } = req.body
    console.log(id,detail);
    const cart = new Cart({ id, cartNo, time,user: req.session.passport.user, detail })
    cart.save().then(function(cart,err){
      if(!err){
        res.status(200).json({
          code: 0,
          msg: '',
          id: cartNo
        })
      }
      else{
        res.status(200).json({
          code: -1,
          msg: 'fail'
        })
      }
    })
  }
})


router.get('/getCart', async function(req,res){
  const { id } = req.query;
  console.log(id);
  Cart.findOne({ cartNo: id }).then(function(cart,err){
    if(!err){
      res.status(200).json({
        code: 0,
        cart: cart&&cart.detail.length>0?cart.detail[0]: {}
      })
    }
    else{
      res.status(200).json({
        code: -1,
        cart: {}
      })
    }
  })
})


module.exports = router

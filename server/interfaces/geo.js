const Menu = require("../dbs/models/menu")
const Province = require("../dbs/models/province")
const City = require("../dbs/models/city")
var express = require('express')
var router = express.Router()

//获取菜单信息
router.get('/menu',function(req,res){
  Menu.findOne().then(function(data,err ){
    if(err){
      res.status(200).json({
        code:-1,
        menu:[]
      })
    }
    else{
      res.status(200).json({
        code:0,
        menu:data.menu
      })
    }
  })
})

//获取所有省份
router.get('/province',function(req,res){
  Province.find().then(function(data,err){
    if(err){
      res.status(200).json({
        code:-1,
        province:[]
      })
    }
    else{
      res.status(200).json({
        code:0,
        province: data.map(item => {
          return {
            id: item.id,
            name: item.value[0]
          }
        })
      })
    }
  });
})

//获取指定省份的所有城市
router.get('/province/:id',function(req,res){
  //req.params.id 获取斜杠后面的参数
  City.findOne({id: req.params.id}).then(function(data,err){
    if(err){
      res.status(200).json({
        code:-1,
        city:[]
      })
    }
    else{
      res.status(200).json({
        code:0,
        city: data.value.map(item => {
          return {province: item.province, id: item.id, name: item.name}
        })
      })
    }
  })
})

//所有城市列表
router.get('/city',function(req,res){
  //req.params.id 获取斜杠后面的参数
  City.find().then(function(data,err){
    if(err){
      res.status(200).json({
        code:-1,
        city:[]
      })
    }
    else{
      var obj = {
        code:0,
        city:[]
      }
      data.map(function(item,idx){
        item.value.forEach(function(city){
          obj.city.push(city)
        })
      })
      res.status(200).json(obj);
    }
  })
})

//热门城市
router.get('/hotCity',function(req,res){
  //req.params.id 获取斜杠后面的参数
  City.find().then(function(data,err){
    if(err){
      res.status(200).json({
        code:-1,
        city:[]
      })
    }
    else{
      var obj = {
        code:0,
        city:[]
      }
      data.map(function(item,idx){
        obj.city.push(item.value[0])
      })
      res.status(200).json(obj);
    }
  })
})

module.exports = router;

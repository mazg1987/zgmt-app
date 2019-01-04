const Category = require("../dbs/models/category")
var express = require('express')
var router = express.Router()

router.get('/crumbs',function(req,res){
  Category.findOne({city: req.query.city.replace('市', '') || '北京'}).then(function(data,err){
    if(!err){
      res.status(200).json({
        code:0,
        areas: data.areas,
        types: data.types
      })
    }
    else{
      res.status(200).json({
        code: -1,
        areas: [],
        types: []
      })
    }
  })
})

module.exports = router;

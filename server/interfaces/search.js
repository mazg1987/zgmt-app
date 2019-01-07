const Poi = require("../dbs/models/poi")
const Artistic = require("../dbs/models/artistic")
var express = require('express')
var router = express.Router()

//输入关键字的热门搜索列表
router.post("/top",function(req,res){
  let {input,city} = req.body;
  //console.log(input,city);
  Poi.find({
    'name':new RegExp(input),
    'city':city
  }).then(function(data,err){
    if(!err){
      //console.log(err,data);
      res.status(200).json({
        code:0,
        top:data.map(item=>{
          return {
            name: item.name,
            type: item.type
          }
        }),
        type: data.length ? data[0].type : ''
      })
    }
    else{
      res.status(200).json({
        code: -1,
        top: []
      })
    }
  })
})

//热门地点
router.get("/hotPlace",function(req,res){
  let {city,type} = req.query;
  console.log(type,city);
  //console.log(req.query);
  Poi.find({
    city,
    type: type  || '丽人'
  }).limit(5)
    .then(function(data,err){
      if(!err){
        //console.log(err,data);
        res.status(200).json({
          code:0,
          top:data.map(item=>{
            return {
              name: item.name,
              type: item.type
            }
          })
        })
      }
      else{
        res.status(200).json({
          code: -1,
          top: []
        })
      }
    })
})

//artistic
router.get('/resultsByKeywords',async function(req,res){
  const { city, keyword } = req.query
  let params = {
    cityname:city
  }
  //根据type或者name从数据库查询信息
  if(keyword!="all"){
    params["$or"] = [{"name":new RegExp(keyword)},{"type":new RegExp(keyword)}];
  }

  console.log(params);
  Artistic.find(params).then(function(artistics,err){
    if(!err){
      res.status(200).json({
        code:0,
        pois:artistics.map(item=>{
          return {
            id:item.id,
            type: item.type,
            img: item.photos,
            name: item.name,
            comment: Math.floor(Math.random() * 10000),
            rate: item.biz_ext?Number(item.biz_ext.rating):0,
            price: item.biz_ext?Number(item.biz_ext.cost):0,
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0],
            address:item.address,
            tag:item.tag,
            children:item.children
          }
        })
      })
    }
    else{
      res.status(200).json({
        code: -1,
        pois: []
      })
    }
  })
})


module.exports = router;

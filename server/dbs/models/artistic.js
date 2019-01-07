const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ArtisticScheme = new Schema({
  id: {
    type: String,
    require: true
  },
  type :{
    type: String
  },
  img:{
    type: Array
  },
  title:{
    type:String
  },
  name:{
    type:String
  },
  comment:{
    type:Number
  },
  rate:{
    type:Number
  },
  price:{
    type:Number
  },
  scene:{
    type:Array
  },
  tel:{
    type:String
  },
  status:{
    type:String
  },
  location:{
    type:String
  },
  module:{
    type:String
  },
  address:{
    type:String
  },
  photos:{
    type:Array
  },
  biz_ext:{
    type:Object
  },
  tag:{
    type:String
  },
  children:{
    type:Array
  }
})


module.exports = mongoose.model('Artistic', ArtisticScheme)


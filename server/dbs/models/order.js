const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const OrderScheme = new Schema({
  id: {
    type: String,
    require: true
  },
  user: {
    type: Object,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  imgs: {
    type: Array,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  count:{
    type:Number
  }
})

module.exports = mongoose.model('Order', OrderScheme)

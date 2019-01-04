const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})

/* model 建模型 */
module.exports = mongoose.model('User', UserSchema)



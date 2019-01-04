const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const MenuSchema = new Schema({
  menu:Array
})

/* model 建模型 */
module.exports = mongoose.model('Menu', MenuSchema)



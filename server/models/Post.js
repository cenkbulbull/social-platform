const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
      user:String,
      userAvatar:String,
      date:Date,
      title:String,
      content:String,
      category:String,
      likes:Number
})

module.exports = mongoose.model("post",PostSchema)
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
      username:String,
      password:String,
      mail:String,
      avatar:String,
      totalPosts:Number,
      totalLikes:Number,
      likedPostsId:Array,
      dateOfRegister:Date
})

module.exports = mongoose.model("user",UserSchema)
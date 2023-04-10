const express = require('express')
const router = express.Router()

//Models
const Post = require("../models/Post")


//tüm postlar
router.get("/",(req,res,next)=>{
  const promise = Post.find({ }).sort({date:-1})
  promise.then((data)=>{
    if (!data) {
      next({message: "Post verisi yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

//kategoriye göre postlar
router.get("/filter/:category",(req,res,next)=>{
  const promise = Post.find({category:req.params.category}).sort({date:-1})
  promise.then((data)=>{
    if (!data) {
      next({message: "Post verisi yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

//belirli kullanıcının postları
router.get("/:username",(req,res,next)=>{
  const promise = Post.find({user:req.params.username}).sort({date:-1})
  promise.then((data)=>{
    if (!data) {
      next({message: "Post verisi yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

//post kayıt
router.post("/",(req,res,next)=>{
  const post = new Post(req.body)

  const promise = post.save()
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })  

})

//tıklama durumunda put ile beğeni islemi güncelleme
router.put("/:postid",(req,res,next)=>{

  const id = req.params.postid

  const promise = Post.findOneAndUpdate({_id:id},{ $inc:{likes: 1} }) //$inc ile artırma işlemi yapıldı

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})


//delete ile tekli post silme
router.delete("/remove/:postid",(req,res,next)=>{

  const promise = Post.findOneAndRemove({_id:req.params.postid})

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

module.exports = router
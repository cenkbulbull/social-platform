const express = require('express')
const router = express.Router()

//Models
const User = require("../models/User")


//tüm kullanıcılar
router.get("/",(req,res,next)=>{
  const promise = User.find({ }).sort({dateOfRegister:-1})
  promise.then((data)=>{
    if (!data) {
      next({message: "User verisi yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

//en çok beğeni alan 5 kullanıcı
router.get("/top5",(req,res,next)=>{
  const promise = User.find({ }).sort({totalLikes:-1}).limit(5)
  promise.then((data)=>{
    if (!data) {
      next({message: "User verisi yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

//tek kullanıcı
router.get("/:username",(req,res,next)=>{
  const promise = User.find({username:req.params.username})
  promise.then((data)=>{
    if (!data) {
      next({message: "User verisi yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

//user kayıt
router.post("/",(req,res,next)=>{
  const user = new User(req.body)

  const promise = user.save()
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })  

})

//kullanıcıların post paylaşım durumuna göre anı sayısını artırma/azaltma
router.put("/totalpost/:username",(req,res,next)=>{

  const operator = req.body.operator

  const promise = User.findOneAndUpdate({username:req.params.username},{ $inc:{totalPosts: operator } })

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})


//tıklama durumunda put ile beğeni islemine göre kullanıcının beğendikleri arrayini artırma, beğenilenin totallike artırma
router.put("/liked/:postid",(req,res,next)=>{

  const user = req.body.username

  const postUser = req.body.postUser

  const promise = User.findOneAndUpdate({username:user},{ $push:{likedPostsId: req.params.postid } })
  const promise2 = User.findOneAndUpdate({username:postUser} , { $inc:{totalLikes: 1 } }) //beğenilen kullanıcı totallike artırma */

  promise.then((data)=>{
    promise2.then((data)=>{
      res.json(data)
    }).catch((err)=>{
      res.json(err)
    })
  }).catch((err)=>{
    res.json(err)
  })


})


module.exports = router
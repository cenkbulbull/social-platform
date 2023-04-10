const express = require('express')
const router = express.Router()

//Models
const Site = require("../models/Info")


//site genel bilgiler // sadece veri çekme işlemi yapılıyor, çünkü atlas üzerinde kayıtlı bir veri bulunuyor
router.get("/",(req,res,next)=>{
  const promise = Site.find({ })
  promise.then((data)=>{
    if (!data) {
      next({message: "Site verisi yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

module.exports = router
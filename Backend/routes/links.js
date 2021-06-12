const express = require("express");
const Links = require("../model/links.model")
const router = express.Router();
const path = require("path")
const hbs =require('hbs')
const app = express();


router.route("/Add").post((req, res) => {
    const linkdata =Links({
        url: req.body.url,
        description: req.body.description,
        email: req.body.email 
    })
    linkdata.save().then((result) => {
        res.status(200).render("index")
    }).catch(err => console.log(err))
})

 router.route("/:id").get((req, res) => {
     Links.findOne({id: req.params.id}, (err, result) => {
        if(err)
        res.send("no url found!");
        res.render("LinkShow",{URL: result.url})
     })
 })  
module.exports = router
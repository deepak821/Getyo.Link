const express = require("express");
const Links = require("../model/links.model")
const router = express.Router();


router.route("/Add").post((req, res) => {
    const linkdata =Links({
        weblink: req.body.weblink,
        description: req.body.description,
        email: req.body.email 
    })
    linkdata.save().then((result) => {
        res.status(200).send(result)
    }).catch(err => console.log(err))
})

 router.route("/:id").get((req, res) => {
     Links.findOne({_id: req.params.id}, (err, result) => {
        if(err)
        res.send("no url found!");
        res.send(result)
     })
 })
module.exports = router
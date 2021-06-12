const express = require("express");
const mongoose = require("mongoose");
const Links = require("./model/links.model")
const path = require("path");
const hbs =require('hbs')
const app = express();
const { check, validationResult } = require("express-validator")
const Port = 8000;    
app.use(express.json());
app.use(express.urlencoded({extended:false})); 
const staticpath = path.join(__dirname, "./public")   
const templatespath = path.join(__dirname, "./templates/views")
const partialspath = path.join(__dirname, "./templates/partials")

app.use(express.static(staticpath))
app.set("view engine", "hbs")
app.set("views", templatespath) 
hbs.registerPartials(partialspath)

app.get("/", (req, res) => {   
    res.render("index") 
})
app.get("/AddLink", (req, res) => {
    res.render("AddLink")   
})
app.post("/Add",[check('url', 'URL is required').notEmpty(),
check(
  'email',
  'email is required'
).exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.render("AddLink",{ errors: "URL is required" });
    }
    else{
    try {
        var letters = "0123456789ABCDEF";
        var uid ="";
        for(var i = 0; i < 6; i++)
        uid  = uid + letters[(Math.floor(Math.random() * 16))];
        const linkdata =Links({
            id: uid,
            url: req.body.url,
            description: req.body.description,
            email: req.body.email 
        })
        linkdata.save().then((result) => {
            console.log(result.id)
            res.status(200).render("AddLink",{UniqueId: result.id})
        }) 
    } catch (error) {
        console.log(error)
    }
}
})


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/GetyoLink', {useNewUrlParser: true, useCreateIndex: true,
useUnifiedTopology: true, useFindAndModify: false});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("I'm connected");
});
const linksroute = require("./routes/links")
app.use("/links",linksroute) 
    
app.listen(Port, () => {
    console.log(`you are connected at port: ${Port}`)
})


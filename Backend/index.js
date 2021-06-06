const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs =require('hbs')
const app = express();
const Port = 8000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/images")
const staticpath = path.join(__dirname, "../public")
const templatespath = path.join(__dirname, "./templates/views")
const partialspath = path.join(__dirname, "./templates/partials")

app.use(express.static(staticpath))
app.set("view engine", "hbs")
app.set("views", templatespath)
hbs.registerPartials(partialspath)

app.get("/", (req, res) => {
    res.render("index") 
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


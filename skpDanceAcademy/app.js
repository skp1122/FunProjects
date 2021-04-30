const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
const port = 8000;

// Define Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });
var Contact = mongoose.model('Contact',contactSchema);

// Express Specific stuff
// app.use(express.static('static',options));
app.use('/static',express.static('static')); // For serving static files
app.use(express.urlencoded());

// Pug specific stuff
app.set('view engine','pug'); // Set the template engine as pug
app.set('views',path.join(__dirname,'views'));// Set the views directory

// Endpoints 
app.get('/',(req,res)=>{
    const params = { };
    res.status(200).render('index.pug',params);
});

app.get('/contact',(req,res)=>{
    const params = { };
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    const params = { };
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug',params);
})
// Start the Server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})
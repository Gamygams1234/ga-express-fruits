// DEPENDENCIES!
const express = require('express')
const app = express()
const port = 3000
const fruits = require('./models/fruits.js')
const methodOverride = require("method-override")


// MIDDLE WARE

// this is so we can see the body
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))

// ROUTES GO HERE:
// INDEX ROUTE
app.get("/fruits/", (req, res)=>{
    // res.send(fruits);
    res.render('index.ejs', {
        allFruits: fruits
    })
})
// NEW
app.get("/fruits/new", (req, res)=>{
    res.render("new.ejs")
})
app.delete("/fruits/:index", (req, res)=>{
    let deleteIndex = req.params.index
    // fruits = fruits.filter((item, index)=>{
    //     return index != deleteIndex
    // })
    fruits.splice(deleteIndex,1)
    res.render('index.ejs', {
        allFruits: fruits
    })
    
})

// SHOW ROUTE
app.get("/fruits/:indexOfFruitsArray", (req, res)=>{
    // res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('show.ejs', {
        fruit: fruits[req.params.indexOfFruitsArray]
    })
})

app.post("/fruits", (req, res)=>{

    console.log(req.body)
    if(req.body.readyToEat === "true"){
        req.body.readyToEat = true;
    }else{
        req.body.readyToEat = false;
    }
    fruits.push(req.body)
    res.redirect("/fruits")
})




app.listen(port, ()=>{
    console.log(`App is listening on port: `, port)
})
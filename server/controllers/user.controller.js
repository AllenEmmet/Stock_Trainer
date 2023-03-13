const User= require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const axios = require('axios')
const Secret = process.env.FIRST_SECRET_KEY;
const Token = process.env.TOKEN
module.exports = {
    register: async (req, res) => {
        try{
            const user = new User(req.body)
            const newUser = await user.save()
            console.log('User created', newUser)
            const userToken = jwt.sign({id:newUser._id}, Secret)
            console.log(userToken, 'regTok')
            res
            .cookie('userToken', userToken, {httpOnly:true})
            .json({successMessage: 'User logged in', user:newUser})
        }catch(error){
            res.json(error)
        }
   
      }, 
    login: async(req, res) => {
        console.log('test')
        const user = await User.findOne({ email: req.body.email });
         console.log('User', user)
        if(user === null) {
         return res.sendStatus(400), console.log('test') //.json(error);
        }
         
  
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
         
        if(!correctPassword) {
       
        console.log('pass failed')
        return res.sendStatus(400)
        }
         
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
        id: user._id 
        }, Secret);
        console.log(userToken, 'logTok')
        // REMEMBER! the response object allows chained calls to cookie and json
        res
        .cookie("userToken", userToken, {
        httpOnly: true
        })
        .json({ msg: "success!" });
        },
    logout: (req, res) =>{
        res.clearCookie('userToken')
        res.json({successMessage: 'User logged out'})
    },
    getLoggedInUser: (req, res)=>{
        
        const user = jwt.verify(req.cookies.userToken, Secret)
        User.findOne({_id:user.id})
        .then((user)=>{
            res.json(user);
            console.log(user, 'working?')
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    addStock: (req, res) =>{
        const user = jwt.verify(req.cookies.userToken, Secret)
        
        User.findOneAndUpdate({_id:user.id}, {'$push':{ 'stocks':{
            ticker: req.body.ticker,
            initialPrice: req.body.initialPrice,
            currentValue: req.body.currentValue
        }
        }})
        .then((updatedUser)=>{
            console.log(updatedUser)
            res.json(updatedUser)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    deleteStock: (req, res) =>{
        // const user = jwt.verify(req.cookies.userToken, Secret)
        id = req.params.id
        console.log('this id is:' +id)
        // User.findOneAndUpdate({_id:user.id}, {'$pull':{stocks: {'stocks._id':id}}})
        User.findOneAndUpdate({'stocks._id':id}, {'$pull':{stocks: {_id:id}}})

        .then((updatedUser)=>{
            console.log(updatedUser)
            res.json(updatedUser)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    getOneStock: (req, res) =>{
        const user = jwt.verify(req.cookies.userToken, Secret)
        const id = req.params.id
        User.findOne({_id:user.id},{stocks: {'$elemMatch': {_id: id}}})
        .then((foundStock)=>{
            console.log(foundStock)
            res.json(foundStock)
        })
        .catch(err=>console.log(err))
    },
    updateStock: (req, res) =>{
        const id = req.params.id
        const newVal = req.body.currentValue
        console.log(id)
        console.log('new value is' +newVal)
        User.findOneAndUpdate({'stocks._id':id},{'$set': {'stocks.$.currentValue':newVal}}, {new: true, useFindAndModify: false})
        .then((updSt)=>{
            console.log('wut')
            console.log(updSt)
            res.json(updSt)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    getStockPrice: (req, res) =>{
        const thticker = req.params.ticker
        console.log(thticker)
        const url = (`https://finnhub.io/api/v1/quote?symbol=${thticker}&token=${Token}`)

        axios.get(url)
        .then((rando)=>{
        console.log(rando.data.c)
        res.json(rando.data)
        })
        .catch(err=>console.log(err))
  
    }
}
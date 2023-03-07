const User= require("../models/user.model")
const Stock = require("../models/user.model")
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
            const userToken = jwt.sign({_id:newUser._id}, Secret)
            res.status(201).cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now()+90000)}).json({successMessage: 'User logged in', user:newUser})
        }catch(error){
            this.res.status(400).json(error)
        }
        // const {firstName} = req.body
        // const {lastName} = req.body
        // const {email} = req.body
        // const{password} = req.body
        // const {confirmPassword} = req.body
        // User.create({firstName: firstName, lastName: lastName, email:email, password: password, confirmPassword: confirmPassword})
        //   .then(user => {
        //       res.json({ msg: "success!", user: user });
        //   })
        //   .catch(err => res.json(err));
      }, 
    login: async(req, res) => {
        console.log('test')
        const user = await User.findOne({ email: req.body.email });
         console.log('User', user)
        if(user === null) {
        // email not found in users collection
         return res.sendStatus(400), console.log('test') //.json(error);
        }
         
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
         
        if(!correctPassword) {
        // password wasn't a match!
        console.log('pass failed')
        return res.sendStatus(400)//.json(error);
        }
         
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
        id: user._id 
        }, Secret);
         
        // note that the response object allows chained calls to cookie and json
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
            console.log(user)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    addStock: (req, res) =>{
        const user = jwt.verify(req.cookies.userToken, Secret)
        // const stock = new Stock(req.body)
        // console.log('the stock is:', stock)
        // console.log('the rb is:', req.body)
        // this was the original--I want to use nested object
    //     const stock = {
    //         'ticker': req.body.ticker,
    //         'initialPrice': req.body.initialPrice,
    //         'currentValue': req.body.currentValue
    // }
        // console.log('stock:',stock)
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
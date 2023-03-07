const Stock= require("../models/stock.model")

module.exports = {
    createStock: (req, res) =>{
        const {name} = req.body
        const {type} = req.body
        const {description} = req.body
        const {boughtPrice} = req.body
        const {currentPrice} = req.body
        Stock.create({name: name, type: type, description: description, boughtPrice: boughtPrice, currentPrice: currentPrice})
        .then((newPet)=>{res.status(201).json({newPet})})
        .catch((err) => {res.status(400).json({err})})
    },
    displayAll: (req, res) =>{
        Stock.find({})
        // if empty, throw error
        .then(things=>res.json(things))
        .catch(err=>console.log(err))
    },
    deleteThing: (req, res) =>{
        Stock.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err=> console.log(err))
    },
    getById: (req, res) =>{
        Stock.findOne({_id: req.params.id})
        .then(thing=>res.json(thing))
        .catch(err=>console.log(err))
    }, 
    updateOne: (req, res) =>{
        Stock.updateOne({_id: req.params.id}, req.body, {new: true, runValidators: true, useFindAndModify: false})
        .then(thing=>res.status(201).json(thing))
        .catch(err=>res.status(400).json(err))
    }

}
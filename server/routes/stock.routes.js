const StockController = require('../controllers/stock.controller')
module.exports = (app) =>{
    app.post('/api/stocks', StockController.createStock)
    app.get('/api/stocks', StockController.displayAll)
    app.get('/api/stocks/:id', StockController.getById)
    app.delete('/api/stocks/:id', StockController.deleteThing)
    app.put('/api/stocks/:id', StockController.updateOne)
}
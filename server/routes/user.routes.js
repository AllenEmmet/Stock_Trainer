// inside of user.routes.js
const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = app => {
  app.post("/register", Users.register);
  app.post("/login", Users.login);
  app.get('/getLoggedUser', Users.getLoggedInUser);
  app.get('/logout', Users.logout)
  app.post('/addStock', Users.addStock)
  app.get('/stock/:id', Users.getOneStock)
  app.delete('/deleteStock/:id', Users.deleteStock)
  app.put('/update/:id', Users.updateStock)
  app.get('/getPrice/:ticker', Users.getStockPrice)

  // this route now has to be authenticated
//   app.get("/api/users", authenticate, Users.getAll);
}


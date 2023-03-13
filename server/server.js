const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const port = 8000
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const socket = require('socket.io')

require('./config/mongoose.config');
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


require('./routes/user.routes')(app);






app.listen(port, ()=> console.log(`Express running on port ${port}`));


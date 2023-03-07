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
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('./routes/stock.routes')(app);
require('./routes/user.routes')(app);

// const server = app.listen(port, () => {
//     console.log(`Listening on port: ${port}`)
// });





app.listen(port, ()=> console.log(`Express running on port ${port}`));

// // to initialize the socket, we need to invoke a new instance
// //     of socket.io and pass it our express server instance
// // We must also include a configuration settings object to prevent CORS errors
// const io = socket(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST'],
//         allowedHeaders: ['*'],
//         credentials: true,
//     }
// });

// io.on("connection", socket => {
//     // NOTE: Each client that connects get their own socket id!
//     // if this is logged in our node terminal, that means we a new client
//     //     has successfully completed the handshake!
//     console.log('socket id: ' + socket.id);
    
//     // We add our additional event listeners right inside this function
//     // NOTE: "connection" is a BUILT IN events listener
//     socket.on("event_from_client", data => {
//         // send a message with "data" to ALL clients EXCEPT for the one that emitted the
//     	//     "event_from_client" event
//         socket.emit("event_to_this_client", data);
    
// });
// });
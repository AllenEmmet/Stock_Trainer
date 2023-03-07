const mongoose = require("mongoose");

dbName = 'CHANGEME'

mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Established a connection with the database"))
    .catch(err => console.log("Failed to establish connection with database", err));
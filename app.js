require('dotenv').config();
const express = require('express');
const cors = require("cors");
const db = require('./utils/database.util');
// create the server
const app = express();

// use middlewares
app.use(express.json());
app.use(cors()); // allow all origins

// use the routers
app.use('/', require('./routes/index.route'));
app.use('/user', require('./routes/users.route'));
app.use('/test', require('./routes/test.route'));

// start the server and listen on specified port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port: ${port}`));

module.exports = app;

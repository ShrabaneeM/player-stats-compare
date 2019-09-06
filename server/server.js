const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('./config');

const playerRoute = require('./player.routes');

mongoose.connect(config.DB_URL, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if(err){
        console.log('Connection failed to : ' + config.DB_URL);
        console.log('Error' + err);
        process.exit(1);
        return;
    }
    console.log('Connected to ' + config.DB_URL);
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/player', playerRoute);

app.listen(8075, () => {
    console.log('debug', `Server started successfully on port 8075`);
});
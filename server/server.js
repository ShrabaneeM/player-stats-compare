const express_graphql = require('express-graphql');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const Player =  require("./player.model");

app.use(cors());
app.options('*', cors())

const playerRoute = require('./player.routes');
const { typeDefs } = require("./typeDefs");

const schema = typeDefs, 

getPlayer = async function(args) {
    return await Player.find(args.id)
}, 

getPlayers = async function() {
    return await Player.find({})
},

root = {
    allPlayers: getPlayers,
    getPlayer: getPlayer
};

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

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(8075, () => {
    console.log('debug', `Server started successfully on port 8075`);
});
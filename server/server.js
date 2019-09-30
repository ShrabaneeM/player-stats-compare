const express_graphql = require('express-graphql');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

app.use(cors());
app.options('*', cors())

const playerRoute = require('./player.routes');
const { typeDefs } = require("./typeDefs");
const { resolvers } = require('./resolvers');

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

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
    schema: executableSchema,
    graphiql: true
}));

app.listen(8075, () => {
    console.log('debug', `Server started successfully on port 8075`);
});
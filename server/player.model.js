const mongoose = require('mongoose');

const Player = new mongoose.Schema({
    name: String,
    stats : { matches : Number, 
        bats : String,
        bowls : String,
        innings : Number,
        notouts : Number,
        fiftys : Number,
        hundreds : Number,
        fours : Number,
        sixes : Number,
        highestScore : Number
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', Player);
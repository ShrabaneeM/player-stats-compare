const Player = require('./player.model');

const resolvers = {
    Query : {
        getPlayer : async (_, req) => {
            return await Player.find({_id : {$in : req.body.variables.ids}});
        }, 
        
        allPlayers : async () => {
            return await Player.find({})
        }
    },
    Mutation : {
        addPlayer : async (_ , {name , stats}) => {
            const player = new Player({name , stats});

            await player.save();
            return player;
        }
    }
}

module.exports = {
    resolvers
}
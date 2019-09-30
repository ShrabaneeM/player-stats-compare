  
const graphql = require('graphql');

const typeDefs = `
type Query {
    allPlayers: [Player!]!
    getPlayer(id : [ID]) : [Player!]!
}
type Player {
    id: ID!
    name: String!
    stats : Stats
}
type Stats {
    matches : Int!
    bats : String!
    bowls: String!
    innings: Int!
    notouts: Int!
    fiftys: Int!
    hundreds: Int!
    fours: Int!
    sixes: Int!
    highestScore: Int!
}

type Mutation {
    addPlayer(name: String!, stats : New_Stats): Player!
}
input New_Stats {
    matches : Int!
    bats : String!
    bowls: String!
    innings: Int!
    notouts: Int!
    fiftys: Int!
    hundreds: Int!
    fours: Int!
    sixes: Int!
    highestScore: Int!
}
`;

module.exports = {
    typeDefs
};
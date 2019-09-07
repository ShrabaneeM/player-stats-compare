  
const graphql = require('graphql');

const typeDefs = graphql.buildSchema(`
type Query {
    allPlayers: [Player!]!
    getPlayer : [Player!]!
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
`);

module.exports = {
    typeDefs
};
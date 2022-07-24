require('dotenv');
const express = require('express');
const expressJSON = express.json();
const { graphqlHTTP } = require('express-graphql');
const pg = require('pg');
const graphql = require('graphql');
const joinMonster = require('join-monster');
const port = 3001;

const Player = new graphql.GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    first_name: { type: graphql.GraphQLString },
    last_name: { type: graphql.GraphQLString },
    team: {
      type: Team,
      sqlJoin: (playerTable, teamTable, args) => `${playerTable}.team_id = ${teamTable}.id`
    }
  })
})

Player._typeConfig = {
  sqlTable: 'player',
  uniqueKey: 'id'
}

var Team = new graphql.GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    players: {
      type: new graphql.GraphQLList(Player),
      sqlJoin: (teamTable, playerTable, args) => `${teamtable}.id = ${playerTable}.team_id`
    }
  })
})

Team._typeConfig = {
  sqlTable: 'team',
  uniqueKey: 'id'
}

const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  extensions: {
    joinMonster: {
      sqlTable: 'team', // the SQL table for this object type is called "accounts"
      uniqueKey: 'id' // id is different for every row
    }
  },
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => 'hello world'
    },
    players: {
      type: new graphql.GraphQLList(Player),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return db.query(sql);
        })
      }
    },
    player: {
      type: Player,
      args: { id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (playerTable, args, context) => `${playerTable}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return db.query(sql)
        })
      }
    }
  })
})

const schema = new graphql.GraphQLSchema({ query: QueryRoot })

const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}))

app.listen(port, () => {
  console.log(`listening on port ${port} for request!`);
});

require('dotenv');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');

const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => 'hello world'
    }
  })
})

const schema = new graphql.GraphQLSchema({ query: QueryRoot })

const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}))

app.listen(process.env.PORT, () => {
  console.log("listening for request!");
});

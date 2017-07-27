const {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

var schemaByObjects = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

const run = async () => {

    /*
        : By Objects
    */
    var queryByObjects = `
    {
        hello
    }
    `;

    console.log(await graphql(schemaByObjects, queryByObjects))
}

run();
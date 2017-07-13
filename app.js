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

var schemaByString = buildSchema(`
    # Top level query
    type Query {
        hello: String
        random(max: Int, min: Int): Float
    }
`);

var rootByString = {
    hello: () => {
        return 'Hello world!';
    },

    random: (obj, args, context, info) => {
        obj;
        args;
        context;
        info;

        return Math.floor(Math.random() * 10)
    }
};

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

    /*
        : By String
    */
    var queryByString = `
    {
        hello
        random
    }
    `;

    console.log(await graphql(schemaByString, queryByString, rootByString, { max: 10 }, { globalVals: 10 }))
}

run();
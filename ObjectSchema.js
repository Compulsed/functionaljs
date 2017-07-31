const _ = require('lodash');
const util = require('util');

const {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

var schemaByObjects = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Some random information about this root',
    fields: {
      // (Field:Hello) Super simple type, cannot be expanded
      hello: {
        type: GraphQLString,
        args: {
          name: { type: GraphQLString }
        },
        resolve: (_, args) => `world ${args.name || 'Unknown'}`
      },
      
      // (Field:Dice) Complex type, can be expanded
      dice: {
        args: { numSides: { type: GraphQLInt } },
        resolve: ($, args) => _.assign({}, args, { text: () => 'Roll\'n' }),

        type: new GraphQLObjectType({
          name: 'Dice',
          description: '',
          fields: () => ({
            rollN: {
              type: new GraphQLList(GraphQLInt),
              args: { n: { type: GraphQLInt } },
              resolve: ({ numSides }, { n }) => _.times(n, () => Math.floor((Math.random() * numSides) + 1))
            },

            roll: {
              type: GraphQLInt,
              resolve: ({ numSides }) => Math.floor((Math.random() * numSides) + 1),
            },

            numSides: {
              type: GraphQLInt,
            },

            text: {
              type: GraphQLString,
            }
          })
        }),
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
        hello(name: "Bob") # (Field:Hello,  Type: String)
        dice(numSides: 6) {  # (Field:Dice, Type: Dice)
          roll
          numSides
          rollN(n: 3)
          text
        }
    }
    `;

  console.log(util.inspect(await graphql(schemaByObjects, queryByObjects), null, { depth: 10 }));
};

run();

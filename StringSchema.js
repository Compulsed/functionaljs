const {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLcontextectType,
  GraphQLString,
} = require('graphql');

var schema = buildSchema(`
    type RandomDie {
        roll(numRolls: Int!): [Int]
        rollOnce: Int       # This actually performs computation
        numSides: Int       # You can access properties
        getNumSides: Int    # Methods without arguments act like properties
    }

    # Top level query
    type Query {
        hello(name: String): String                 # this is a method
        random(maxArg: Int!, minArg: Int!): Float!  # fieldName 'random'
        getDie(numSides: Int): RandomDie
    }
`);

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;   // You can access this value as a property
  }

  getNumSides() {
      return this.numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// Resolvers
var rootValue = {
    hello: (args, context, info, ...others) => {
        args;
        context;
        info;
        others;

        return `Hello ${args.name || 'Stranger'} how are you?`;
    },

    random: (args, context, info, ...others) => {
        args;
        context;
        info;
        others;

        return Math.floor(Math.random() * 10)
    },

    getDie: function ({numSides}) {
        return new RandomDie(numSides || 6);
    },
};

const run = async () => {
    /*
        : By String
    */
    var query = `
    # TopLevelQuery is optional and you do not even need to provide it
    query ($minArg: Int!, $maxArg: Int!) {
        hello(name: "Dale")
        random(minArg: $minArg, maxArg: $maxArg)
        getDie {
            numSides
            getNumSides
            roll(numRolls: 5)
            rollOnce
        }
    }
    `;

    console.log(JSON.stringify(
        await graphql(
            schema,
            query,
            rootValue,
            { contextVal: 'ctx' },
            { minArg: 10, maxArg: 20 }
            /* + operation name? */
        ),
        null,
        2
    ))
}

run();
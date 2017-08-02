const _ = require('lodash');
const util = require('util');
const courseDataTypeToGraphQLType = require('./supporting/index');

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
} = require('graphql');

function rootFieldByID(idName, courseDataType) {
  const dataAndType = courseDataTypeToGraphQLType(courseDataType);

  const getter = id => dataAndType.getters.getById(id);
  
  const argDefs = {
      id: { type: GraphQLID },
      [idName]: { type: GraphQLID },
  };

  return {
    type: dataAndType.type,
    args: argDefs,
    resolve: (_, args) => {
      if (args[idName] !== undefined && args[idName] !== null) {
        return getter(args[idName]);
      }

      throw new Error('must provide id or ' + idName);
    },
  };
}

var schemaByObjects = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Root',
    fields: {
        component: rootFieldByID('componentId', 'component'),
    },
  })
});

const run = async () => {
  var queryByObjects = `
    {
        component (componentId: "csa-section-1-component-1") {
            title
        }
    }
    `;


  console.log(util.inspect(await graphql(schemaByObjects, queryByObjects), null, { depth: 10 }));
};

run();

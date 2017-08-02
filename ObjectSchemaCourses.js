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
        course: rootFieldByID('courseId', 'course'),
        section: rootFieldByID('sectionId', 'section'),
        component: rootFieldByID('componentId', 'component'),
        content: rootFieldByID('contentId', 'content'),
    },
  })
});

const run = async () => {
  var queryByObjects = `
    {
        component (componentId: "csa-section-1-component-1") {
          title
        }

        section (sectionId: "csa-section-1") {
          title
        }

        course (courseId: "aws-csa") {
          title
        }

        content (contentId: "123-123-123-124") {
          contentId
          videosources {
            key
            bucket
          }
        }
    }
    `;


  console.log(util.inspect(await graphql(schemaByObjects, queryByObjects), null, { depth: 10 }));
};

run();

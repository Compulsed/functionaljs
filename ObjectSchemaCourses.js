const _ = require('lodash');
const util = require('util');

const {
  courseDataTypeToGraphQLType,
  getObjectsByType,
 } = require('./supporting/index');

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const {
  connectionFromArray,
  connectionArgs,
  connectionDefinitions,
} = require('graphql-relay');

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

function rootConnection(name, courseDataType) {
  const graphqlType = courseDataTypeToGraphQLType(courseDataType).type;
  
  const { connectionType } = connectionDefinitions({
    name,
    nodeType: graphqlType,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: conn => conn.totalCount,
        description: ``,
      },

      [courseDataType]: {
        type: new GraphQLList(graphqlType),
        resolve: conn => conn.edges.map(edge => edge.node),
        description: ``,
      },
    }),
  });

  return {
    type: connectionType,
    args: connectionArgs,
    resolve: async ($, args) => {
      const { objects, totalCount } = await getObjectsByType(courseDataType, args);

      return _.assign(
        {},
        connectionFromArray(objects, args),
        { totalCount }
      );
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

        allCourses: rootConnection('Course', 'course'),
        allSections: rootConnection('Section', 'section'),
        allComponents: rootConnection('Component', 'component'),
        allContent: rootConnection('Content', 'content'),        
    },
  })
});

const run = async () => {
  var queryByObjects = `
    {
        # Components
        component (componentId: "csa-section-1-component-1") {
          title
        }

        allComponents {
          totalCount
          component {
            title
          }
        }

        # Sections
        section (sectionId: "csa-section-1") {
          title
        }

        allSections {
          totalCount
          section {
            title
          }
        }

        # Course
        course (courseId: "aws-csa") {
          title
        }

        allCourses {
          totalCount
          course {
            title
          }
        }

        # Content
        content (contentId: "123-123-123-124") {
          contentId
          videosources {
            key
            bucket
          }
        }

        allContent {
          totalCount
          content {
            contentId
            videosources {
              key
              bucket
            }            
          }
        }
    }
    `;


  console.log(util.inspect(await graphql(schemaByObjects, queryByObjects), null, { depth: 10 }));
};

run();

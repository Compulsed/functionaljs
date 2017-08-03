const BbPromise = require('bluebird');

const {
  connectionFromArray,
  connectionArgs,
  connectionDefinitions,
} = require('graphql-relay');


const {
  GraphQLInt,
  GraphQLList,
} = require('graphql');


function courseDataTypeToGraphQLType(courseType) {
  const CourseType = require('./resources/course');
  const SectionType = require('./resources/section');
  const ComponentType = require('./resources/component');
  const ContentType = require('./resources/content');

  switch (courseType) {
    case 'course':
      return CourseType;
    case 'section':
      return SectionType;
    case 'component':
      return ComponentType;
    case 'content':
      return ContentType;
    default:
      throw new Error('Unrecognized type `' + swapiType + '`.');
  }
}

async function getObjectsByType(type, args) {
  const objects = await courseDataTypeToGraphQLType(type).getters.all();
  const totalCount = objects.length;

  return { objects, totalCount };
}

/**
 * Constructs a GraphQL connection field config; it is assumed
 * that the object has a property named `prop`, and that property
 * contains a list of URLs.
 */
function connectionFromUrls(name, prop, type) {
  const { connectionType } = connectionDefinitions({
    name,
    nodeType: type,
    resolveNode: edge => edge.node,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: conn => conn.totalCount,
        description: `... description`,
      },
      [prop]: {
        type: new GraphQLList(type),
        resolve: conn => conn.edges.map(edge => edge.node),
        description: `... description`
      },
    }),
  });

  return {
    type: connectionType,
    args: connectionArgs,
    resolve: async (obj, args) => {
      console.log('name: ', name);
      console.log('prop: ', prop);
      console.log('---');
      console.log('obj: ', obj);
      console.log('args: ', args);

      const array = await courseDataTypeToGraphQLType('section')
        .getters['courseId'](obj.courseId);

      return Object.assign(
        {},
        connectionFromArray(array, args),
        { totalCount: array.length },
      );
    }

  }
};



module.exports = {
  courseDataTypeToGraphQLType,
  getObjectsByType,
  connectionFromUrls,
};
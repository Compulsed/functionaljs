const _ = require('lodash');
const BbPromise = require('bluebird');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const type = new GraphQLObjectType({
  name: 'Course',
  description: 'A Course',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'The title of a course.',
    }
  })
});

const courses = [
    {
        // Primary Key
        courseId: 'aws-csa',

        title: 'Certified Solutions Architect Associate',
    },
    {
        // Primary Key        
        courseId: 'aws-cda',

        title: 'Certified Developer Associate',
    },
];

const coursesByCourseId = _.keyBy(courses, 'courseId');

const getters = {
    getById: courseId => BbPromise.resolve(coursesByCourseId[courseId] || null),
    
    getCourseByCourseId: courseId => BbPromise.resolve(coursesByCourseId[courseId] || null),
};

module.exports = {
    type,
    getters,
}
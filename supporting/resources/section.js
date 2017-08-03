const _ = require('lodash');
const BbPromise = require('bluebird');

const {
  graphql,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const type = new GraphQLObjectType({
  name: 'Section',
  description: 'Section is composed of components',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'The title of a component.',
    },
  }),
});

const sections = [
    {
        // Primary Key
        sectionId: 'csa-section-1',
        
        courseId: 'aws-csa',
        title: 'Introduction',
        sequenceId: 0,
    },
    {
        // Primary Key
        sectionId: 'csa-section-1',

        courseId: 'aws-csa',
        title: 'Installing Tools',
        sequenceId: 1,
    },
];

const sectionBySectionId = _.keyBy(sections, 'sectionId');
const sectionsByCourseId = _.groupBy(sections, 'courseId');

const getters = {
    all: () => BbPromise.resolve(sections),
    getById: sectionId => BbPromise.resolve(sectionBySectionId[sectionId] || null),

    getSectionBySectionId: sectionId => BbPromise.resolve(sectionBySectionId[sectionId] || null),
    getSectionsByCourseId: courseId => BbPromise.resolve(sectionsByCourseId[courseId] || []),
};

module.exports = {
    type,
    getters,
}
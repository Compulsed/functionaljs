const _ = require('lodash');
const BbPromise = require('bluebird');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const type = new GraphQLObjectType({
  name: 'Component',
  description: 'A Component (Lecture, Quiz, in a coures)',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'The title of a component.',
    }
  })
});

const components = [
    {
        // Primary Id
        componentId: 'csa-section-1-component-1',

        sectionId: 'csa-section-1',
        courseId: 'aws-csa',
        title: 'Introduction To Course',
        sequenceId: 0,
        contentId: '123-123-123-123',
    },
    {
        // Primary Id
        componentId: 'csa-section-1-component-2',

        sectionId: 'csa-section-1',
        courseId: 'aws-csa',
        title: 'Introduction To Outcome',
        sequenceId: 1,
        contentId: '123-123-123-124',        
    },
    {
        // Primary Id
        componentId: 'csa-section-2-component-1',

        sectionId: 'csa-section-2',
        courseId: 'aws-csa',
        title: 'Introduction To Installing Tools',
        sequenceId: 0,
        contentId: '123-123-123-125',        
    },
    {
        // Primary Id
        componentId: 'csa-section-1-component-2',

        sectionId: 'csa-section-2',
        courseId: 'aws-csa',
        title: 'Introduction To Running Installed Tools',
        sequenceId: 1,
        contentId: '123-123-123-126',        
    },
];

const componentByComponentId = _.keyBy(components, 'componentId');
const componentsBySectionId = _.groupBy(components, 'sectionId');
const componentsByCourseId = _.groupBy(components, 'courseId');

const getters = {
    getById: componentId => BbPromise.resolve(componentByComponentId[componentId] || null),
    
    getComponentByComponentId: componentId => BbPromise.resolve(componentByComponentId[componentId] || null),
    getComponentsBySectionId: sectionId => BbPromise.resolve(componentsBySectionId[sectionId] || []),
    getComponentsByCourseId: courseId => BbPromise.resolve(componentsByCourseId[courseId] || []),
};

module.exports = {
    type,
    getters,
}
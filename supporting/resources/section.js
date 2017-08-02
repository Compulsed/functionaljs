const _ = require('lodash');
const BbPromise = require('bluebird');

const type = {

};

const sections = _.keyBy([
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
], 'id');

const sectionBySectionId = _.keyBy(sections, 'sectionId');
const sectionsByCourseId = _.groupBy(sections, 'courseId');

const getters = {
    getById: sectionId => BbPromise.resolve(sectionBysectionId[sectionId] || null),

    getSectionBySectionId: sectionId => BbPromise.resolve(sectionBysectionId[sectionId] || null),
    getSectionsByCourseId: courseId => BbPromise.resolve(sectionsByCourseId[courseId] || []),
};

module.exports = {
    type,
    getters,
}
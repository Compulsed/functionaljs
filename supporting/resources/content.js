const _ = require('lodash');
const BbPromise = require('bluebird');

const type = {

};

const content = [
    {
        // Primary Key
        contentId: '123-123-123-123',
        videoSources: [{ key: 'key' }]
    },
    {
        // Primary Key        
        contentId: '123-123-123-124',
        videoSources: [{ key: 'key' }]
    },
    {
        // Primary Key
        contentId: '123-123-123-125',
        videoSources: [{ key: 'key' }]
    },
    {
        // Primary Key        
        contentId: '123-123-123-126',
        videoSources: [{ key: 'key' }]
    },
    {
        // Primary Key
        contentId: '123-123-123-127',
        videoSources: [{ key: 'key' }]
    },
    {
        // Primary Key        
        contentId: '123-123-123-128',
        videoSources: [{ key: 'key' }]
    },
    {
        // Primary Key
        contentId: '123-123-123-129',
        videoSources: [{ key: 'key' }]
    },
    {
        // Primary Key        
        contentId: '123-123-123-130',
        videoSources: [{ key: 'key' }]
    },            
];

const contentById = _.keyBy(content, 'contentId');

const getters = {
    getById: contentId => BbPromise.resolve(contentById[contentId] || null),
    
    getContentById: contentId => contentById[contentId] || null,
};

module.exports = {
    type,
    getters,
}
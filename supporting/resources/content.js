const _ = require('lodash');
const BbPromise = require('bluebird');

const {
  graphql,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const videosource = new GraphQLObjectType({
    name: 'Videosource',
    fields: {
        key: {
            type: GraphQLString,
        },
        bucket: {
            type: GraphQLString,
        }
    },
})

const type = new GraphQLObjectType({
    name: 'Content',
    description: 'Generic Content',
    fields: () => ({
        contentId: {
            type: GraphQLString,
            description: 'A Unique way to identify content',
        },
        videosources: {
            type: new GraphQLList(videosource)
        }
    }),
});

const content = [
    {
        // Primary Key
        contentId: '123-123-123-123',
        videosources: [{ key: '123-123-123-123-key', bucket: '123-123-123-123-bucket' }]
    },
    {
        // Primary Key        
        contentId: '123-123-123-124',
        videosources: [{ key: '123-123-123-124-key', bucket: '123-123-123-124-bucket' }]
    },
    {
        // Primary Key
        contentId: '123-123-123-125',
        videosources: [{ key: '123-123-123-125-key', bucket: '123-123-123-125-bucket' }]
    },
    {
        // Primary Key        
        contentId: '123-123-123-126',
        videosources: [{ key: '123-123-123-126-key', bucket: '123-123-123-126-bucket' }]
    },
    {
        // Primary Key
        contentId: '123-123-123-127',
        videosources: [{ key: '123-123-123-127-key', bucket: '123-123-123-127-bucket' }]
    },
    {
        // Primary Key        
        contentId: '123-123-123-128',
        videosources: [{ key: '123-123-123-128-key', bucket: '123-123-123-128-bucket' }]
    },
    {
        // Primary Key
        contentId: '123-123-123-129',
        videosources: [{ key: 'key-123-123-123-129', bucket: 'key-123-123-123-bucket' }]
    },
    {
        // Primary Key        
        contentId: '123-123-123-130',
        videosources: [{ key: '123-123-123-130-key', bucket: '123-123-123-130-bucket' }]
    },            
];

const contentById = _.keyBy(content, 'contentId');

const getters = {
    getById: contentId => BbPromise.resolve(contentById[contentId] || null),
    
    getContentById: contentId => BbPromise.resolve(contentById[contentId] || null),
};

module.exports = {
    type,
    getters,
}
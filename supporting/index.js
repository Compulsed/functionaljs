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

module.exports = {
  courseDataTypeToGraphQLType,
  getObjectsByType,
};
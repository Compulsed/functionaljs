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

module.exports = courseDataTypeToGraphQLType;
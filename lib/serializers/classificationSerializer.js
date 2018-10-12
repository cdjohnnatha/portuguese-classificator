const { Serializer } = require('jsonapi-serializer');

const serializerAttributes = [
  'word',
  'classification',
];


function ClassificationSerializer(object) {
  object = JSON.parse(object);
  const opts = {
    attributes: serializerAttributes,
    topLevelLinks: { self: '/classification' },
    keyForAttribute: 'underscore_case',
  };

  return new Serializer('classification', object, opts);
}


module.exports = ClassificationSerializer;


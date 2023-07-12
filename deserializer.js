/**
 * Referenced from https://github.com/grpc/grpc-node/blob/fe42d6495ef8ab9635060136036157327d7181d7/packages/grpc-js-xds/src/xds-bootstrap.ts#L161-L215
 */

function validateStruct(field) {
  switch (field?.kind) {
    case 'listValue':
      return field.listValue.values.map((value) => validateStruct(value));
    case 'boolValue':
    case 'numberValue':
    case 'stringValue':
      return field[field.kind];
    case 'nullValue':
      return null;
    case 'structValue':
      return getJsonFromStruct(field.structValue);
    default:
      throw new Error(`Could not handle struct kind of value ${field?.kind}`);
  }
}

function getJsonFromStruct(struct) {
  if (typeof struct !== 'object' || struct === null) {
    return {};
  }

  const obj = {};
  for (const [fieldName, value] of Object.entries(struct.fields)) {
    obj[fieldName] = validateStruct(value);
  }

  return obj;
}

module.exports = {getJsonFromStruct};
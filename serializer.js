function validateValue(obj) {
  if (Array.isArray(obj)) {
    return {
      kind: 'listValue',
      listValue: {
        values: obj.map((value) => validateValue(value)),
      },
    };
  } else {
    switch (typeof obj) {
      case 'boolean':
        return {
          kind: 'boolValue',
          boolValue: obj,
        };
      case 'number':
        return {
          kind: 'numberValue',
          numberValue: obj,
        };
      case 'string':
        return {
          kind: 'stringValue',
          stringValue: obj,
        };
      case 'object':
        if (obj === null) {
          return {
            kind: 'nullValue',
            nullValue: 'NULL_VALUE',
          };
        } else {
          return {
            kind: 'structValue',
            structValue: getStructFromJson(obj),
          };
        }
      default:
        throw new Error(`Could not handle struct value of type ${typeof obj}`);
    }
  }
}

function getStructFromJson(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Invalid JSON object for Struct field');
  }

  const fields = {};
  for (const [fieldName, value] of Object.entries(obj)) {
    fields[fieldName] = validateValue(value);
  }

  return {
    fields,
  };
}

module.exports = {getStructFromJson};
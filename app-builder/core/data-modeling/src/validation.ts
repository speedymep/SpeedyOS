import { IModelDefinition, IFieldDefinition, FieldType, IValidationRule } from './types';
import Ajv from 'ajv';

const ajv = new Ajv();

/**
 * Validate a model definition
 */
export function validateModel(model: IModelDefinition): boolean {
  // Check if model has a name
  if (!model.name || typeof model.name !== 'string' || model.name.trim() === '') {
    console.error('Model must have a valid name');
    return false;
  }

  // Check if model has fields
  if (!Array.isArray(model.fields) || model.fields.length === 0) {
    console.error(`Model ${model.name} must have at least one field`);
    return false;
  }

  // Check for duplicate field names
  const fieldNames = new Set<string>();
  for (const field of model.fields) {
    if (fieldNames.has(field.name)) {
      console.error(`Duplicate field name ${field.name} in model ${model.name}`);
      return false;
    }
    fieldNames.add(field.name);
  }

  // Validate each field
  for (const field of model.fields) {
    if (!validateField(field)) {
      console.error(`Invalid field ${field.name} in model ${model.name}`);
      return false;
    }
  }

  // Validate relationships if they exist
  if (model.relationships) {
    // Check for duplicate relationship names
    const relationshipNames = new Set<string>();
    for (const relationship of model.relationships) {
      if (relationshipNames.has(relationship.name)) {
        console.error(`Duplicate relationship name ${relationship.name} in model ${model.name}`);
        return false;
      }
      relationshipNames.add(relationship.name);

      // Check if relationship has a target model
      if (!relationship.targetModel || typeof relationship.targetModel !== 'string' || relationship.targetModel.trim() === '') {
        console.error(`Relationship ${relationship.name} in model ${model.name} must have a valid target model`);
        return false;
      }
    }
  }

  return true;
}

/**
 * Validate a field definition
 */
export function validateField(field: IFieldDefinition): boolean {
  // Check if field has a name
  if (!field.name || typeof field.name !== 'string' || field.name.trim() === '') {
    console.error('Field must have a valid name');
    return false;
  }

  // Check if field has a valid type
  if (!Object.values(FieldType).includes(field.type as FieldType)) {
    console.error(`Field ${field.name} has an invalid type: ${field.type}`);
    return false;
  }

  // Validate enum fields
  if (field.type === FieldType.ENUM) {
    if (!field.options?.values || !Array.isArray(field.options.values) || field.options.values.length === 0) {
      console.error(`Enum field ${field.name} must have valid values`);
      return false;
    }
  }

  // Validate reference fields
  if (field.type === FieldType.REFERENCE) {
    if (!field.options?.targetModel || typeof field.options.targetModel !== 'string' || field.options.targetModel.trim() === '') {
      console.error(`Reference field ${field.name} must have a valid target model`);
      return false;
    }
  }

  // Validate formula fields
  if (field.type === FieldType.FORMULA) {
    if (!field.options?.formula || typeof field.options.formula !== 'string' || field.options.formula.trim() === '') {
      console.error(`Formula field ${field.name} must have a valid formula`);
      return false;
    }
  }

  // Validate computed fields
  if (field.type === FieldType.COMPUTED) {
    if (!field.options?.computation || typeof field.options.computation !== 'string' || field.options.computation.trim() === '') {
      console.error(`Computed field ${field.name} must have a valid computation`);
      return false;
    }
  }

  // Validate field validations if they exist
  if (field.validations && Array.isArray(field.validations)) {
    for (const validation of field.validations) {
      if (!validateValidationRule(validation)) {
        console.error(`Invalid validation rule in field ${field.name}`);
        return false;
      }
    }
  }

  return true;
}

/**
 * Validate a validation rule
 */
export function validateValidationRule(rule: IValidationRule): boolean {
  // Check if rule has a type
  if (!rule.type || typeof rule.type !== 'string' || rule.type.trim() === '') {
    console.error('Validation rule must have a valid type');
    return false;
  }

  return true;
}

/**
 * Create a JSON schema for a model
 */
export function createJsonSchema(model: IModelDefinition): Record<string, any> {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  // Add properties for each field
  for (const field of model.fields) {
    properties[field.name] = fieldToJsonSchema(field);

    // Add to required fields if necessary
    if (field.required) {
      required.push(field.name);
    }
  }

  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: model.label || model.name,
    description: model.description,
    type: 'object',
    properties,
    required: required.length > 0 ? required : undefined,
    additionalProperties: false,
  };
}

/**
 * Convert a field to JSON schema
 */
function fieldToJsonSchema(field: IFieldDefinition): Record<string, any> {
  const schema: Record<string, any> = {
    title: field.label || field.name,
    description: field.description,
  };

  // Set type and format based on field type
  switch (field.type) {
    case FieldType.STRING:
      schema.type = 'string';
      break;
    case FieldType.TEXT:
      schema.type = 'string';
      break;
    case FieldType.INTEGER:
      schema.type = 'integer';
      break;
    case FieldType.FLOAT:
      schema.type = 'number';
      break;
    case FieldType.BOOLEAN:
      schema.type = 'boolean';
      break;
    case FieldType.DATE:
      schema.type = 'string';
      schema.format = 'date';
      break;
    case FieldType.DATETIME:
      schema.type = 'string';
      schema.format = 'date-time';
      break;
    case FieldType.JSON:
      schema.type = 'object';
      break;
    case FieldType.ENUM:
      schema.type = 'string';
      schema.enum = field.options?.values;
      break;
    case FieldType.REFERENCE:
      schema.type = 'string';
      schema.format = 'uuid';
      break;
    case FieldType.FILE:
      schema.type = 'string';
      schema.format = 'uri';
      break;
    case FieldType.IMAGE:
      schema.type = 'string';
      schema.format = 'uri';
      break;
    case FieldType.FORMULA:
    case FieldType.COMPUTED:
      // These are computed on the server, so we don't validate them
      schema.type = 'string';
      break;
    default:
      schema.type = 'string';
  }

  // Add validations
  if (field.validations && field.validations.length > 0) {
    for (const validation of field.validations) {
      switch (validation.type) {
        case 'min':
          if (schema.type === 'string') {
            schema.minLength = validation.options?.value;
          } else if (schema.type === 'integer' || schema.type === 'number') {
            schema.minimum = validation.options?.value;
          }
          break;
        case 'max':
          if (schema.type === 'string') {
            schema.maxLength = validation.options?.value;
          } else if (schema.type === 'integer' || schema.type === 'number') {
            schema.maximum = validation.options?.value;
          }
          break;
        case 'pattern':
          schema.pattern = validation.options?.pattern;
          break;
        case 'email':
          schema.format = 'email';
          break;
        case 'url':
          schema.format = 'uri';
          break;
      }
    }
  }

  return schema;
}

/**
 * Validate data against a model
 */
export function validateData(data: Record<string, any>, model: IModelDefinition): { valid: boolean; errors?: string[] } {
  const schema = createJsonSchema(model);
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    return {
      valid: false,
      errors: validate.errors?.map(error => `${error.instancePath} ${error.message}`),
    };
  }

  return { valid: true };
}
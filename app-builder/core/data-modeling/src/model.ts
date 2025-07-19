import { IModelDefinition, IFieldDefinition, IRelationshipDefinition, FieldType } from './types';
import { validateModel } from './validation';

/**
 * Model class for defining data models
 */
export class Model implements IModelDefinition {
  name: string;
  label?: string;
  description?: string;
  fields: IFieldDefinition[];
  relationships?: IRelationshipDefinition[];
  options?: Record<string, any>;
  ui?: Record<string, any>;

  constructor(definition: IModelDefinition) {
    this.name = definition.name;
    this.label = definition.label || definition.name;
    this.description = definition.description;
    this.fields = definition.fields || [];
    this.relationships = definition.relationships || [];
    this.options = definition.options || {};
    this.ui = definition.ui || {};

    // Validate the model
    if (!validateModel(this)) {
      throw new Error(`Invalid model definition for ${this.name}`);
    }
  }

  /**
   * Add a field to the model
   */
  addField(field: IFieldDefinition): Model {
    // Check if field with the same name already exists
    if (this.fields.some(f => f.name === field.name)) {
      throw new Error(`Field with name ${field.name} already exists in model ${this.name}`);
    }

    this.fields.push(field);
    return this;
  }

  /**
   * Add a relationship to the model
   */
  addRelationship(relationship: IRelationshipDefinition): Model {
    // Check if relationship with the same name already exists
    if (this.relationships?.some(r => r.name === relationship.name)) {
      throw new Error(`Relationship with name ${relationship.name} already exists in model ${this.name}`);
    }

    if (!this.relationships) {
      this.relationships = [];
    }

    this.relationships.push(relationship);
    return this;
  }

  /**
   * Get a field by name
   */
  getField(name: string): IFieldDefinition | undefined {
    return this.fields.find(field => field.name === name);
  }

  /**
   * Get a relationship by name
   */
  getRelationship(name: string): IRelationshipDefinition | undefined {
    return this.relationships?.find(rel => rel.name === name);
  }

  /**
   * Update a field
   */
  updateField(name: string, updates: Partial<IFieldDefinition>): Model {
    const fieldIndex = this.fields.findIndex(field => field.name === name);
    if (fieldIndex === -1) {
      throw new Error(`Field with name ${name} does not exist in model ${this.name}`);
    }

    this.fields[fieldIndex] = { ...this.fields[fieldIndex], ...updates };
    return this;
  }

  /**
   * Remove a field
   */
  removeField(name: string): Model {
    const fieldIndex = this.fields.findIndex(field => field.name === name);
    if (fieldIndex === -1) {
      throw new Error(`Field with name ${name} does not exist in model ${this.name}`);
    }

    this.fields.splice(fieldIndex, 1);
    return this;
  }

  /**
   * Convert model to a plain object
   */
  toJSON(): IModelDefinition {
    return {
      name: this.name,
      label: this.label,
      description: this.description,
      fields: this.fields,
      relationships: this.relationships,
      options: this.options,
      ui: this.ui,
    };
  }

  /**
   * Create a model from a plain object
   */
  static fromJSON(json: IModelDefinition): Model {
    return new Model(json);
  }
}
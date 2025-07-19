import { ISchemaDefinition, IModelDefinition, ISchemaManager } from './types';
import { Model } from './model';
import { validateModel } from './validation';

/**
 * Schema manager for managing data models
 */
export class SchemaManager implements ISchemaManager {
  private models: Map<string, IModelDefinition>;
  private version: string;
  private options: Record<string, any>;

  constructor(initialSchema?: ISchemaDefinition) {
    this.models = new Map();
    this.version = initialSchema?.version || '1.0.0';
    this.options = initialSchema?.options || {};

    // Initialize with initial schema if provided
    if (initialSchema?.models) {
      initialSchema.models.forEach(model => {
        this.models.set(model.name, model);
      });
    }
  }

  /**
   * Initialize the schema manager
   */
  async initialize(): Promise<void> {
    // This method can be used for any async initialization
    return Promise.resolve();
  }

  /**
   * Get the current schema
   */
  getSchema(): ISchemaDefinition {
    return {
      models: Array.from(this.models.values()),
      version: this.version,
      options: this.options,
    };
  }

  /**
   * Add a model to the schema
   */
  async addModel(model: IModelDefinition): Promise<void> {
    if (this.models.has(model.name)) {
      throw new Error(`Model with name ${model.name} already exists`);
    }

    if (!validateModel(model)) {
      throw new Error(`Invalid model definition for ${model.name}`);
    }

    this.models.set(model.name, model);
  }

  /**
   * Update an existing model
   */
  async updateModel(model: IModelDefinition): Promise<void> {
    if (!this.models.has(model.name)) {
      throw new Error(`Model with name ${model.name} does not exist`);
    }

    if (!validateModel(model)) {
      throw new Error(`Invalid model definition for ${model.name}`);
    }

    this.models.set(model.name, model);
  }

  /**
   * Delete a model from the schema
   */
  async deleteModel(modelName: string): Promise<void> {
    if (!this.models.has(modelName)) {
      throw new Error(`Model with name ${modelName} does not exist`);
    }

    this.models.delete(modelName);
  }

  /**
   * Get a model by name
   */
  getModel(modelName: string): IModelDefinition | null {
    return this.models.get(modelName) || null;
  }

  /**
   * Validate a model definition
   */
  validateModel(model: IModelDefinition): boolean {
    return validateModel(model);
  }

  /**
   * Apply a schema definition
   */
  async applySchema(schema: ISchemaDefinition): Promise<void> {
    // Clear existing models
    this.models.clear();

    // Add new models
    for (const model of schema.models) {
      if (!validateModel(model)) {
        throw new Error(`Invalid model definition for ${model.name}`);
      }
      this.models.set(model.name, model);
    }

    // Update version and options
    this.version = schema.version || this.version;
    this.options = schema.options || this.options;
  }

  /**
   * Export the current schema
   */
  exportSchema(): ISchemaDefinition {
    return this.getSchema();
  }
}
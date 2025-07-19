/**
 * Field types supported by the data modeling system
 */
export enum FieldType {
  STRING = 'string',
  TEXT = 'text',
  INTEGER = 'integer',
  FLOAT = 'float',
  BOOLEAN = 'boolean',
  DATE = 'date',
  DATETIME = 'datetime',
  JSON = 'json',
  ENUM = 'enum',
  REFERENCE = 'reference',
  FILE = 'file',
  IMAGE = 'image',
  FORMULA = 'formula',
  COMPUTED = 'computed',
}

/**
 * Relationship types between models
 */
export enum RelationshipType {
  ONE_TO_ONE = 'oneToOne',
  ONE_TO_MANY = 'oneToMany',
  MANY_TO_ONE = 'manyToOne',
  MANY_TO_MANY = 'manyToMany',
}

/**
 * Field definition interface
 */
export interface IFieldDefinition {
  name: string;
  type: FieldType;
  label?: string;
  description?: string;
  required?: boolean;
  unique?: boolean;
  defaultValue?: any;
  options?: Record<string, any>;
  validations?: IValidationRule[];
  ui?: IUIOptions;
}

/**
 * Relationship definition interface
 */
export interface IRelationshipDefinition {
  name: string;
  type: RelationshipType;
  targetModel: string;
  sourceField?: string;
  targetField?: string;
  label?: string;
  description?: string;
  ui?: IUIOptions;
}

/**
 * Model definition interface
 */
export interface IModelDefinition {
  name: string;
  label?: string;
  description?: string;
  fields: IFieldDefinition[];
  relationships?: IRelationshipDefinition[];
  options?: Record<string, any>;
  ui?: IUIOptions;
}

/**
 * Validation rule interface
 */
export interface IValidationRule {
  type: string;
  message?: string;
  options?: Record<string, any>;
}

/**
 * UI options interface
 */
export interface IUIOptions {
  component?: string;
  props?: Record<string, any>;
  hidden?: boolean;
  readonly?: boolean;
  order?: number;
  group?: string;
  width?: number | string;
  [key: string]: any;
}

/**
 * Schema definition interface
 */
export interface ISchemaDefinition {
  models: IModelDefinition[];
  version?: string;
  options?: Record<string, any>;
}

/**
 * Database adapter interface
 */
export interface IDatabaseAdapter {
  initialize(): Promise<void>;
  createModel(model: IModelDefinition): Promise<void>;
  updateModel(model: IModelDefinition): Promise<void>;
  deleteModel(modelName: string): Promise<void>;
  getModel(modelName: string): Promise<IModelDefinition | null>;
  getAllModels(): Promise<IModelDefinition[]>;
  createRecord(modelName: string, data: Record<string, any>): Promise<Record<string, any>>;
  getRecord(modelName: string, id: string | number): Promise<Record<string, any> | null>;
  updateRecord(modelName: string, id: string | number, data: Record<string, any>): Promise<Record<string, any>>;
  deleteRecord(modelName: string, id: string | number): Promise<void>;
  queryRecords(modelName: string, query: Record<string, any>): Promise<Record<string, any>[]>;
}

/**
 * Schema manager interface
 */
export interface ISchemaManager {
  initialize(): Promise<void>;
  getSchema(): ISchemaDefinition;
  addModel(model: IModelDefinition): Promise<void>;
  updateModel(model: IModelDefinition): Promise<void>;
  deleteModel(modelName: string): Promise<void>;
  getModel(modelName: string): IModelDefinition | null;
  validateModel(model: IModelDefinition): boolean;
  applySchema(schema: ISchemaDefinition): Promise<void>;
  exportSchema(): ISchemaDefinition;
}
import { IFieldDefinition, FieldType, IValidationRule, IUIOptions } from './types';

/**
 * Field class for defining model fields
 */
export class Field implements IFieldDefinition {
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

  constructor(definition: IFieldDefinition) {
    this.name = definition.name;
    this.type = definition.type;
    this.label = definition.label || definition.name;
    this.description = definition.description;
    this.required = definition.required || false;
    this.unique = definition.unique || false;
    this.defaultValue = definition.defaultValue;
    this.options = definition.options || {};
    this.validations = definition.validations || [];
    this.ui = definition.ui || {};
  }

  /**
   * Make the field required
   */
  makeRequired(): Field {
    this.required = true;
    return this;
  }

  /**
   * Make the field unique
   */
  makeUnique(): Field {
    this.unique = true;
    return this;
  }

  /**
   * Set the default value
   */
  setDefaultValue(value: any): Field {
    this.defaultValue = value;
    return this;
  }

  /**
   * Add a validation rule
   */
  addValidation(rule: IValidationRule): Field {
    if (!this.validations) {
      this.validations = [];
    }
    this.validations.push(rule);
    return this;
  }

  /**
   * Set UI options
   */
  setUIOptions(options: IUIOptions): Field {
    this.ui = { ...this.ui, ...options };
    return this;
  }

  /**
   * Convert field to a plain object
   */
  toJSON(): IFieldDefinition {
    return {
      name: this.name,
      type: this.type,
      label: this.label,
      description: this.description,
      required: this.required,
      unique: this.unique,
      defaultValue: this.defaultValue,
      options: this.options,
      validations: this.validations,
      ui: this.ui,
    };
  }

  /**
   * Create a field from a plain object
   */
  static fromJSON(json: IFieldDefinition): Field {
    return new Field(json);
  }

  /**
   * Create a string field
   */
  static string(name: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.STRING,
      label,
    });
  }

  /**
   * Create a text field
   */
  static text(name: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.TEXT,
      label,
    });
  }

  /**
   * Create an integer field
   */
  static integer(name: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.INTEGER,
      label,
    });
  }

  /**
   * Create a float field
   */
  static float(name: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.FLOAT,
      label,
    });
  }

  /**
   * Create a boolean field
   */
  static boolean(name: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.BOOLEAN,
      label,
    });
  }

  /**
   * Create a date field
   */
  static date(name: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.DATE,
      label,
    });
  }

  /**
   * Create a datetime field
   */
  static datetime(name: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.DATETIME,
      label,
    });
  }

  /**
   * Create an enum field
   */
  static enum(name: string, values: string[], label?: string): Field {
    return new Field({
      name,
      type: FieldType.ENUM,
      label,
      options: {
        values,
      },
    });
  }

  /**
   * Create a reference field
   */
  static reference(name: string, targetModel: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.REFERENCE,
      label,
      options: {
        targetModel,
      },
    });
  }

  /**
   * Create a file field
   */
  static file(name: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.FILE,
      label,
    });
  }

  /**
   * Create an image field
   */
  static image(name: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.IMAGE,
      label,
    });
  }

  /**
   * Create a formula field
   */
  static formula(name: string, formula: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.FORMULA,
      label,
      options: {
        formula,
      },
    });
  }

  /**
   * Create a computed field
   */
  static computed(name: string, computation: string, label?: string): Field {
    return new Field({
      name,
      type: FieldType.COMPUTED,
      label,
      options: {
        computation,
      },
    });
  }
}
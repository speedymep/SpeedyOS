import { IConditionDefinition, NodeType } from './types';
import { Node } from './node';

/**
 * Condition class for defining workflow conditions
 */
export class Condition extends Node implements IConditionDefinition {
  type: NodeType.CONDITION;
  conditionType: string;
  expression?: string;

  constructor(definition: IConditionDefinition) {
    super(definition);
    this.type = NodeType.CONDITION;
    this.conditionType = definition.conditionType;
    this.expression = definition.expression;
  }

  /**
   * Set the condition type
   */
  setConditionType(conditionType: string): Condition {
    this.conditionType = conditionType;
    return this;
  }

  /**
   * Set the condition expression
   */
  setExpression(expression: string): Condition {
    this.expression = expression;
    return this;
  }

  /**
   * Convert condition to a plain object
   */
  toJSON(): IConditionDefinition {
    return {
      ...super.toJSON(),
      type: NodeType.CONDITION,
      conditionType: this.conditionType,
      expression: this.expression,
    };
  }

  /**
   * Create a condition from a plain object
   */
  static fromJSON(json: IConditionDefinition): Condition {
    return new Condition(json);
  }

  /**
   * Create an expression condition
   */
  static expression(id: string, name: string, expression: string, options?: Partial<IConditionDefinition>): Condition {
    return new Condition({
      id,
      type: NodeType.CONDITION,
      name,
      conditionType: 'expression',
      expression,
      ...options,
    });
  }

  /**
   * Create a comparison condition
   */
  static comparison(id: string, name: string, left: string, operator: string, right: string, options?: Partial<IConditionDefinition>): Condition {
    return new Condition({
      id,
      type: NodeType.CONDITION,
      name,
      conditionType: 'comparison',
      config: {
        left,
        operator,
        right,
      },
      ...options,
    });
  }

  /**
   * Create a data exists condition
   */
  static exists(id: string, name: string, path: string, options?: Partial<IConditionDefinition>): Condition {
    return new Condition({
      id,
      type: NodeType.CONDITION,
      name,
      conditionType: 'exists',
      config: {
        path,
      },
      ...options,
    });
  }

  /**
   * Create a switch condition
   */
  static switch(id: string, name: string, value: string, cases: Record<string, string>, options?: Partial<IConditionDefinition>): Condition {
    return new Condition({
      id,
      type: NodeType.CONDITION,
      name,
      conditionType: 'switch',
      config: {
        value,
        cases,
      },
      ...options,
    });
  }

  /**
   * Create an AND condition
   */
  static and(id: string, name: string, conditions: string[], options?: Partial<IConditionDefinition>): Condition {
    return new Condition({
      id,
      type: NodeType.CONDITION,
      name,
      conditionType: 'and',
      config: {
        conditions,
      },
      ...options,
    });
  }

  /**
   * Create an OR condition
   */
  static or(id: string, name: string, conditions: string[], options?: Partial<IConditionDefinition>): Condition {
    return new Condition({
      id,
      type: NodeType.CONDITION,
      name,
      conditionType: 'or',
      config: {
        conditions,
      },
      ...options,
    });
  }

  /**
   * Create a NOT condition
   */
  static not(id: string, name: string, condition: string, options?: Partial<IConditionDefinition>): Condition {
    return new Condition({
      id,
      type: NodeType.CONDITION,
      name,
      conditionType: 'not',
      config: {
        condition,
      },
      ...options,
    });
  }
}
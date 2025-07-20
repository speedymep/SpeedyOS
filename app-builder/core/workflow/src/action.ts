import { IActionDefinition, NodeType } from './types';
import { Node } from './node';

/**
 * Action class for defining workflow actions
 */
export class Action extends Node implements IActionDefinition {
  type: NodeType.ACTION;
  actionType: string;

  constructor(definition: IActionDefinition) {
    super(definition);
    this.type = NodeType.ACTION;
    this.actionType = definition.actionType;
  }

  /**
   * Set the action type
   */
  setActionType(actionType: string): Action {
    this.actionType = actionType;
    return this;
  }

  /**
   * Convert action to a plain object
   */
  toJSON(): IActionDefinition {
    return {
      ...super.toJSON(),
      type: NodeType.ACTION,
      actionType: this.actionType,
    };
  }

  /**
   * Create an action from a plain object
   */
  static fromJSON(json: IActionDefinition): Action {
    return new Action(json);
  }

  /**
   * Create a database action
   */
  static database(id: string, name: string, model: string, operation: 'create' | 'read' | 'update' | 'delete', options?: Partial<IActionDefinition>): Action {
    return new Action({
      id,
      type: NodeType.ACTION,
      name,
      actionType: 'database',
      config: {
        model,
        operation,
      },
      ...options,
    });
  }

  /**
   * Create an HTTP request action
   */
  static httpRequest(id: string, name: string, url: string, method: string, options?: Partial<IActionDefinition>): Action {
    return new Action({
      id,
      type: NodeType.ACTION,
      name,
      actionType: 'httpRequest',
      config: {
        url,
        method,
      },
      ...options,
    });
  }

  /**
   * Create an email action
   */
  static email(id: string, name: string, to: string, subject: string, body: string, options?: Partial<IActionDefinition>): Action {
    return new Action({
      id,
      type: NodeType.ACTION,
      name,
      actionType: 'email',
      config: {
        to,
        subject,
        body,
      },
      ...options,
    });
  }

  /**
   * Create a notification action
   */
  static notification(id: string, name: string, message: string, type: string, options?: Partial<IActionDefinition>): Action {
    return new Action({
      id,
      type: NodeType.ACTION,
      name,
      actionType: 'notification',
      config: {
        message,
        type,
      },
      ...options,
    });
  }

  /**
   * Create a function action
   */
  static function(id: string, name: string, functionBody: string, options?: Partial<IActionDefinition>): Action {
    return new Action({
      id,
      type: NodeType.ACTION,
      name,
      actionType: 'function',
      config: {
        functionBody,
      },
      ...options,
    });
  }

  /**
   * Create a webhook action
   */
  static webhook(id: string, name: string, url: string, options?: Partial<IActionDefinition>): Action {
    return new Action({
      id,
      type: NodeType.ACTION,
      name,
      actionType: 'webhook',
      config: {
        url,
        method: 'POST',
      },
      ...options,
    });
  }

  /**
   * Create a file operation action
   */
  static fileOperation(id: string, name: string, operation: 'read' | 'write' | 'delete', path: string, options?: Partial<IActionDefinition>): Action {
    return new Action({
      id,
      type: NodeType.ACTION,
      name,
      actionType: 'fileOperation',
      config: {
        operation,
        path,
      },
      ...options,
    });
  }
}
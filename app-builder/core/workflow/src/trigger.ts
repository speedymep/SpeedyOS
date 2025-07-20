import { ITriggerDefinition, NodeType } from './types';
import { Node } from './node';

/**
 * Trigger class for defining workflow triggers
 */
export class Trigger extends Node implements ITriggerDefinition {
  type: NodeType.TRIGGER;
  triggerType: string;

  constructor(definition: ITriggerDefinition) {
    super(definition);
    this.type = NodeType.TRIGGER;
    this.triggerType = definition.triggerType;
  }

  /**
   * Set the trigger type
   */
  setTriggerType(triggerType: string): Trigger {
    this.triggerType = triggerType;
    return this;
  }

  /**
   * Convert trigger to a plain object
   */
  toJSON(): ITriggerDefinition {
    return {
      ...super.toJSON(),
      type: NodeType.TRIGGER,
      triggerType: this.triggerType,
    };
  }

  /**
   * Create a trigger from a plain object
   */
  static fromJSON(json: ITriggerDefinition): Trigger {
    return new Trigger(json);
  }

  /**
   * Create a webhook trigger
   */
  static webhook(id: string, name: string, path: string, options?: Partial<ITriggerDefinition>): Trigger {
    return new Trigger({
      id,
      type: NodeType.TRIGGER,
      name,
      triggerType: 'webhook',
      config: {
        path,
        method: 'POST',
      },
      ...options,
    });
  }

  /**
   * Create a schedule trigger
   */
  static schedule(id: string, name: string, schedule: string, options?: Partial<ITriggerDefinition>): Trigger {
    return new Trigger({
      id,
      type: NodeType.TRIGGER,
      name,
      triggerType: 'schedule',
      config: {
        schedule,
      },
      ...options,
    });
  }

  /**
   * Create a database trigger
   */
  static database(id: string, name: string, model: string, event: 'create' | 'update' | 'delete', options?: Partial<ITriggerDefinition>): Trigger {
    return new Trigger({
      id,
      type: NodeType.TRIGGER,
      name,
      triggerType: 'database',
      config: {
        model,
        event,
      },
      ...options,
    });
  }

  /**
   * Create a manual trigger
   */
  static manual(id: string, name: string, options?: Partial<ITriggerDefinition>): Trigger {
    return new Trigger({
      id,
      type: NodeType.TRIGGER,
      name,
      triggerType: 'manual',
      ...options,
    });
  }

  /**
   * Create an event trigger
   */
  static event(id: string, name: string, eventName: string, options?: Partial<ITriggerDefinition>): Trigger {
    return new Trigger({
      id,
      type: NodeType.TRIGGER,
      name,
      triggerType: 'event',
      config: {
        eventName,
      },
      ...options,
    });
  }
}
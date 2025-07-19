import { INodeDefinition, NodeType } from './types';

/**
 * Node class for defining workflow nodes
 */
export class Node implements INodeDefinition {
  id: string;
  type: NodeType;
  name: string;
  description?: string;
  config?: Record<string, any>;
  position?: { x: number; y: number };
  metadata?: Record<string, any>;

  constructor(definition: INodeDefinition) {
    this.id = definition.id;
    this.type = definition.type;
    this.name = definition.name;
    this.description = definition.description;
    this.config = definition.config || {};
    this.position = definition.position;
    this.metadata = definition.metadata || {};
  }

  /**
   * Set the node position
   */
  setPosition(x: number, y: number): Node {
    this.position = { x, y };
    return this;
  }

  /**
   * Set node configuration
   */
  setConfig(config: Record<string, any>): Node {
    this.config = { ...this.config, ...config };
    return this;
  }

  /**
   * Set node metadata
   */
  setMetadata(metadata: Record<string, any>): Node {
    this.metadata = { ...this.metadata, ...metadata };
    return this;
  }

  /**
   * Convert node to a plain object
   */
  toJSON(): INodeDefinition {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      description: this.description,
      config: this.config,
      position: this.position,
      metadata: this.metadata,
    };
  }

  /**
   * Create a node from a plain object
   */
  static fromJSON(json: INodeDefinition): Node {
    return new Node(json);
  }
}
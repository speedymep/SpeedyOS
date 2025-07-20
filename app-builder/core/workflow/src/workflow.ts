import { 
  IWorkflowDefinition, 
  INodeDefinition, 
  IConnectionDefinition, 
  NodeType, 
  ConnectionType 
} from './types';

/**
 * Workflow class for defining workflows
 */
export class Workflow implements IWorkflowDefinition {
  id: string;
  name: string;
  description?: string;
  version?: string;
  nodes: INodeDefinition[];
  connections: IConnectionDefinition[];
  metadata?: Record<string, any>;

  constructor(definition: IWorkflowDefinition) {
    this.id = definition.id;
    this.name = definition.name;
    this.description = definition.description;
    this.version = definition.version || '1.0.0';
    this.nodes = definition.nodes || [];
    this.connections = definition.connections || [];
    this.metadata = definition.metadata || {};
  }

  /**
   * Add a node to the workflow
   */
  addNode(node: INodeDefinition): Workflow {
    // Check if node with the same ID already exists
    if (this.nodes.some(n => n.id === node.id)) {
      throw new Error(`Node with ID ${node.id} already exists in workflow ${this.name}`);
    }

    this.nodes.push(node);
    return this;
  }

  /**
   * Add a connection between nodes
   */
  addConnection(connection: IConnectionDefinition): Workflow {
    // Check if connection with the same ID already exists
    if (this.connections.some(c => c.id === connection.id)) {
      throw new Error(`Connection with ID ${connection.id} already exists in workflow ${this.name}`);
    }

    // Check if source node exists
    if (!this.nodes.some(n => n.id === connection.source)) {
      throw new Error(`Source node with ID ${connection.source} does not exist in workflow ${this.name}`);
    }

    // Check if target node exists
    if (!this.nodes.some(n => n.id === connection.target)) {
      throw new Error(`Target node with ID ${connection.target} does not exist in workflow ${this.name}`);
    }

    this.connections.push(connection);
    return this;
  }

  /**
   * Connect two nodes
   */
  connect(sourceId: string, targetId: string, type: ConnectionType = ConnectionType.STANDARD, options?: Partial<IConnectionDefinition>): Workflow {
    const connectionId = `${sourceId}-${targetId}`;
    
    this.addConnection({
      id: connectionId,
      type,
      source: sourceId,
      target: targetId,
      ...options,
    });

    return this;
  }

  /**
   * Get a node by ID
   */
  getNode(id: string): INodeDefinition | undefined {
    return this.nodes.find(node => node.id === id);
  }

  /**
   * Get connections for a node
   */
  getNodeConnections(nodeId: string): IConnectionDefinition[] {
    return this.connections.filter(conn => conn.source === nodeId || conn.target === nodeId);
  }

  /**
   * Get outgoing connections for a node
   */
  getOutgoingConnections(nodeId: string): IConnectionDefinition[] {
    return this.connections.filter(conn => conn.source === nodeId);
  }

  /**
   * Get incoming connections for a node
   */
  getIncomingConnections(nodeId: string): IConnectionDefinition[] {
    return this.connections.filter(conn => conn.target === nodeId);
  }

  /**
   * Remove a node and its connections
   */
  removeNode(id: string): Workflow {
    // Remove the node
    this.nodes = this.nodes.filter(node => node.id !== id);
    
    // Remove connections involving the node
    this.connections = this.connections.filter(conn => conn.source !== id && conn.target !== id);
    
    return this;
  }

  /**
   * Remove a connection
   */
  removeConnection(id: string): Workflow {
    this.connections = this.connections.filter(conn => conn.id !== id);
    return this;
  }

  /**
   * Update a node
   */
  updateNode(id: string, updates: Partial<INodeDefinition>): Workflow {
    const nodeIndex = this.nodes.findIndex(node => node.id === id);
    if (nodeIndex === -1) {
      throw new Error(`Node with ID ${id} does not exist in workflow ${this.name}`);
    }

    this.nodes[nodeIndex] = { ...this.nodes[nodeIndex], ...updates };
    return this;
  }

  /**
   * Update a connection
   */
  updateConnection(id: string, updates: Partial<IConnectionDefinition>): Workflow {
    const connectionIndex = this.connections.findIndex(conn => conn.id === id);
    if (connectionIndex === -1) {
      throw new Error(`Connection with ID ${id} does not exist in workflow ${this.name}`);
    }

    this.connections[connectionIndex] = { ...this.connections[connectionIndex], ...updates };
    return this;
  }

  /**
   * Set workflow metadata
   */
  setMetadata(metadata: Record<string, any>): Workflow {
    this.metadata = { ...this.metadata, ...metadata };
    return this;
  }

  /**
   * Validate the workflow
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check if workflow has at least one trigger
    const hasTrigger = this.nodes.some(node => node.type === NodeType.TRIGGER);
    if (!hasTrigger) {
      errors.push('Workflow must have at least one trigger node');
    }

    // Check for orphaned nodes (no incoming or outgoing connections)
    this.nodes.forEach(node => {
      // Skip triggers as they don't need incoming connections
      if (node.type !== NodeType.TRIGGER) {
        const hasIncoming = this.connections.some(conn => conn.target === node.id);
        if (!hasIncoming) {
          errors.push(`Node ${node.name} (${node.id}) has no incoming connections`);
        }
      }
    });

    // Check for circular references
    // This is a simplified check and might not catch all circular references
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const checkCircular = (nodeId: string): boolean => {
      if (recursionStack.has(nodeId)) {
        errors.push(`Circular reference detected involving node ${nodeId}`);
        return true;
      }

      if (visited.has(nodeId)) {
        return false;
      }

      visited.add(nodeId);
      recursionStack.add(nodeId);

      const outgoing = this.getOutgoingConnections(nodeId);
      for (const conn of outgoing) {
        if (checkCircular(conn.target)) {
          return true;
        }
      }

      recursionStack.delete(nodeId);
      return false;
    };

    // Start checking from trigger nodes
    const triggerNodes = this.nodes.filter(node => node.type === NodeType.TRIGGER);
    triggerNodes.forEach(node => {
      checkCircular(node.id);
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Convert workflow to a plain object
   */
  toJSON(): IWorkflowDefinition {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      version: this.version,
      nodes: this.nodes,
      connections: this.connections,
      metadata: this.metadata,
    };
  }

  /**
   * Create a workflow from a plain object
   */
  static fromJSON(json: IWorkflowDefinition): Workflow {
    return new Workflow(json);
  }
}
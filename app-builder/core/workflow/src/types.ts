/**
 * Node type enum
 */
export enum NodeType {
  TRIGGER = 'trigger',
  ACTION = 'action',
  CONDITION = 'condition',
  LOOP = 'loop',
  DELAY = 'delay',
  PARALLEL = 'parallel',
  CUSTOM = 'custom',
}

/**
 * Connection type enum
 */
export enum ConnectionType {
  STANDARD = 'standard',
  TRUE = 'true',
  FALSE = 'false',
  ERROR = 'error',
  CUSTOM = 'custom',
}

/**
 * Node definition interface
 */
export interface INodeDefinition {
  id: string;
  type: NodeType;
  name: string;
  description?: string;
  config?: Record<string, any>;
  position?: { x: number; y: number };
  metadata?: Record<string, any>;
}

/**
 * Connection definition interface
 */
export interface IConnectionDefinition {
  id: string;
  type: ConnectionType;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  metadata?: Record<string, any>;
}

/**
 * Workflow definition interface
 */
export interface IWorkflowDefinition {
  id: string;
  name: string;
  description?: string;
  version?: string;
  nodes: INodeDefinition[];
  connections: IConnectionDefinition[];
  metadata?: Record<string, any>;
}

/**
 * Trigger definition interface
 */
export interface ITriggerDefinition extends INodeDefinition {
  type: NodeType.TRIGGER;
  triggerType: string;
}

/**
 * Action definition interface
 */
export interface IActionDefinition extends INodeDefinition {
  type: NodeType.ACTION;
  actionType: string;
}

/**
 * Condition definition interface
 */
export interface IConditionDefinition extends INodeDefinition {
  type: NodeType.CONDITION;
  conditionType: string;
  expression?: string;
}

/**
 * Loop definition interface
 */
export interface ILoopDefinition extends INodeDefinition {
  type: NodeType.LOOP;
  loopType: string;
  collection?: string;
  iterations?: number;
  condition?: string;
}

/**
 * Delay definition interface
 */
export interface IDelayDefinition extends INodeDefinition {
  type: NodeType.DELAY;
  delayType: string;
  duration?: number;
  until?: string;
}

/**
 * Parallel definition interface
 */
export interface IParallelDefinition extends INodeDefinition {
  type: NodeType.PARALLEL;
  branches: number;
}

/**
 * Custom node definition interface
 */
export interface ICustomNodeDefinition extends INodeDefinition {
  type: NodeType.CUSTOM;
  customType: string;
}

/**
 * Execution context interface
 */
export interface IExecutionContext {
  workflow: IWorkflowDefinition;
  currentNode: INodeDefinition;
  data: Record<string, any>;
  results: Record<string, any>;
  variables: Record<string, any>;
  logger: {
    info: (message: string, data?: any) => void;
    error: (message: string, error?: any) => void;
    warn: (message: string, data?: any) => void;
    debug: (message: string, data?: any) => void;
  };
}

/**
 * Node executor interface
 */
export interface INodeExecutor {
  execute(node: INodeDefinition, context: IExecutionContext): Promise<any>;
}

/**
 * Workflow executor interface
 */
export interface IWorkflowExecutor {
  execute(workflow: IWorkflowDefinition, initialData?: Record<string, any>): Promise<any>;
}

/**
 * Workflow manager interface
 */
export interface IWorkflowManager {
  getWorkflow(id: string): IWorkflowDefinition | null;
  saveWorkflow(workflow: IWorkflowDefinition): Promise<void>;
  deleteWorkflow(id: string): Promise<void>;
  listWorkflows(): Promise<IWorkflowDefinition[]>;
  executeWorkflow(id: string, data?: Record<string, any>): Promise<any>;
}
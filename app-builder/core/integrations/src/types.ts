/**
 * Integration provider interface
 */
export interface IIntegrationProvider {
  /**
   * Initialize the integration provider
   */
  initialize(): Promise<void>;

  /**
   * Get the provider name
   */
  getName(): string;

  /**
   * Get the provider version
   */
  getVersion(): string;

  /**
   * Check if the provider is initialized
   */
  isInitialized(): boolean;

  /**
   * Execute a workflow
   */
  executeWorkflow(workflowId: string, data?: Record<string, any>): Promise<any>;

  /**
   * Get a workflow
   */
  getWorkflow(workflowId: string): Promise<any>;

  /**
   * Create a workflow
   */
  createWorkflow(workflow: any): Promise<any>;

  /**
   * Update a workflow
   */
  updateWorkflow(workflowId: string, workflow: any): Promise<any>;

  /**
   * Delete a workflow
   */
  deleteWorkflow(workflowId: string): Promise<void>;

  /**
   * List workflows
   */
  listWorkflows(): Promise<any[]>;

  /**
   * Get workflow execution
   */
  getExecution(executionId: string): Promise<any>;

  /**
   * List workflow executions
   */
  listExecutions(workflowId?: string): Promise<any[]>;
}
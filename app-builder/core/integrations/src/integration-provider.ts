import { IIntegrationProvider } from './types';

/**
 * Abstract base class for integration providers
 */
export abstract class IntegrationProvider implements IIntegrationProvider {
  protected name: string;
  protected version: string;
  protected initialized: boolean = false;

  constructor(name: string, version: string) {
    this.name = name;
    this.version = version;
  }

  /**
   * Initialize the integration provider
   */
  abstract initialize(): Promise<void>;

  /**
   * Get the provider name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Get the provider version
   */
  getVersion(): string {
    return this.version;
  }

  /**
   * Check if the provider is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Execute a workflow
   */
  abstract executeWorkflow(workflowId: string, data?: Record<string, any>): Promise<any>;

  /**
   * Get a workflow
   */
  abstract getWorkflow(workflowId: string): Promise<any>;

  /**
   * Create a workflow
   */
  abstract createWorkflow(workflow: any): Promise<any>;

  /**
   * Update a workflow
   */
  abstract updateWorkflow(workflowId: string, workflow: any): Promise<any>;

  /**
   * Delete a workflow
   */
  abstract deleteWorkflow(workflowId: string): Promise<void>;

  /**
   * List workflows
   */
  abstract listWorkflows(): Promise<any[]>;

  /**
   * Get workflow execution
   */
  abstract getExecution(executionId: string): Promise<any>;

  /**
   * List workflow executions
   */
  abstract listExecutions(workflowId?: string): Promise<any[]>;
}
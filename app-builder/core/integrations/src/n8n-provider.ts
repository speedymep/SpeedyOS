import { IntegrationProvider } from './integration-provider';
import axios from 'axios';

/**
 * n8n integration provider
 */
export class N8nProvider extends IntegrationProvider {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    super('n8n', '1.0.0');
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  /**
   * Initialize the n8n provider
   */
  async initialize(): Promise<void> {
    try {
      // Test the connection
      await this.request('GET', '/workflows');
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize n8n provider:', error);
      throw error;
    }
  }

  /**
   * Execute a workflow
   */
  async executeWorkflow(workflowId: string, data?: Record<string, any>): Promise<any> {
    return this.request('POST', `/workflows/${workflowId}/execute`, data);
  }

  /**
   * Get a workflow
   */
  async getWorkflow(workflowId: string): Promise<any> {
    return this.request('GET', `/workflows/${workflowId}`);
  }

  /**
   * Create a workflow
   */
  async createWorkflow(workflow: any): Promise<any> {
    return this.request('POST', '/workflows', workflow);
  }

  /**
   * Update a workflow
   */
  async updateWorkflow(workflowId: string, workflow: any): Promise<any> {
    return this.request('PUT', `/workflows/${workflowId}`, workflow);
  }

  /**
   * Delete a workflow
   */
  async deleteWorkflow(workflowId: string): Promise<void> {
    await this.request('DELETE', `/workflows/${workflowId}`);
  }

  /**
   * List workflows
   */
  async listWorkflows(): Promise<any[]> {
    const response = await this.request('GET', '/workflows');
    return response.data || [];
  }

  /**
   * Get workflow execution
   */
  async getExecution(executionId: string): Promise<any> {
    return this.request('GET', `/executions/${executionId}`);
  }

  /**
   * List workflow executions
   */
  async listExecutions(workflowId?: string): Promise<any[]> {
    const url = workflowId ? `/workflows/${workflowId}/executions` : '/executions';
    const response = await this.request('GET', url);
    return response.data || [];
  }

  /**
   * Make an API request to n8n
   */
  private async request(method: string, endpoint: string, data?: any): Promise<any> {
    try {
      const url = `${this.apiUrl}${endpoint}`;
      const response = await axios({
        method,
        url,
        data,
        headers: {
          'X-N8N-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`n8n API request failed: ${method} ${endpoint}`, error);
      throw error;
    }
  }
}
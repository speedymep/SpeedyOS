import { IPermission } from './types';

/**
 * Permission class for defining user permissions
 */
export class Permission implements IPermission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;

  constructor(permission: IPermission) {
    this.id = permission.id;
    this.name = permission.name;
    this.description = permission.description;
    this.resource = permission.resource;
    this.action = permission.action;
    this.conditions = permission.conditions;
  }

  /**
   * Set permission conditions
   */
  setConditions(conditions: Record<string, any>): Permission {
    this.conditions = { ...this.conditions, ...conditions };
    return this;
  }

  /**
   * Convert permission to a plain object
   */
  toJSON(): IPermission {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      resource: this.resource,
      action: this.action,
      conditions: this.conditions,
    };
  }

  /**
   * Create a permission from a plain object
   */
  static fromJSON(json: IPermission): Permission {
    return new Permission(json);
  }

  /**
   * Create a permission
   */
  static create(
    resource: string,
    action: string,
    options?: {
      id?: string;
      name?: string;
      description?: string;
      conditions?: Record<string, any>;
    }
  ): Permission {
    const id = options?.id || `${resource}:${action}`;
    const name = options?.name || `${action} ${resource}`;
    
    return new Permission({
      id,
      name,
      description: options?.description,
      resource,
      action,
      conditions: options?.conditions,
    });
  }

  /**
   * Create a read permission
   */
  static read(resource: string, options?: Partial<IPermission>): Permission {
    return Permission.create(resource, 'read', options);
  }

  /**
   * Create a create permission
   */
  static create_resource(resource: string, options?: Partial<IPermission>): Permission {
    return Permission.create(resource, 'create', options);
  }

  /**
   * Create an update permission
   */
  static update(resource: string, options?: Partial<IPermission>): Permission {
    return Permission.create(resource, 'update', options);
  }

  /**
   * Create a delete permission
   */
  static delete(resource: string, options?: Partial<IPermission>): Permission {
    return Permission.create(resource, 'delete', options);
  }

  /**
   * Create a list permission
   */
  static list(resource: string, options?: Partial<IPermission>): Permission {
    return Permission.create(resource, 'list', options);
  }

  /**
   * Create a manage permission (full access to a resource)
   */
  static manage(resource: string, options?: Partial<IPermission>): Permission {
    return Permission.create(resource, 'manage', options);
  }
}
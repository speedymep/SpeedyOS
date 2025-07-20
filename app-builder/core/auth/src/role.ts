import { IRole } from './types';

/**
 * Role class for defining user roles
 */
export class Role implements IRole {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  metadata?: Record<string, any>;

  constructor(role: IRole) {
    this.id = role.id;
    this.name = role.name;
    this.description = role.description;
    this.permissions = role.permissions || [];
    this.metadata = role.metadata || {};
  }

  /**
   * Add a permission to the role
   */
  addPermission(permissionId: string): Role {
    if (!this.permissions.includes(permissionId)) {
      this.permissions.push(permissionId);
    }
    return this;
  }

  /**
   * Remove a permission from the role
   */
  removePermission(permissionId: string): Role {
    this.permissions = this.permissions.filter(id => id !== permissionId);
    return this;
  }

  /**
   * Set role metadata
   */
  setMetadata(metadata: Record<string, any>): Role {
    this.metadata = { ...this.metadata, ...metadata };
    return this;
  }

  /**
   * Convert role to a plain object
   */
  toJSON(): IRole {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      permissions: this.permissions,
      metadata: this.metadata,
    };
  }

  /**
   * Create a role from a plain object
   */
  static fromJSON(json: IRole): Role {
    return new Role(json);
  }

  /**
   * Create an admin role
   */
  static admin(id: string = 'admin'): Role {
    return new Role({
      id,
      name: 'Administrator',
      description: 'Full access to all resources',
      permissions: ['*'],
    });
  }

  /**
   * Create a user role
   */
  static user(id: string = 'user'): Role {
    return new Role({
      id,
      name: 'User',
      description: 'Standard user access',
      permissions: [],
    });
  }

  /**
   * Create a guest role
   */
  static guest(id: string = 'guest'): Role {
    return new Role({
      id,
      name: 'Guest',
      description: 'Limited access for guests',
      permissions: [],
    });
  }
}
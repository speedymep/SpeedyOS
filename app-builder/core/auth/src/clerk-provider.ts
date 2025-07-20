import { AuthProvider } from './auth-provider';
import { IUser, IRole, IPermission } from './types';
import * as clerk from '@clerk/clerk-sdk-node';

/**
 * Clerk authentication provider
 */
export class ClerkAuthProvider extends AuthProvider {
  private apiKey: string;
  private initialized: boolean = false;
  private roles: Map<string, IRole> = new Map();
  private permissions: Map<string, IPermission> = new Map();

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  /**
   * Initialize the Clerk auth provider
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    clerk.setClerkApiKey(this.apiKey);
    this.initialized = true;
  }

  /**
   * Get the current user
   */
  async getCurrentUser(): Promise<IUser | null> {
    // Note: Clerk doesn't have a direct way to get the current user server-side
    // This would typically be done by getting the user from the session
    return null;
  }

  /**
   * Get a user by ID
   */
  async getUser(id: string): Promise<IUser | null> {
    try {
      const user = await clerk.users.getUser(id);
      return this.mapClerkUserToUser(user);
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  /**
   * Get users
   */
  async getUsers(options?: Record<string, any>): Promise<IUser[]> {
    try {
      const users = await clerk.users.getUserList(options);
      return users.map(user => this.mapClerkUserToUser(user));
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  /**
   * Create a user
   */
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      const user = await clerk.users.createUser({
        emailAddress: [userData.email as string],
        firstName: userData.firstName,
        lastName: userData.lastName,
        publicMetadata: userData.metadata,
      });
      return this.mapClerkUserToUser(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Update a user
   */
  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser> {
    try {
      const user = await clerk.users.updateUser(id, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        publicMetadata: userData.metadata,
      });
      return this.mapClerkUserToUser(user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<void> {
    try {
      await clerk.users.deleteUser(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Authenticate a user
   */
  async authenticate(credentials: Record<string, any>): Promise<IUser | null> {
    // Note: Clerk handles authentication through their frontend SDK
    // This method would typically verify a session token
    return null;
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    // Note: Clerk handles sign out through their frontend SDK
  }

  /**
   * Get roles for a user
   */
  async getUserRoles(userId: string): Promise<IRole[]> {
    try {
      const user = await clerk.users.getUser(userId);
      const roleIds = (user.publicMetadata?.roles as string[]) || [];
      return roleIds.map(id => this.roles.get(id)).filter(Boolean) as IRole[];
    } catch (error) {
      console.error('Error getting user roles:', error);
      return [];
    }
  }

  /**
   * Get permissions for a user
   */
  async getUserPermissions(userId: string): Promise<IPermission[]> {
    try {
      const roles = await this.getUserRoles(userId);
      const permissionIds = new Set<string>();
      
      roles.forEach(role => {
        role.permissions.forEach(permId => permissionIds.add(permId));
      });
      
      return Array.from(permissionIds)
        .map(id => this.permissions.get(id))
        .filter(Boolean) as IPermission[];
    } catch (error) {
      console.error('Error getting user permissions:', error);
      return [];
    }
  }

  /**
   * Assign a role to a user
   */
  async assignRole(userId: string, roleId: string): Promise<void> {
    try {
      const user = await clerk.users.getUser(userId);
      const roles = new Set((user.publicMetadata?.roles as string[]) || []);
      roles.add(roleId);
      
      await clerk.users.updateUser(userId, {
        publicMetadata: {
          ...user.publicMetadata,
          roles: Array.from(roles),
        },
      });
    } catch (error) {
      console.error('Error assigning role:', error);
      throw error;
    }
  }

  /**
   * Remove a role from a user
   */
  async removeRole(userId: string, roleId: string): Promise<void> {
    try {
      const user = await clerk.users.getUser(userId);
      const roles = new Set((user.publicMetadata?.roles as string[]) || []);
      roles.delete(roleId);
      
      await clerk.users.updateUser(userId, {
        publicMetadata: {
          ...user.publicMetadata,
          roles: Array.from(roles),
        },
      });
    } catch (error) {
      console.error('Error removing role:', error);
      throw error;
    }
  }

  /**
   * Add a role to the provider
   */
  addRole(role: IRole): void {
    this.roles.set(role.id, role);
  }

  /**
   * Add a permission to the provider
   */
  addPermission(permission: IPermission): void {
    this.permissions.set(permission.id, permission);
  }

  /**
   * Map a Clerk user to our user interface
   */
  private mapClerkUserToUser(clerkUser: clerk.User): IUser {
    return {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      firstName: clerkUser.firstName || undefined,
      lastName: clerkUser.lastName || undefined,
      fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
      metadata: clerkUser.publicMetadata as Record<string, any>,
      roles: (clerkUser.publicMetadata?.roles as string[]) || [],
      tenantId: clerkUser.publicMetadata?.tenantId as string,
      createdAt: new Date(clerkUser.createdAt),
      updatedAt: new Date(clerkUser.updatedAt),
    };
  }
}
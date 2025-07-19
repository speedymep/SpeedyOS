import { IAuthProvider, IUser, IRole, IPermission } from './types';

/**
 * Abstract base class for authentication providers
 */
export abstract class AuthProvider implements IAuthProvider {
  /**
   * Initialize the auth provider
   */
  abstract initialize(): Promise<void>;

  /**
   * Get the current user
   */
  abstract getCurrentUser(): Promise<IUser | null>;

  /**
   * Get a user by ID
   */
  abstract getUser(id: string): Promise<IUser | null>;

  /**
   * Get users
   */
  abstract getUsers(options?: Record<string, any>): Promise<IUser[]>;

  /**
   * Create a user
   */
  abstract createUser(userData: Partial<IUser>): Promise<IUser>;

  /**
   * Update a user
   */
  abstract updateUser(id: string, userData: Partial<IUser>): Promise<IUser>;

  /**
   * Delete a user
   */
  abstract deleteUser(id: string): Promise<void>;

  /**
   * Authenticate a user
   */
  abstract authenticate(credentials: Record<string, any>): Promise<IUser | null>;

  /**
   * Sign out the current user
   */
  abstract signOut(): Promise<void>;

  /**
   * Get roles for a user
   */
  abstract getUserRoles(userId: string): Promise<IRole[]>;

  /**
   * Get permissions for a user
   */
  abstract getUserPermissions(userId: string): Promise<IPermission[]>;

  /**
   * Assign a role to a user
   */
  abstract assignRole(userId: string, roleId: string): Promise<void>;

  /**
   * Remove a role from a user
   */
  abstract removeRole(userId: string, roleId: string): Promise<void>;

  /**
   * Check if a user has a role
   */
  hasRole(user: IUser, role: string): boolean {
    return user.roles?.includes(role) || false;
  }

  /**
   * Check if a user has a permission
   */
  hasPermission(user: IUser, permission: string): boolean {
    return user.permissions?.includes(permission) || false;
  }
}
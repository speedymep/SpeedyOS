/**
 * User interface
 */
export interface IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  metadata?: Record<string, any>;
  roles?: string[];
  permissions?: string[];
  tenantId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Role interface
 */
export interface IRole {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  metadata?: Record<string, any>;
}

/**
 * Permission interface
 */
export interface IPermission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

/**
 * Authentication provider interface
 */
export interface IAuthProvider {
  /**
   * Initialize the auth provider
   */
  initialize(): Promise<void>;

  /**
   * Get the current user
   */
  getCurrentUser(): Promise<IUser | null>;

  /**
   * Get a user by ID
   */
  getUser(id: string): Promise<IUser | null>;

  /**
   * Get users
   */
  getUsers(options?: Record<string, any>): Promise<IUser[]>;

  /**
   * Create a user
   */
  createUser(userData: Partial<IUser>): Promise<IUser>;

  /**
   * Update a user
   */
  updateUser(id: string, userData: Partial<IUser>): Promise<IUser>;

  /**
   * Delete a user
   */
  deleteUser(id: string): Promise<void>;

  /**
   * Authenticate a user
   */
  authenticate(credentials: Record<string, any>): Promise<IUser | null>;

  /**
   * Sign out the current user
   */
  signOut(): Promise<void>;

  /**
   * Check if a user has a role
   */
  hasRole(user: IUser, role: string): boolean;

  /**
   * Check if a user has a permission
   */
  hasPermission(user: IUser, permission: string): boolean;

  /**
   * Get roles for a user
   */
  getUserRoles(userId: string): Promise<IRole[]>;

  /**
   * Get permissions for a user
   */
  getUserPermissions(userId: string): Promise<IPermission[]>;

  /**
   * Assign a role to a user
   */
  assignRole(userId: string, roleId: string): Promise<void>;

  /**
   * Remove a role from a user
   */
  removeRole(userId: string, roleId: string): Promise<void>;
}
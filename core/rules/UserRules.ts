// Business rules and invariants for User entity
import { User } from '../User';

export class UserRules {
  static validateRequiredFields(user: Partial<User>): string[] {
    const errors: string[] = [];
    if (!user.name) errors.push('User name is required.');
    if (!user.email) errors.push('Email is required.');
    if (!user.role) errors.push('Role is required.');
    return errors;
  }
}

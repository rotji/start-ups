// Stack-agnostic interface for User repository
import { User } from '../User';

export interface UserRepository {
  create(user: User): Promise<User>;
  update(id: string, updates: Partial<User>): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filter?: Partial<User>): Promise<User[]>;
  delete(id: string): Promise<boolean>;
}

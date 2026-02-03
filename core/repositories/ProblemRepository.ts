// Stack-agnostic interface for Problem repository
import { Problem } from '../Problem';

export interface ProblemRepository {
  create(problem: Problem): Promise<Problem>;
  update(id: string, updates: Partial<Problem>): Promise<Problem | null>;
  findById(id: string): Promise<Problem | null>;
  findAll(filter?: Partial<Problem>): Promise<Problem[]>;
  delete(id: string): Promise<boolean>;
}

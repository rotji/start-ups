// Stack-agnostic interface for Startup repository
import { Startup } from '../Startup';

export interface StartupRepository {
  create(startup: Startup): Promise<Startup>;
  update(id: string, updates: Partial<Startup>): Promise<Startup | null>;
  findById(id: string): Promise<Startup | null>;
  findAll(filter?: Partial<Startup>): Promise<Startup[]>;
  delete(id: string): Promise<boolean>;
}

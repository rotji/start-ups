// Business rules and invariants for Startup entity
import { Startup } from '../Startup';

export class StartupRules {
  static validateRequiredFields(startup: Partial<Startup>): string[] {
    const errors: string[] = [];
    if (!startup.name) errors.push('Startup name is required.');
    if (!startup.description) errors.push('Description is required.');
    if (!startup.categories || startup.categories.length === 0) errors.push('At least one category is required.');
    if (!startup.problems || startup.problems.length === 0) errors.push('At least one problem is required.');
    if (!startup.stage) errors.push('Stage is required.');
    if (!startup.team || startup.team.length === 0) errors.push('At least one team member is required.');
    if (!startup.createdBy) errors.push('CreatedBy (user) is required.');
    return errors;
  }

  static isValidStage(stage: string): boolean {
    return ['idea', 'mvp', 'traction', 'revenue'].includes(stage);
  }

  static normalizeName(name: string): string {
    return name.trim();
  }
}

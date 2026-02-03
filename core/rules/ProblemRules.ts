// Business rules and invariants for Problem entity
import { Problem } from '../Problem';

export class ProblemRules {
  static validateRequiredFields(problem: Partial<Problem>): string[] {
    const errors: string[] = [];
    if (!problem.title) errors.push('Problem title is required.');
    if (!problem.description) errors.push('Description is required.');
    return errors;
  }
}

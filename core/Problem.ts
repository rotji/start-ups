// Stack-agnostic domain model for Problem
export interface Problem {
  id: string;
  title: string;
  description: string;
  startups: string[]; // Array of Startup IDs
  createdAt: Date;
  updatedAt: Date;
}

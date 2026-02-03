// Stack-agnostic domain model for Investor (extends User)
import { User } from './User';

export interface Investor extends User {
  interests: string[]; // Problem or category IDs
  savedStartups: string[]; // Startup IDs
  notificationsEnabled: boolean;
}

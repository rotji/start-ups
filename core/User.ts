// Stack-agnostic domain model for User
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'founder' | 'investor';
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Stack-agnostic domain model for Startup
export interface Startup {
  id: string;
  name: string;
  description: string;
  categories: string[];
  problems: string[];
  stage: 'idea' | 'mvp' | 'traction' | 'revenue';
  team: TeamMember[];
  fundingNeeds: string;
  pitchDeckUrl?: string;
  pitchVideoUrl?: string;
  demoUrl?: string;
  traction?: string;
  createdBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  linkedinUrl?: string;
}

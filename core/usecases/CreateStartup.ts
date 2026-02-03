// Use-case interface and base logic for creating a Startup
import { Startup } from '../Startup';

export interface CreateStartupInput {
  name: string;
  description: string;
  categories: string[];
  problems: string[];
  stage: 'idea' | 'mvp' | 'traction' | 'revenue';
  team: { name: string; role: string; bio?: string; linkedinUrl?: string }[];
  fundingNeeds: string;
  pitchDeckUrl?: string;
  pitchVideoUrl?: string;
  demoUrl?: string;
  traction?: string;
  createdBy: string;
}

export interface CreateStartupOutput {
  startupId: string;
}

export interface ICreateStartupUseCase {
  execute(input: CreateStartupInput): Promise<CreateStartupOutput>;
}

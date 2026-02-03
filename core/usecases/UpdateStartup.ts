// Use-case interface for updating a Startup
export interface UpdateStartupInput {
  startupId: string;
  fieldsToUpdate: Partial<{
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
  }>;
}

export interface UpdateStartupOutput {
  success: boolean;
}

export interface IUpdateStartupUseCase {
  execute(input: UpdateStartupInput): Promise<UpdateStartupOutput>;
}

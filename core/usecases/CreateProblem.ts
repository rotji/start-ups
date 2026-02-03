// Use-case interface for creating a Problem
export interface CreateProblemInput {
  title: string;
  description: string;
}

export interface CreateProblemOutput {
  problemId: string;
}

export interface ICreateProblemUseCase {
  execute(input: CreateProblemInput): Promise<CreateProblemOutput>;
}

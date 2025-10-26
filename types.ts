
export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface DiagnosisResult {
  type: string;
  comment: string;
  nextStep: string;
}

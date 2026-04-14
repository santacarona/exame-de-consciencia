
export type UserType = 'child' | 'youth' | 'adult' | 'priest' | 'general';

export interface Question {
  id: number;
  text: string;
  category?: string; // e.g., "Ten Commandments", "Church Precepts"
}

export type AppStage = 'intro' | 'instructions' | 'confession-guide' | 'preparation' | 'exam' | 'results';

export interface ExamState {
  currentQuestionIndex: number;
  accusedSins: string[]; // Stores the text of the sins admitted
}

export enum ProficiencyLevel {
  CHILD = 'Dítě (obrázkové)',
  BEGINNER = 'Začátečník (A1)',
  INTERMEDIATE = 'Mírně pokročilý (A2/B1)',
  ADVANCED = 'Pokročilý (B2+)'
}

export interface VocabularyItem {
  english: string;
  czech: string;
  visualDescription: string;
  emoji?: string; // Used for predefined instant topics
}

export interface VocabularyResponse {
  items: VocabularyItem[];
}

export interface PredefinedTopic {
  id: string;
  label: string;
  icon: string;
  color: string;
  items: VocabularyItem[];
}
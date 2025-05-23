export interface Quiz {
  id: string;
  userId: string;
  date: string;
  answers: number[];
  note?: string;
  mainEmotion?: string;
}
import { Message } from "./message";

export interface Chat {
  id: string;
  userId: string;
  messages: Message[];
  createdAt: string;
}
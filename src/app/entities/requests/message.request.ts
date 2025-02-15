import { Status } from "../models/status"

export interface MessageRequest  {
  userId: string
  chatId: string
  body: string
  type: string
}

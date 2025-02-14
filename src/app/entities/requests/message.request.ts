import { Status } from "../models/status"

export interface MessageRequest  {
  userId: number
  chatId: number
  body: string
  type: string
}

import { Status } from "../models/status"

export type MessageRequest = {
    userId: string
    chatId: string
    body: string
  type: string
}

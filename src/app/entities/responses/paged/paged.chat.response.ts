import {ChatResponse} from "../chat.response";
import {PageData} from "./page.data";

export type PagedChatResponse = {
  content: ChatResponse[]
  pageSize: number
  pageNumber: number
  totalRecords: number
  totalPages: number
}

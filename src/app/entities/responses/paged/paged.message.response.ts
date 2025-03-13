import {MessageResponse} from "../message.response";

export type PagedMessageResponse = {
  content: MessageResponse[]
  pageSize: number
  pageNumber: number
  totalRecords: number
  totalPages: number
}

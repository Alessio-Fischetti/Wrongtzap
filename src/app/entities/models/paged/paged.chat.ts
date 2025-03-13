
import {PageData} from "../../responses/paged/page.data";
import {Chat} from "../chat";

export type PagedChat = {
  content: Chat[]
  pageSize: number
  pageNumber: number
  totalRecords: number
  totalPages: number
}

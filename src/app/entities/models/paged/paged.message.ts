import {Message} from "../message";
import {PageData} from "../../responses/paged/page.data";

export type PagedMessage = {
  content: Message[]
  pageSize: number
  pageNumber: number
  totalRecords: number
  totalPages: number
}

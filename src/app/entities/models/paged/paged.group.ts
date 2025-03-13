import {Group} from "../group";
import {PageData} from "../../responses/paged/page.data";

export type PagedGroup = {
  content: Group[]
  pageSize: number
  pageNumber: number
  totalRecords: number
  totalPages: number
}

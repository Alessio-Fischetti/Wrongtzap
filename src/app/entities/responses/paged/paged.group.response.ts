import {Group} from "../../models/group";
import {GroupResponse} from "../group.response";
import {PageData} from "./page.data";

export type PagedGroupResponse = {
  content: GroupResponse[]
  pageSize: number
  pageNumber: number
  totalRecords: number
  totalPages: number
}

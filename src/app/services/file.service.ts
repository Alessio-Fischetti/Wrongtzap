import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../config/environments/environment";
import {firstValueFrom} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  uploadFile(file: File, entityId: string, entityType: string) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('entityId', entityId.toString());
    formData.append('entityType', entityType);

    formData.forEach((item) => console.log(item))
    console.log(formData)

    this.http.post(`${environment.apiUrl}/files/upload`, formData).subscribe()
  }
  async downloadFile(entityId: string, entityType: string): Promise<File> {
    const blob = await firstValueFrom( this.http.post(`${environment.apiUrl}/files/download`,
      { entityId: entityId, entityType: entityType },
      { responseType: 'blob' }
    ))
    return new File([blob], `${entityType}File`, { type: blob.type });
  }
}

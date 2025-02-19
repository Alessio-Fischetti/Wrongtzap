import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {environment} from "../config/environments/environment";
import {firstValueFrom, ReplaySubject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  public medias: WritableSignal<Map<string, Map<string,Blob>>> = signal(new Map<string, Map<string, Blob>>())
  // Map<ChatID, Map<MessageID, BLOB>>

  uploadFile(file: File, entityId: string, entityType: string) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('entityId', entityId.toString());
    formData.append('entityType', entityType);

    formData.forEach((item) => console.log(item))
    console.log(formData)

    return this.http.post(`${environment.apiUrl}/files/upload`, formData)
  }
  async downloadFile(entityId: string, entityType: string): Promise<File> {
    const blob = await firstValueFrom( this.http.post(`${environment.apiUrl}/files/download`,
      { entityId: entityId, entityType: entityType },
      { responseType: 'blob' }
    ))
    return new File([blob], `${entityType}File`, { type: blob.type });
  }

}



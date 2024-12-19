import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../config/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  uploadFile(file: File, entityId: string, entityType: string) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('entityId', entityId);
    formData.append('entityType', entityType);

    this.http.post(`${environment.apiUrl}/files/upload`, formData).subscribe()
  }

  downloadFile() {
    const response = {
      bucketName: "files",
      filePath: "test.jpg",
    }

   this.http.post<Blob>(
     'http://localhost:8080/files/download',
     JSON.stringify(response),
     {responseType: "blob" as "json" ,headers: new HttpHeaders({"accept": "application/octect-stream"})}).subscribe(
     res => {
       const file = new File([res], "test.jpg");
       const link = document.createElement("a");
       link.href = URL.createObjectURL(file);
       link.download = file.name
       link.click();
       URL.revokeObjectURL(link.href);

     }
   )
  }
}

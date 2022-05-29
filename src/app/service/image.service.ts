import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:8080/api/v1/images/';

  getPostImages(permalink: number): Observable<any> {
    return this.httpClient.get(this.url + 'post-images/' + permalink);
  }

  previewImages(previews: string[], request: FormData, event: any) {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles[0]) {
      const numberOfFiles = selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          previews.push(e.target.result);
        };
        reader.readAsDataURL(selectedFiles[i]);

        request.append('file', selectedFiles[i])
      }
    }
  }
}

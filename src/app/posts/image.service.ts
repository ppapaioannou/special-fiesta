import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PostPayload} from "./post-payload";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:8080/api/v1/images/';

  getPostImages(permalink: Number): Observable<any> {
    return this.httpClient.get(this.url + 'post-images/' + permalink);
  }
}

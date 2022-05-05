import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostPayload} from "./post-payload";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:8080/api/v1/posts/';

  constructor(private httpClient: HttpClient) {
  }

  addPost(request: PostPayload, images: FormData) {
    return this.httpClient.post(this.url + 'new-post/' + request.postType, images);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>(this.url + 'all');
  }

  getPost(permalink: Number):Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(this.url + 'view/' + permalink);
  }

}

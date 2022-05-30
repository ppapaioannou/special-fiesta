import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CommentPayload} from "../payload/comment-payload";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = 'http://localhost:8080/api/v1/comment/';

  constructor(private httpClient: HttpClient) { }

  addComment(postId: Number, body: CommentPayload) {
    return this.httpClient.post(this.url, body);
  }

  getAllComments(postId: Number): Observable<Array<CommentPayload>> {
    return this.httpClient.get<Array<CommentPayload>>(this.url + 'post/' + postId + '/all');
  }
}

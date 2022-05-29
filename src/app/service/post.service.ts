import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostPayload} from "../payload/post-payload";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:8080/api/v1/posts/';

  private orderBy = "date" //default sorting
  private filter = "";

  constructor(private httpClient: HttpClient) {
  }

  setFilterCriteria(filter: string, orderBy: string) {
    this.filter = filter;
    this.orderBy = orderBy;
  }

  getOrderBy(): string {
    return this.orderBy;
  }

  addPost(request: FormData, postType: string) {
    return this.httpClient.post(this.url + 'add-post/' + postType, request);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    let filter = this.url + 'all?search=(postType!event' + this.filter + ")";
    console.log(filter)
    return this.httpClient.get<Array<PostPayload>>(filter);
  }

  getAllUserPosts(userId: string, organization: boolean): Observable<Array<PostPayload>> {
    let filter = this.url + 'all?search=(user.id:' + userId;
    if (organization) {
      filter += ' AND postType!adoption)';
    }
    else {
      filter += ')';
    }

    return this.httpClient.get<Array<PostPayload>>(filter);
  }

  getAllFosterPosts(userId: string): Observable<Array<PostPayload>> {
    let filter = this.url + 'all?search=(user.id:' + userId + ' AND postType:adoption)';

    return this.httpClient.get<Array<PostPayload>>(filter);
  }

  getAllEvents(): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>(this.url + 'all?search=postType:event');
  }

  getPost(permalink: Number):Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(this.url + 'view/' + permalink);
  }

  willAttendEvent(permalink: Number) {
    return this.httpClient.put(this.url + "event/" + permalink + "/attend", "");
  }

  willNotAttendEvent() {

  }

  deletePost(postId: string) {
    return this.httpClient.delete(this.url + 'delete/' + postId);
  }
}

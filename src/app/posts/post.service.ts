import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostPayload} from "./post-payload";
import {map, Observable} from "rxjs";

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

  addPost(request: PostPayload, images: FormData) {
    return this.httpClient.post(this.url + 'new-post/' + request.postType, images);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    let filter = this.url + 'all?search=(postType!event' + this.filter + ")";
    console.log(filter)
    /*
    this.httpClient.get<Array<PostPayload>>(filter).pipe(
      map(values => {
        values.sort((a,b) => a.distance.localeCompare(b.distance));
        console.log(values)
        return values;
      })
    );
    */
    return this.httpClient.get<Array<PostPayload>>(filter);
  }

  getAllEvents(): Observable<Array<PostPayload>> {
    console.log(this.url + 'all?search=postType:event' + this.filter)
    return this.httpClient.get<Array<PostPayload>>(this.url + 'all?search=postType:event' + this.filter);
  }

  getPost(permalink: Number):Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(this.url + 'view/' + permalink);
  }

  willAttendEvent(permalink: Number) {
    return this.httpClient.put(this.url + "event/" + permalink + "/attend", "");
  }

  willNotAttendEvent() {

  }

}

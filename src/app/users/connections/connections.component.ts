import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PostPayload} from "../../posts/post-payload";
import {UserPayload} from "../user-payload";
import {PostService} from "../../posts/post.service";
import {ConnectionService} from "../connection.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  friendRequests!: Observable<Array<UserPayload>>;
  friends!: Observable<Array<UserPayload>>;
  organizations!: Observable<Array<UserPayload>>;

  constructor(private connectionService: ConnectionService, private router: Router) { }

  ngOnInit(): void {
    this.friendRequests = this.connectionService.getAllFriendRequests();
    this.friends = this.connectionService.getAllFriends();
    this.organizations = this.connectionService.getAllOrganizations();
  }

  acceptFriendRequest(userId: string) {
    //this.connectionService.acceptConnection(userId);
    this.connectionService.acceptConnection(userId).subscribe({
      complete: () => {
        console.log('friend request accepted successfully')
      }, error: () => {
        console.log('friend request accept failed')
      }, next: () => {
        //this.router.navigateByUrl('connections').then(() => console.log('reloading page'))
        window.location.reload();
      }
    });
  }

  declineFriendRequest() {
    //this.connectionService.acceptConnection(userId);
  }

}

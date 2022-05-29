import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserPayload} from "../../payload/user-payload";
import {ConnectionService} from "../../service/connection.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  friendRequests!: Observable<Array<UserPayload>>;
  friends!: Observable<Array<UserPayload>>;
  organizations!: Observable<Array<UserPayload>>;

  followers!: Observable<Array<UserPayload>>;

  accountType: string;

  constructor(private connectionService: ConnectionService, private authService: AuthService) {
    this.accountType = authService.getUserRole();
  }

  ngOnInit(): void {
    if (this.accountType == 'INDIVIDUAL') {
      this.friendRequests = this.connectionService.getAllFriendRequests();
      this.friends = this.connectionService.getAllFriends();
      this.organizations = this.connectionService.getAllOrganizations();
    }
    else if (this.accountType == 'ORGANIZATION') {
      this.followers = this.connectionService.getAllFollowers();
    }
  }

  acceptFriendRequest(userId: string) {
    this.connectionService.acceptConnection(userId).subscribe({
      next: () => {
        console.log('friend request accepted successfully')
        window.location.reload();
      },
      error: () => {
        console.log('friend request accept failed')
      }
    });
  }

  declineFriendRequest() {
    //this.connectionService.acceptConnection(userId);
  }

}

import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserPayload} from "../../payload/user-payload";
import {ConnectionService} from "../../service/connection.service";
import {AuthService} from "../../service/auth.service";
import {ConnectionPayload} from "../../payload/connection-payload";

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  friendRequests!: Observable<Array<ConnectionPayload>>;
  friends!: Observable<Array<ConnectionPayload>>;
  organizations!: Observable<Array<ConnectionPayload>>;

  followers!: Observable<Array<ConnectionPayload>>;

  accountType: string;

  constructor(private connectionService: ConnectionService, private authService: AuthService) {
    this.accountType = authService.getUserRole();
  }

  ngOnInit(): void {
    if (this.accountType == 'INDIVIDUAL') {
      this.friendRequests = this.connectionService.getAllConnections('friend-requests');
      this.friends = this.connectionService.getAllConnections('friends');
      this.organizations = this.connectionService.getAllConnections('organizations');
    }
    else if (this.accountType == 'ORGANIZATION') {
      this.followers = this.connectionService.getAllConnections('followers');
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

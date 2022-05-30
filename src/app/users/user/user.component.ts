import { Component, OnInit } from '@angular/core';
import {PostPayload} from "../../payload/post-payload";
import {UserService} from "../../service/user.service";
import {UserPayload} from "../../payload/user-payload";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {ConnectionService} from "../../service/connection.service";
import {Observable} from "rxjs";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserPayload;
  permalink!: Number;
  isConnectedTo = false;
  connectionInProgress = false;

  posts!: Observable<Array<PostPayload>>;
  fosters!: Observable<Array<PostPayload>>;

  constructor(private aRoute: ActivatedRoute, private userService: UserService,
              public authService: AuthService, private connectionService: ConnectionService,
              private postService: PostService) {
    this.user = {
      accountType: "",
      communityStanding: "",
      contactEmail: "",
      dateOfBirth: "",
      description: "",
      email: "",
      facebookPageUrl: "",
      id: "",
      lastName: "",
      name: "",
      organizationNeeds: "",
      phoneNumber: "",
      profileImage: undefined,
      websiteUrl: ""
    }
  }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      this.permalink = params['id'];
    });

    this.userService.getUser(this.permalink).subscribe({
      next: (data:UserPayload) => {
        this.user = data;
        this.connectionService.isConnectedTo(this.user.id).subscribe((data:boolean) => {
          this.isConnectedTo = data;
          this.connectionInProgress = data;
        });
        if (this.user.accountType == "INDIVIDUAL") {
          this.posts = this.postService.getAllUserPosts(this.user.id, false);
        }
        else if (this.user.accountType == "ORGANIZATION") {
          this.posts = this.postService.getAllUserPosts(this.user.id, true);
          this.fosters = this.postService.getAllFosterPosts(this.user.id)
        }
      },
      error: () => {
        console.log('Failure Response')
      }
    });
  }

  connect() {
    this.connectionService.connect(this.user.id).subscribe({
      next: () => {
        console.log('connection request sent successfully')
        window.location.reload();
      },
      error: () => {
        console.log('connection request failed')
      }
    });
  }

  deleteConnection() {
    this.connectionService.deleteConnection(this.user.id).subscribe({
      next: () => {
        console.log('connection deleted successfully')
        window.location.reload();
        //this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
      },
      error: () => {
        console.log('connection deletion failed')
      }
    });
  }

  commend() {

  }

  editPost() {

  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        console.log('post deleted successfully')
        window.location.reload();
        //this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
      },
      error: () => {
        console.log('post deletion failed')
      }
    });
  }

}

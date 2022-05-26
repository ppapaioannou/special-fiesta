import { Component, OnInit } from '@angular/core';
import {PostPayload} from "../../posts/post-payload";
import {UserService} from "../user.service";
import {UserPayload} from "../user-payload";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {ConnectionService} from "../connection.service";
import {Observable} from "rxjs";
import {PostService} from "../../posts/post.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserPayload;
  permalink!: Number;
  isConnectedTo = false;

  posts!: Observable<Array<PostPayload>>;
  fosters!: Observable<Array<PostPayload>>;

  constructor(private aRoute: ActivatedRoute, private userService: UserService,
              public authService: AuthService, public connectionService: ConnectionService, public postService: PostService) {
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
      error: () => {
        console.log('Failure Response')
      }, next: (data:UserPayload) => {
        this.user = data;
        this.connectionService.isConnectedTo(this.user.id).subscribe((data:boolean) => {
          this.isConnectedTo = data
        });
        if (this.user.accountType == "INDIVIDUAL") {
          this.posts = this.postService.getAllUserPosts(this.user.id, false);
        }
        else if (this.user.accountType == "ORGANIZATION") {
          this.posts = this.postService.getAllUserPosts(this.user.id, true);
          this.fosters = this.postService.getAllFosterPosts(this.user.id)
        }

      }
    });

  }

  connect() {
    this.connectionService.connect(this.user.id).subscribe({
      complete: () => {
        console.log('connection request sent successfully')
      }, error: () => {
        console.log('connection request failed')
      }, next: () => {
        window.location.reload();
      }
    });
  }

  deleteConnection() {
    this.connectionService.deleteConnection(this.user.id).subscribe({
      complete: () => {
        console.log('connection deleted successfully')
      }, error: () => {
        console.log('connection deletion failed')
      }, next: () => {
        window.location.reload();
        //this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
      }
    });
  }

  commend() {

  }

  editPost() {

  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe({
      complete: () => {
        console.log('post deleted successfully')
      }, error: () => {
        console.log('post deletion failed')
      }, next: () => {
        window.location.reload();
        //this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
      }
    });

  }


}

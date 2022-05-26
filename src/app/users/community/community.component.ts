import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserPayload} from "../user-payload";
import {UserService} from "../user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {PostPayload} from "../../posts/post-payload";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  inviteForm: FormGroup;
  email = new FormControl('')
  sent = false;

  individuals!: Observable<Array<UserPayload>>;
  organizations!: Observable<Array<UserPayload>>;

  constructor(private userService: UserService) {
    this.inviteForm = new FormGroup({
      email: this.email
    });
  }

  ngOnInit(): void {
    this.individuals = this.userService.getAllUsers("INDIVIDUAL", true, "");
    this.organizations = this.userService.getAllUsers("ORGANIZATION", true, "");
  }

  invite() {
    if (this.email.value != "") {
      this.userService.inviteFriend(this.email.value).subscribe({
        complete: () => {
          this.sent = true;
          console.log('invitation sent successfully')
        }, error: () => {
          this.sent = false;
          console.log('invitation failed')
        }, next: () => {
          console.log("next")
        }
      });
    }
    else {
      this.sent = false;
    }
  }

}

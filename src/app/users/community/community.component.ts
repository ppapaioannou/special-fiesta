import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserPayload} from "../../payload/user-payload";
import {UserService} from "../../service/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  individualsPage: boolean;
  organizationsPage: boolean;
  header!: string

  inviteForm: FormGroup;
  email = new FormControl('')
  sent = false;

  individuals!: Observable<Array<UserPayload>>;
  organizations!: Observable<Array<UserPayload>>;
  all!: Observable<Array<UserPayload>>;

  searchForm: FormGroup;
  searchInput = new FormControl('')
  userType!: string;

  constructor(private userService: UserService, private router: Router) {
    this.individualsPage = router.url.includes('individuals')
    this.organizationsPage = router.url.includes('organizations')

    if (this.individualsPage) {
      this.userType = 'INDIVIDUAL'
      this.header = 'Individuals'
    }
    else if (this.organizationsPage) {
      this.userType = 'ORGANIZATION'
      this.header = 'Organizations'
    }

    this.inviteForm = new FormGroup({
      email: this.email
    });

    this.searchForm = new FormGroup({
      searchInput: this.searchInput
    });
  }

  ngOnInit(): void {
    if (this.individualsPage || this.organizationsPage) {
      this.all = this.userService.getAllUsers(this.userType, false, "");
    }

    if (!(this.individualsPage || this.organizationsPage)) {
      this.individuals = this.userService.getAllUsers("INDIVIDUAL", true, "");
      this.organizations = this.userService.getAllUsers("ORGANIZATION", true, "");
    }

  }

  invite() {
    if (this.email.value != "") {
      this.userService.inviteFriend(this.email.value).subscribe({
        next: () => {
          this.sent = true;
          console.log('invitation sent successfully')
        },
        error: () => {
          this.sent = false;
          console.log('invitation failed')
        }
      });
    }
    else {
      this.sent = false;
    }
  }

  search() {
    let combined = ""
    if (this.searchInput.value != "") {
      for (const name of this.searchInput.value.split(" ")) {
        combined += "name:*" + name + "* OR "
      }
      // delete the last OR
      if (combined.length != 0) {
        combined = "(" + combined.slice(0,-4) + ")"
      }
      console.log(combined)
      this.all = this.userService.getAllUsers(this.userType, false, combined);
    }
    else {
      this.all = this.userService.getAllUsers(this.userType, false, "");
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {
  email: string;

  constructor(private route: ActivatedRoute) {
    this.email = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.email = params['email']);
  }

}

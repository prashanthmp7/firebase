import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../../providers/angular-fire.service';
import { User } from 'src/app/providers/user';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  user: User;
  constructor(private afService: AngularFireService) { }

  ngOnInit() {
    this.afService.user$.subscribe(user => this.user = user);
  }

  login() {
    this.afService.loginWithGoogle();
  }
}

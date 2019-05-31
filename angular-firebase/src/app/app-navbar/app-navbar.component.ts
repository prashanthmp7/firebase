import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../providers/angular-fire.service';
import { User } from '../providers/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  user: User;
  constructor(private afService: AngularFireService) { }

  ngOnInit() {
    this.afService.user$.subscribe(user => this.user = user);
  }
}

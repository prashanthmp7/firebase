import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'pages-list', 
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css']
})
export class PagesListComponent implements OnInit {
  pageObservable: Observable<any[]>;
  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.pageObservable = this.getPages('/pages');
  }

  getPages(listPath: string): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }
}

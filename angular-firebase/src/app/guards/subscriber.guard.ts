import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireService } from '../providers/angular-fire.service';
import { tap, map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SubscriberGuard implements CanActivate {
  constructor(private afService: AngularFireService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afService.user$.pipe(
      take(1),
      map(user => user && user.roles.subscriber ? true : false),
      tap( subscriber => {
        if (!subscriber) {
          console.error('Access denied- subscriber only');
        }
      })
    );
  }
}
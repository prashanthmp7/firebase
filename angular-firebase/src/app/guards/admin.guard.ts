import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireService } from '../providers/angular-fire.service';
import { tap, map, take} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private afService: AngularFireService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afService.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false),
      tap( isAdmin => {
        if (!isAdmin) {
          console.error('Access denied- Admins only');
        }
      })
    );
  }
}

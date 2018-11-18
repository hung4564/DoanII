import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'app/services/user-service.service';
@Injectable({
  providedIn: 'root'
})
export class PlayboardGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) { };

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._userService.isLogin()) {
      return true;
    }
    this._router.navigate(['/']);
    return false;
  }
}

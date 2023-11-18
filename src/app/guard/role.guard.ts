import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CryptoService } from '../services/crypto.service';
import { Routing } from '../Routes/app-routes';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private _CryptoService: CryptoService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let data = JSON.parse(this._CryptoService.decryptionAES(localStorage.getItem('data') || ''))
    if (data.role != 'admin') {
      this.router.navigate([`${Routing.main.module}/${Routing.main.children.home}/${Routing.main.children.userDetails}/1`])
      return false;
    }
    return true;
  }

}

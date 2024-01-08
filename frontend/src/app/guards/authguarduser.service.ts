import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguarduserService implements CanActivate{

  constructor(private router : Router,private jwt : JwtHelperService,private snack : MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('Authorization');

    if(token && !this.jwt.isTokenExpired(token) && (this.jwt.decodeToken(token).Authority == '[USER]' ||  this.jwt.decodeToken(token).Authority == '[ADMIN]')){
        return true;
    }

    this.router.navigate(['login'])
    return false;


  }
}

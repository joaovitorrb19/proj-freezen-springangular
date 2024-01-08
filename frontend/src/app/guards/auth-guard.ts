import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";

    @Injectable({
        providedIn:'root'
    })

    export class AuthGuardAdmin implements CanActivate{

        constructor(private router: Router, private JwtHelperService : JwtHelperService){

        }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = localStorage.getItem("Authorization");

        var teste = this.JwtHelperService.decodeToken(token!);
        

        if(token && !this.JwtHelperService.isTokenExpired(token) && teste.Authority == '[ADMIN]') {
                return true;
        }

        this.router.navigate(['login'])
        return false;
    }


}

import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "../../services/session.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor (
        private router: Router,
        private session: SessionService){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const isAuthorized = this.session.isAuthorized()
        if(isAuthorized)
            return true
        else {
            this.router.navigate(["/login"])
            return false
        }
    }
}

import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "../services/session.service";

export const isUserAuthorized: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    //TODO    
    return inject(SessionService).isAuthorized()
}
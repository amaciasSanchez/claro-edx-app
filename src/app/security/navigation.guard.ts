import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
    providedIn: "root"
})
export class NavigationGuard implements CanActivate{


    constructor(public router: Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean> {
        return new Promise((resolve, reject) => {
            
            return resolve(true);
        });
    }

}
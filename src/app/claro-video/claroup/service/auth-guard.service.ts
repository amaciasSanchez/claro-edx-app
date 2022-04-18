import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { OAuthService } from 'angular-oauth2-oidc';
@Injectable()
export class AuthGuardService /*extends KeycloakAuthGuard*/ implements CanActivate {
    constructor(public router: Router,
        protected authService: OAuthService) {
         }

    
    canActivate(route: ActivatedRouteSnapshot):Promise<boolean> {
        return new Promise((resolve, reject) => {

            if(route.url.length != 0){
                if(route.url[0].path === 'update-password'){
                    const profile = sessionStorage.getItem('profile');                    
                    if(profile == null){
                        this.router.navigate(['login']);
                        return reject(false);
                    }                    
                    return resolve(true);
                }
            }

            if (!this.authService.hasValidAccessToken()) {

                /*
                this.authService.refreshToken().then(() => resolve(true))
                .catch(() => {
                    console.log('Error al refrescar token');                    
                    this.router.navigate(['login']);
                    return reject(false);
                });
                */

              //this.authService.logOut();
               this.router.navigate(['login']);
               return reject(false);
            }

            
            //let roles = JSON.stringify(this.authService.getIdentityClaims()["realm_accessy"]);
            

            //console.log('Roles '+roles);
            /*
            let rolObject = JSON.parse(roles);
            rolObject["roles"].map(rol => {
                console.log(rol)
            });*/

            return resolve(true);
        });
    }
}

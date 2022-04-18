import { HttpInterceptor, HttpEvent, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Optional, Injectable } from '@angular/core';
import { ModalMessageService } from '../modal-message/modal-message.service';
import { KeycloakService } from 'keycloak-angular';
import { OAuthStorage, OAuthModuleConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authStorage: OAuthStorage,
       @Optional() private moduleConfig: OAuthModuleConfig,
       private errorDialogService: ModalMessageService,
       private oauthService: OAuthService,
       private router: Router){

       }

    private checkUrl(url: string): boolean {
        return !!this.moduleConfig.resourceServer
                .allowedUrls.find(URI => url.startsWith(URI));
    }

    intercept(req: HttpRequest<any>, 
              next: HttpHandler): Observable<HttpEvent<any>> {
   
    let url = req.url;

    

    if(!this.checkUrl(url)) return next.handle(req);

    if(!this.oauthService.hasValidAccessToken()){
        this.router.navigate(['login']);
        return of();
    }

    let accessToken = this.authStorage.getItem('access_token');
    
    
    req = req.clone({
        setHeaders: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
            console.log('Se retorna respuesta '+req.url+ ' '+ JSON.stringify(event));
            return event;
        }), catchError(response => {

            let errorMesage = response;

            if(response instanceof HttpErrorResponse && response.status === 403){
            
                console.error('No autorizado');
                this.errorDialogService.sendMessage('Ud. no se encuentra autorizado para realizar la acción');
                let errorResponse = {
                    code: response.status,
                    message: 'Usuario no autorizado',
                    description: response.statusText
                }

                errorMesage = new HttpErrorResponse({
                    error: errorResponse,
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
                
            
            }
            return throwError(errorMesage);
        })
    );
    }


}
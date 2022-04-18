import { Component } from '@angular/core';
import { AuthService } from './security/auth.service';
import { authPasswordConfig } from './security/auth.config';
import { OAuthService } from 'angular-oauth2-oidc';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {    
    
    constructor(private oauthService: OAuthService){
        this.oauthService.configure(authPasswordConfig);
        
    }


   
    
}

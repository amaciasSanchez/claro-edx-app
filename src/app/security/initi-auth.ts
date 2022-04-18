import { Inject, Injectable } from "@angular/core";
import { keycloakConfig } from './auth.config';
import { KeycloakService } from 'keycloak-angular';

export function initializer(oauthService: KeycloakService): () => Promise<any> {


    return(): Promise<any> => {
        
        return new Promise(async (resolve,reject) => {
            try {
                await oauthService.init({
                    config: {
                        url: 'https://auth.apps.claro.com.ec/auth',
                        realm: 'DigitalExperience',
                        clientId: 'edx-app',
                        credentials: {
                            secret: 'b60293aa-e8ea-4b9f-b25c-3e91d3aa94d1'
                        }
                        
                       /* url: 'http://192.168.37.151:8181/auth',
                        realm: 'EDX',
                        clientId: 'edx-app'*/
                    },
                    initOptions: {
                        onLoad: 'login-required',
                        checkLoginIframe: false,
                        responseMode:"fragment",
                        //silentCheckSsoRedirectUri: window.location.origin + '/silent-refresh.html',
                        flow: "standard"
                    }
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}
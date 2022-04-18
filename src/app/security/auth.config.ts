//import { AuthConfig } from 'angular-oauth2-oidc';
import { environment  } from '../../environments/environment';
import { KeycloakConfig } from 'keycloak-js';
import { AuthConfig } from 'angular-oauth2-oidc';


export const authPasswordConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.IDP.issuer,



  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/#',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: environment.IDP.clientId,

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'token', //environment.IDP.responseType,

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email roles offline_access',

  dummyClientSecret: environment.IDP.secret,

  showDebugInformation: true,

  requireHttps: environment.IDP.requireHttps,

  oidc: false,

  
  tokenEndpoint: environment.IDP.tokenEndpoint,

  userinfoEndpoint: environment.IDP.userinfoEndpoint,

  /*
  jwks: environment.IDP.jwks,
  

  disableAtHashCheck: false

  */
  
};

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.IDP.issuer,



  // URL of the SPA to redirect the user to after login
 // redirectUri: 'http://127.0.0.1:4200/',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: environment.IDP.clientId,

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
   dummyClientSecret: environment.IDP.secret,

  responseType: environment.IDP.responseType,

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email roles',

  showDebugInformation: true,

  requireHttps: environment.IDP.requireHttps,

  
};

export const keycloakConfig: KeycloakConfig = {
  // Url of the Identity Provider
  url: environment.IDP.url,

  realm: environment.IDP.realm,

  clientId: environment.IDP.clientId,


  
};
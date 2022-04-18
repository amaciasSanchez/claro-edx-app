import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { UserInfo } from './models/userinfo';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  clientID;
  clientSecret;
  realm;
  URL;
  constructor(private service: HttpClient) {
    this.clientID = environment.IAMS.clientID;
    this.clientSecret = environment.IAMS.clientSecret;
    this.realm = environment.IDP.realm;
    this.URL = environment.IAMS.url;
  }


  updatePassword(emailOrUser: string, newPassword: string, temporalPassword) {
    console.log('updatePassword');
    let body = {
      domain: this.realm,
      emailOrUser,
      password: temporalPassword,
      new_password: newPassword,
      security_pin: "000000"
    }


    return this.service.post(`${this.URL}/user/claim/password`, body,
    {
      responseType: 'json',
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('app_access_token')}`)
      .set('Content-Type', 'application/json')
    });

  }



  getUserInfo(user: string){
    return this.service.get<UserInfo>(`${this.URL}/user/info?domain=${this.realm}&emailOrUser=${user}`,
    {
      responseType: 'json',
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('app_access_token')}`)
      .set('Content-Type', 'application/json')
    });
  }


  forgotPassword(user: string){
    let request = {
      domain: environment.IDP.realm,
      emailOrUser: user,
      security_pin: "00000000"
    }

    return this.service.post(`${this.URL}/user/forgot/password`,
    request,
    {
      responseType: 'json',
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('app_access_token')}`)
      .set('Content-Type', 'application/json')
    });
  }


  setPin(user: string, pin: string, password: string){
    let request = {
      domain: environment.IDP.realm,
      emailOrUser: user,
      password,
      security_pin: "00000000"
    }

    return this.service.post(`${this.URL}/user/set/pin`,
    request,
    {
      responseType: 'json',
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('app_access_token')}`)
      .set('Content-Type', 'application/json')
    });
  }


  generateToken(username:string, password:string){
    let body = `scope=openid profile email roles offline_access&client_id=${this.clientID}&client_secret=${this.clientSecret}&grant_type=password&username=${username}&password=${password}`;

    return this.service.post(environment.IDP.tokenEndpoint, body,
      {
        responseType: 'json',
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(
        map((response) => {
          console.log(`App Access Token ${response["access_token"]}`);
          return response["access_token"];
        })
      );
  }

    getRoles(token:string, user:string){
        return this.service.get(environment.IAMS.url+environment.IAMS.roles,{
            responseType: 'json',
            params: {emailOrUser: user},
            headers: new HttpHeaders()
                .set('Authorization', 'Bearer '+token)
        }).pipe(
            map((response) => {
                return response["roles"];
            })
        );
    }
    userHasRole(role:string){
      console.log('servicio auth');
        return new Observable<boolean>(obs=>{
            let roles: any [] = JSON.parse(localStorage.getItem('app_access_roles'));
            let index:number = roles.findIndex(r=>r===role)
            if(index>-1) {
                obs.next(true);
                obs.complete();
            }
            else {
                obs.next(false);
                obs.complete();
            }
        })
    }

}

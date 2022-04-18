import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
    constructor() { } 
    public isAuthenticated(): boolean {
        const token = JSON.parse(localStorage.getItem('token')); 
        return ((typeof (token) !== "undefined") && (token !== null) ? token : false);
    }
}
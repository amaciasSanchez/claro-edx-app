import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {
    constructor() { }
    public isAuthenticated(): boolean {
        const token = JSON.parse(localStorage.getItem('token'));
        return ((typeof (token) !== "undefined") && (token !== null) ? token :  environment.login);
    }
}

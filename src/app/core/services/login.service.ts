import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loginuser } from 'src/app/account/login/login.model';
import { ApiService } from 'src/app/api.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {


    constructor(
        private httpClient: HttpClient
    ) { }
    login(credentials: Loginuser): Observable<any> {
         
        if (credentials.role == 'admin') {
            const data = {
                email: credentials.email,
                password: credentials.password,
            };

            return this.httpClient.post<any>(ApiService.saveAdminLoginURL, data);
        }
        else {
            const data = {
                email: credentials.email,
                password: credentials.password,
            };
            return this.httpClient.post<any>(ApiService.getUserLoginURL, data);
        }


    }
    // forgotPwd(admin: ForgotPwd): Observable<any> {

    //     return this.httpClient.post<any>(ApiService.forgetPasswordURL, admin);
    // }
    // getOneTimePwd(admin: ForgotPwd): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.getOneTimePasswordURL, admin)
    // }
    // changePassword(admin: ForgotPwd): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.getOneTimePasswordURL, admin)
    // }
    // updatePassword(admin: ForgotPwd): Observable<any> {

    //     return this.httpClient.post<any>(ApiService.updatePasswordURL, admin);
    // }
    // changePassword(admin) {
    //     return this.httpClient.post<any>(ApiService.updatePasswordURL, admin);
    // }

}

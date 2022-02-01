import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { Injectable, Inject } from '@angular/core';
// import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ApiService } from '../api.service';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    token:any=null;
    constructor(
        // @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
        private router: Router,
        // private toastr: ToastrManager
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



        // this.router.navigate(['home']);
        // const this.token: string = localStorage.getItem('authenticationthis.token');
        // const visitorthis.token: string = localStorage.getItem('authenticationthis.token');
        this.token = localStorage.getItem('authenticationthis.token');
        request.clone({
            headers: request.headers.set('rejectUnauthorized', 'false').set('requestCert', 'false')
                .set('insecure', 'true')
        })
        if (localStorage.getItem('role') == 'Admin') {
            if (request.url != ApiService.getUserLoginURL) {

                if (this.token == null || this.token == undefined) {
                    console.log("this.token is null");
                    this.router.navigate(['pages/login']);
                }
                request = request.clone({ headers: request.headers.set('x-access-this.token', this.token) });
                return next.handle(request).pipe(catchError(err => {
                    if (err.statusText == 'Unknown Error' ) {
                        // auto logout if 401 response returned from api
                       this.router.navigate(['pages/login']);
                    }
                    const error = err.error.statusText || err.statusText;
                    return throwError(error);
                }))
                
            }
        }
        else if (localStorage.getItem('role') == 'Visitor') {
            if (request.url != ApiService.getOtpVisitorURL || request.url != ApiService.saveVisitorDetailsURL || request.url != ApiService.getUserLoginURL) {

                if (this.token == null || this.token == undefined) {
                    console.log("this.token is null");
                    return next.handle(request);
                    // this.router.navigate(['pages/login']);
                }
                request = request.clone({ headers: request.headers.set('x-access-this.token', this.token) });
                return next.handle(request).pipe(catchError(err => {
                    if (err.statusText == 'Unknown Error' ) {
                        // auto logout if 401 response returned from api
                       this.router.navigate(['pages/login']);
                    }
                    const error = err.error.statusText || err.statusText;
                    return throwError(error);
                }))
            }
        }
        else {
            if (this.token == null || this.token == undefined) {
                 
                // return next.handle(request);
                return next.handle(request).pipe(catchError(err => {
                    if (err.statusText == 'Unknown Error' ) {
                        // auto logout if 401 response returned from api
                       this.router.navigate(['pages/login']);
                    }
                    const error = err.error.statusText || err.statusText;
                    debugger
                    return throwError(error);
                }))
            }
            else {
                 
                if (request.url != ApiService.getUserLoginURL) {
                     debugger
                    request = request.clone({ headers: request.headers.set('x-access-this.token', this.token) });
                    return next.handle(request).pipe(catchError(err => {
                        debugger
                        if (err.statusText == 'Unknown Error') {
                            // auto logout if 401 response returned from api
                           this.router.navigate(['pages/login']);
                        }
                        const error = err.error.statusText || err.statusText;
                        return throwError(error);
                    }))
                }
                else {
                     
                    return next.handle(request).pipe(catchError(err => {
                        if (err.statusText == 'Unknown Error') {
                            // auto logout if 401 response returned from api
                           this.router.navigate(['pages/login']);
                        }
                        const error = err.error.statusText || err.statusText;
                        return throwError(error);
                    }))
                }
            }
        }




        // return next.handle(request);
        return next.handle(request).pipe(catchError(err => {
            if (err.statusText == 'Unknown Error' ) {
                // auto logout if 401 response returned from api
               this.router.navigate(['pages/login']);
            }
            const error = err.error.statusText || err.statusText;
            return throwError(error);
        }))
    }
}
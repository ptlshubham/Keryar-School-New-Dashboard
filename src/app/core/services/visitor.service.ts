
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RegisterVisitor } from 'src/app/account/register/visitorreg.model';
import { ApiService } from 'src/app/api.service';
import { Subject } from 'src/app/pages/manage/subject.model';


@Injectable({
    providedIn: 'root'
})
export class VisitorService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveVisitorRegister(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveVisitorDetailsURL, admin);
    }
    updateVisitorReg(admin: RegisterVisitor): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateVisitorRegURL, admin);
    }
    saveVisitorQue(data:any): Observable<any> {
         
        return this.httpClient.post<any>(ApiService.saveVisitorQueURL, data);
    }
    getVisitorQue(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getVisitorQueURL, data);
    }
    removeVisitorQue(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeVisitorQueURL, data);
    }

    saveVisitorTest(data:any) {
        return this.httpClient.post<any>(ApiService.saveVisitorTestURL, data);
    }
    getAllVisitorList(): Observable<Subject[]> {
        return this.httpClient.get<any>(ApiService.getAllVisitorURL);
    }

    updateVisitorInform(data: RegisterVisitor): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateVisitorInformURL, data);
    }
    getVisitorTestList(data:any) {

        return this.httpClient.post<any>(ApiService.getVisitorTestListURL, data)
    }

    removeVisitor(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeVisitorListURL, data);
    }
    getTestDetails(data:any){
        return this.httpClient.post(ApiService.GetTestDetailsURL,data);
    }
    getOtp(admin: RegisterVisitor): Observable<any> {
        return this.httpClient.post<any>(ApiService.getOtpVisitorURL, admin)
    }
    getVisitorTestQue(data:any){
        return this.httpClient.post(ApiService.GetViewVisitorTestListURL,data);
    }

}

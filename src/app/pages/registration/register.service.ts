
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/api.service';
import { Subject } from '../manage/subject.model';
import { Studentregister } from './student.model';
import { Teacher } from './Teacher.model';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveTeacherList(admin: Teacher): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveTecaherListURL, admin);
    }
    saveStudentList(admin: Studentregister): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveStudentListURL, admin);
    }
    getStudentList(id:any): Observable<Studentregister[]> {
        let data = {
            id: id
        }

        return this.httpClient.post<any>(ApiService.getStudentListListURL, data);
    }
    getStudentPicture(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getStudentURL, data);
    }
    // getOptionValue(id){
    //     let data={
    //       id:id
    //     }
    //     return this.httpClient.post(ApiService.getOptionValueURL,data);
    //   }
    getTeacherList(): Observable<any> {
         
        return this.httpClient.get<any>(ApiService.GetTeacherlistURL);
    }
    getAllStudentList(): Observable<any> {
         
        return this.httpClient.get<any>(ApiService.GetAllStudentlistURL);
    }
    getAllStudentListForTeacher(id:any){
        let data={
            id:id
        }
        return this.httpClient.post<any>(ApiService.GetAllStudentlistForTeacherURL,data);
    }
    getStudentByStd(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.GetAllStudentlistURL, data);
    }
    GetTeacherForChat(id:any){
        let data={
            id:id
        };
        return this.httpClient.post(ApiService.GetTeacherForChatURL,data);
    }
    getTestforChecking(testid:any,stuid:any){
        let data={
            testid:testid,
            stuid:stuid
        };
         
        return this.httpClient.post(ApiService.getTestforCheckingURL,data);
    }
    savetestresult(data:any){
        return this.httpClient.post(ApiService.savetestresultURL,data);
    }

    removeStudentList(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeStudentListURL, data);
    }
    removeTeacherList(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeTeacherListURL, data);
    }
    updateTecaherList(admin: Teacher): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateTeacherListURL, admin);
    }
    updateStudentList(admin: Studentregister): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateStudentListURL, admin);
    }
    getAllSubjectList(): Observable<Subject[]> {
        return this.httpClient.get<any>(ApiService.GetAllSubjectURL);
    }
    uploadImage(img:any): Observable<any> {

        return this.httpClient.post<any>(ApiService.uploadProfileImageURL, img);

    }
    getTestByStd(id:any , subid:any) {
        let data = {
            stuid: id,
            subid:subid
        }
        return this.httpClient.post<any>(ApiService.getSubmittedTestURL, data);
    }
    getSubjectByID(id:any) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getSubjectByIdURL, data);
    }
    getTotalObtainMarks(data:any){
        return this.httpClient.post(ApiService.getTotalofTestmarksURL,data);
    }
    // getStatusOfTest(data){
    //     return this.httpClient.post(ApiService.getSatusofTestURL,data);
    // }


}

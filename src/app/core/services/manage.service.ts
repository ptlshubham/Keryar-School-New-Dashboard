import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Chapater } from 'src/app/pages/manage/chapater.model';
import { Std } from 'src/app/pages/manage/standard.model';
import { Syllabus } from 'src/app/pages/manage/syllabus.model';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(
    private httpClient: HttpClient
  ) { }
  saveStdList(admin: Std): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveStdListURL, admin);
  }
  getStdList(): Observable<any> {

    let teachid = localStorage.getItem('UserId');
    let data = {
      teachid: teachid,
      role: localStorage.getItem('role'),

    }
    return this.httpClient.post<any>(ApiService.getStdListURL, data);
  }
  removeStdList() {
    return this.httpClient.get<any>(ApiService.removeStdURL);
  }
  updateStdList(admin:Std): Observable<any> {
    return this.httpClient.post<any>(ApiService.updateStandardURL, admin);
  }
  getStdListNew(data:any){
    return this.httpClient.post<any>(ApiService.getStdListURL, data);
  }
  addChapaters(admin: Chapater) {

    return this.httpClient.post<any>(ApiService.saveChapatersURL, admin);
  }
  getChapatersList(id:any): Observable<Chapater[]> {
    let data = {
      id: id,
      // role: localStorage.getItem('role'),
      // teachid: localStorage.getItem('UserId')
    }
    return this.httpClient.post<any>(ApiService.getChapaterListURL, data);
  }

  updateChapaterList(admin: Chapater): Observable<any> {

    return this.httpClient.post<any>(ApiService.updateChapaterListURL, admin);
  }

  removeChapaterList(id:any) {
    return this.httpClient.get<any>(ApiService.removeChapaterURL + id);

  }


  CheckPassword(data:any) {
    return this.httpClient.post(ApiService.ChackForPasswordURL, data);
  }



  addSubject(data:any) {

    return this.httpClient.post<any>(ApiService.saveSubjectURL, data);
  }
  getSubjectList(id:any){
    let data = {
      id: id,
      role: localStorage.getItem('role'),
      teachid: localStorage.getItem('UserId')
    }
    return this.httpClient.post<any>(ApiService.getSubjectListURL, data);
  }
  getSubjectForVideo(id:any) {
    let data = {
      id: id,
      role: localStorage.getItem('role'),
    }
    return this.httpClient.post<any>(ApiService.getSubjectForVideoURL, data);
  }


  updateSubjectList(admin:any): Observable<any> {

    return this.httpClient.post<any>(ApiService.updateSubjectURL, admin);
  }

  removeSubjectList(id:any) {
    return this.httpClient.get<any>(ApiService.removeSubjectURL + id);

  }

  saveSyllabusList(admin: Syllabus): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveSyllabusListURL, admin);
  }
  getAllSyllabusList(): Observable<Syllabus[]> {
    return this.httpClient.get<any>(ApiService.getAllSyllabusListURL);
  }
  getSyllabusById(id:any) {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.getSyllabusByIdURL, data);
  }
  uploadSyllabusImage(img:any): Observable<any> {

    return this.httpClient.post<any>(ApiService.uploadSyllabusImageURL, img);

  }
  getAttendaceCount(data:any){
    return this.httpClient.post(ApiService.GetAttendanceCountURL,data);
  }
  removeSyllabusList(id:any) {
    
    return this.httpClient.get<any>(ApiService.removeSyllabusURL + id);

  }
}

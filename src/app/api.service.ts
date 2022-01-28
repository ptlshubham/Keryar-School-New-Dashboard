import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public static HOST_URL: string = "http://31.220.59.174:3500";
  public static HOST_URL: string = "http://localhost:3500";
  //  public static HOST_URL: string = "http://31.220.59.174:5500";

  constructor(
    private http: HttpClient,
  ) { }
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  httpOption1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };

  public static SendMessageURL: string = ApiService.HOST_URL + '/pusher/SendMessage';
  public static GetMessageURL: string = ApiService.HOST_URL + '/pusher/GetMessage';

  public static saveStdListURL: string = ApiService.HOST_URL + '/admin/SaveStdList';
  public static getStdListURL: string = ApiService.HOST_URL + '/admin/GetStdList';
  public static updateStandardURL: string = ApiService.HOST_URL + '/admin/UpdateStandardList'
  public static saveSubjectURL: string = ApiService.HOST_URL + '/admin/saveSubject';
  public static getSubjectListURL: string = ApiService.HOST_URL + '/admin/GetSubjectList';
  public static getSubjectForVideoURL: string = ApiService.HOST_URL + '/admin/GetSubjectForVideo';
  public static updateSubjectURL: string = ApiService.HOST_URL + '/admin/UpdateSujectList/';
  public static removeSubjectURL: string = ApiService.HOST_URL + '/admin/RemoveSubjectList/';
  public static removeStdURL: string = ApiService.HOST_URL + '/admin/RemoveStandardList/';
  public static getStandardItemURL: string = ApiService.HOST_URL + '/admin/GetStdItem';
  public static getQueListURL: string = ApiService.HOST_URL + '/admin/GetQueType';
  public static saveQueListURL: string = ApiService.HOST_URL + '/admin/saveQueList';
  public static getAllQueListURL: string = ApiService.HOST_URL + '/admin/getAllQueList';
  public static getQueOptionListURL: string = ApiService.HOST_URL + '/admin/getQueOptionList';
  public static getQueAnswerURL: string = ApiService.HOST_URL + '/admin/getQueAnswer';
  public static getProfileDetailsURL: string = ApiService.HOST_URL + '/admin/GetProfileDetails';
  public static saveChapatersURL: string = ApiService.HOST_URL + '/admin/SaveChapatersList';
  public static getChapaterListURL: string = ApiService.HOST_URL + '/admin/GetChapaterList';
  public static updateChapaterListURL: string = ApiService.HOST_URL + '/admin/UpdateChapaterList/';
  public static removeChapaterURL: string = ApiService.HOST_URL + '/admin/RemoveChapaterList/';
  public static saveSyllabusListURL: string = ApiService.HOST_URL + '/admin/SaveSyllabusList';
  public static getAllSyllabusListURL: string = ApiService.HOST_URL + '/admin/GetAllSyllabusList';
  public static getSyllabusByIdURL: string = ApiService.HOST_URL + '/admin/GetSyllabusById';
  public static removeSyllabusURL: string = ApiService.HOST_URL + '/admin/RemoveSyllabusList/';
  public static updateProfileDataURL: string = ApiService.HOST_URL + '/admin/updateAdminProfile'
  public static removeQueListURL: string = ApiService.HOST_URL + '/admin/removeQueList';
  public static saveTecaherListURL: string = ApiService.HOST_URL + '/authenticate/saveTeacherList';
  public static saveStudentListURL: string = ApiService.HOST_URL + '/authenticate/SaveStudentList';
  public static getStudentListListURL: string = ApiService.HOST_URL + '/admin/GetStudentList/';
  public static GetTeacherlistURL: string = ApiService.HOST_URL + '/admin/GetTeacherList';
  public static GetAllStudentlistURL: string = ApiService.HOST_URL + '/admin/GetAllStudentList';
  public static GetAllStudentlistForTeacherURL: string = ApiService.HOST_URL + '/admin/GetAllStudentlistForTeacher';
  public static GetTeacherForChatURL: string = ApiService.HOST_URL + '/admin/GetTeacherForChat';
  public static getUserLoginURL: string = ApiService.HOST_URL + '/admin/GetUsersLogin';
  public static saveLoginUserURL: string = ApiService.HOST_URL + '/authenticate/UserLogin';
  public static getTestforCheckingURL: string = ApiService.HOST_URL + '/admin/getTestforChecking';
  public static saveAdminLoginURL: string = ApiService.HOST_URL + '/admin/login';
  public static removeStudentListURL: string = ApiService.HOST_URL + '/admin/removeStudentList';
  public static removeTeacherListURL: string = ApiService.HOST_URL + '/admin/removeTecaherList';
  public static updateTeacherListURL: string = ApiService.HOST_URL + '/admin/UpdateTecaherList/';
  public static updateStudentListURL: string = ApiService.HOST_URL + '/admin/UpdateStudentList/';
  public static updateQuestionURL: string = ApiService.HOST_URL + '/admin/UpdateQuestionList/';
  public static saveTestURL: string = ApiService.HOST_URL + '/admin/SaveTest';
  public static GetAllTestURL: string = ApiService.HOST_URL + '/admin/GetAllTestList';
  public static getTestListURL: string = ApiService.HOST_URL + '/admin/GetTestList';
  public static forgetPasswordURL: string = ApiService.HOST_URL + '/admin/ForgotPassword';
  public static GetAllSubjectURL: string = ApiService.HOST_URL + '/admin/GetAllSubjects';
  public static getViewTestURL: string = ApiService.HOST_URL + '/admin/GetViewTestList';
  public static GetViewVisitorTestListURL: string = ApiService.HOST_URL + '/admin/GetViewVisitorTestList';
  public static uploadProfileImageURL: string = ApiService.HOST_URL + '/admin/UploadProfileImage';
  public static uploadBannersImageURL: string = ApiService.HOST_URL + '/admin/UploadBannersImage';
  public static saveWebBannersURL: string = ApiService.HOST_URL + '/admin/SaveWebBanners';
  public static getWebBannersURL: string = ApiService.HOST_URL + '/admin/GetWebBanners/';
  public static removeWebBannersURL: string = ApiService.HOST_URL + '/admin/RemoveWebBanners';
  public static updateActiveWebStatusURL: string = ApiService.HOST_URL + '/admin/UpdateActiveWebBanners';
  public static getWebBannerURL: string = ApiService.HOST_URL + '/admin/GetWebBanner';
  public static getStudentTestURL: string = ApiService.HOST_URL + '/admin/getStudentTest';
  public static updateSendLinkURL: string = ApiService.HOST_URL + '/admin/updateSendLink';
  public static getStudentActiveTestURL: string = ApiService.HOST_URL + '/admin/GetStudentActiveTest';
  public static getOptionValueURL: string = ApiService.HOST_URL + '/admin/GetOptionValueTest';
  public static getOptionValVisitorueURL: string = ApiService.HOST_URL + '/admin/GetOptionValueVisitorTest';
  public static saveStudentTestURL: string = ApiService.HOST_URL + '/admin/SaveStudentTest';
  public static updatePendingTestURL: string = ApiService.HOST_URL + '/admin/UpdatePendingTest';
  public static getStudentURL: string = ApiService.HOST_URL + '/admin/GetStudentProfilePic';
  public static uploadQuestionImageURL: string = ApiService.HOST_URL + '/admin/UploadQuestionImage';
  public static uploadOptionsImageURL: string = ApiService.HOST_URL + '/admin/UploadOptionsImage';
  public static saveCalendarEventsURL: string = ApiService.HOST_URL + '/admin/saveCalendarEvents';
  public static getCalendarEventsURL: string = ApiService.HOST_URL + '/admin/getCalendarEvents';
  public static updateNotificationListURL: string = ApiService.HOST_URL + '/admin/UpdateNotificationList';
  public static removeEventListURL: string = ApiService.HOST_URL + '/admin/RemoveEventList';
  public static saveStudentAttandanceURL: string = ApiService.HOST_URL + '/admin/saveStudentAttandance';
  public static getStudentAttandanceURL: string = ApiService.HOST_URL + '/admin/getStudentAttandance';
  public static saveVisitorDetailsURL: string = ApiService.HOST_URL + '/authenticate/SaveVisitorDetails';
  public static saveVisitorQueURL: string = ApiService.HOST_URL + '/admin/SaveVisitorQueList';
  public static getVisitorQueURL: string = ApiService.HOST_URL + '/admin/GetVisitorQue';
  public static removeVisitorQueURL: string = ApiService.HOST_URL + '/admin/RemoveVisitorQue';
  public static saveVisitorTestURL: string = ApiService.HOST_URL + '/admin/SaveVisitorTest';
  public static getSubmittedTestURL: string = ApiService.HOST_URL + '/admin/GetSubmittedTest';
  public static getSubjectByIdURL: string = ApiService.HOST_URL + '/admin/GetSubjectByIdURL';
  public static getAllVisitorURL: string = ApiService.HOST_URL + '/admin/GetAllVisitor';
  public static updateVisitorInformURL: string = ApiService.HOST_URL + '/admin/UpdateVisitorInform';
  public static getStudentSubmittedTestURL: string = ApiService.HOST_URL + '/admin/GetSubmittedTest';
  public static savetestresultURL: string = ApiService.HOST_URL + '/admin/SaveTestResult';
  public static getVisitorTestListURL: string = ApiService.HOST_URL + '/admin/GetVisitorTestList';
  public static saveVisitorStudentTestURL: string = ApiService.HOST_URL + '/admin/SaveVisitorStudentTest';
  public static getOneTimePasswordURL: string = ApiService.HOST_URL + '/admin/GetOneTimePassword';
  public static updatePasswordURL: string = ApiService.HOST_URL + '/admin/updatePasswordAccordingRole';
  public static UpdateVisitorResultURL: string = ApiService.HOST_URL + '/admin/UpdateVisitorResult';
  public static GetVisitorResultURL: string = ApiService.HOST_URL + '/admin/GetVisitorResult';
  public static ChackForPasswordURL: string = ApiService.HOST_URL + '/admin/ChackForPassword';
  public static setStatusOfTestURL: string = ApiService.HOST_URL + '/admin/setStatusOfTest';
  public static updateStatusOfTestURL: string = ApiService.HOST_URL + '/admin/updateStatusOfTest';
  public static getTotalofTestmarksURL: string = ApiService.HOST_URL + '/admin/GetTotalofTestmarks';
  public static removeTestListURL: string = ApiService.HOST_URL + '/admin/RemoveTestList';
  public static removeVisitorListURL: string = ApiService.HOST_URL + '/admin/RemoveVisitorList';
  public static getOtpVisitorURL: string = ApiService.HOST_URL + '/authenticate/GetOtpVisitorURL';
  public static updateVisitorRegURL: string = ApiService.HOST_URL + '/admin/UpdateVisitorReg';
  public static saveVisitorLoginURL: string = ApiService.HOST_URL + '/admin/VisitorLogin';
  public static GetTestDetailsURL: string = ApiService.HOST_URL + '/admin/GetVisitorTest';
  public static uploadSyllabusImageURL: string = ApiService.HOST_URL + '/admin/UploadSyllabusImage';
  public static GetAttendanceCountURL: string = ApiService.HOST_URL + '/admin/GetAttendanceCount';
  public static saveNewTeamMembersURL: string = ApiService.HOST_URL + '/admin/SaveNewTeamMembers';
  public static getAllSubAdminList: string = ApiService.HOST_URL + '/admin/GetAllSubAdminList';
  public static updateLogoutDetailsURL: string = ApiService.HOST_URL + '/admin/UpdateLogoutDetails'
  //  public static GetViewVisitorTestListURL: string = ApiService.HOST_URL + '/admin/GetViewVisitorTestList';
}

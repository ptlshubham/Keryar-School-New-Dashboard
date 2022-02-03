import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { EventService } from '../../core/services/event.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';

import { LAYOUT_MODE } from "../layouts.model";
import { LoginService } from 'src/app/account/login/login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar Component
 */
export class TopbarComponent implements OnInit {

  mode: string | undefined;
  element: any;
  flagvalue: any;
  cookieValue: any;
  countryName: any;
  valueset: any;
  loginTotalTime: number = 0;
  datetime: any;
  in_time: any;
  out_time: any;
  public Rolees = localStorage.getItem("role");
  public userName = localStorage.getItem("UserName");

  public userId = localStorage.getItem("UserId");
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    public translate: TranslateService,
    private eventService: EventService,
    private loginService: LoginService
  ) { }

  /**
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  layoutMode!: string;

  ngOnInit(): void {
    this.layoutMode = LAYOUT_MODE;
    this.userName;
    this.in_time = localStorage.getItem("lastInTime");
    this.out_time = localStorage.getItem("lastInTime");
    this.element = document.documentElement;
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }

  /**
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Topbar Light-Dark Mode Change
   */
  changeMode(mode: string) {
    this.layoutMode = mode;
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  // logout() {
  //   if (environment.defaultauth === 'firebase') {
  //     this.authService.logout();
  //   } else {
  //     this.authFackservice.logout();
  //   }
  //   this.router.navigate(['/account/login']);
  // }
  logout() {
    // this.loginTimeCalculation();
    debugger
    let data = {
      userid: localStorage.getItem("UserId"),
      loginMinute: this.loginTotalTime
    };
    this.loginService.UpdateLogout(data).subscribe((res) => {
      // this.apiService.showNotification('top', 'right', 'Logout Successfully.', 'success');
      localStorage.clear();
      this.router.navigate(['account/login']);
    });

  }

  
  // loginTimeCalculation() {
  //   var intime = typeof datetime !== 'undefined' ? datetime : this.in_time;
  //   var datetime: any = new Date(intime).getTime();
  //   var now = new Date().getTime();
  //   if (isNaN(datetime)) {
  //     return "";
  //   }
  //   var milisec_diff: number = 0;
  //   if (datetime < now) {
  //     milisec_diff = now - datetime;
  //   } else {
  //     milisec_diff = datetime - now;
  //   }
  //   var minutes: number = 0;
  //   minutes = (milisec_diff / 60000);
  //   var minutesRound = Math.round(minutes);
  //   this.loginTotalTime = minutesRound;

  // }

}

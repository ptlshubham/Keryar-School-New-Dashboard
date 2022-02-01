import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { LoginService } from './login.service';
import { ToastService } from 'src/app/pages/extended/notifications/toast-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    public toastService: ToastService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
    //Validation Set
    this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });
    // // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   } else {
  //     if (environment.defaultauth === 'firebase') {
  //       
  //       this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
  //         
  //         this.router.navigate(['/']);
  //       })
  //         .catch(error => {
  //           this.error = error ? error : '';
  //         });
  //     } else {
  //       this.authFackservice.login(this.f.email.value, this.f.password.value)
  //         .pipe(first())
  //         .subscribe(
  //           data => {
  //             
  //             this.router.navigate(['/']);
  //           },
  //           error => {
  //             this.error = error ? error : '';
  //           });
  //     }
  //   }
  // }
  onSubmit() {
    debugger
    this.submitted = true;
    localStorage.clear();
    // credentials.role = this.selectedRole;
    // console.log("......data...." + credentials.email);
    if (this.loginForm.invalid) {
      return;
    } else {
      let data = {
        email: this.f.email.value,
        password: this.f.password.value,
      }
      
      this.loginService.userLogin(data).subscribe((data:any) => {

        if (data == 1) {
          this.toastService.show('Wrong Email!', { classname: 'bg-danger text-center text-white', delay: 10000 });
        }
        else if (data == 2) {
          this.toastService.show('Wrong Password!', { classname: 'bg-danger text-center text-white', delay: 10000 });

        }
        else {
          if (data[0].role == 'Admin') {
            this.toastService.show('Admin successfully Login.', { classname: 'bg-success text-center text-white', delay: 10000 });
            localStorage.setItem('authenticationToken', data[0].token);
            localStorage.setItem('UserId', data[0].id);
            localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
            localStorage.setItem('role', data[0].role);
            localStorage.setItem('lastOutTime', data[0].last_login);
            localStorage.setItem('lastInTime', data[0].last_login);
            
            this.router.navigate(['/']);
          }
          else if (data[0].role == 'Teacher') {
            
            this.toastService.show('Teacher successfully Login.', { classname: 'bg-success text-center text-white', delay: 10000 });
            localStorage.setItem('authenticationToken', data[0].token);
            localStorage.setItem('UserId', data[0].id);
            localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
            localStorage.setItem('standardid', data[0].standard);
            localStorage.setItem('gender', data[0].gender);
            localStorage.setItem('role', data[0].role);
            localStorage.setItem('lastOutTime', data[0].out_time);
            localStorage.setItem('lastInTime', data[0].last_login);
            this.router.navigate(['/']);
          }
          else if (data[0].role == 'Student') {
            this.toastService.show('Student successfully Login.', { classname: 'bg-success text-center text-white', delay: 10000 });
            localStorage.setItem('authenticationToken', data[0].token);
            localStorage.setItem('UserId', data[0].id);
            localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
            localStorage.setItem('standardid', data[0].standard);
            localStorage.setItem('gender', data[0].gender);
            localStorage.setItem('role', data[0].role);
            localStorage.setItem('lastOutTime', data[0].out_time);
            localStorage.setItem('lastInTime', data[0].last_login);
            this.router.navigate(['/']);
          }
          else if (data[0].role == 'Visitor') {

            if (data[0].detailsupdated == false) {
              localStorage.setItem('authenticationToken', data[0].token);
              localStorage.setItem('UserId', data[0].id);
              localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
              localStorage.setItem('role', data[0].role);
              localStorage.setItem('standardid', data[0].standard);
              localStorage.setItem('lastOutTime', data[0].out_time);
              localStorage.setItem('lastInTime', data[0].last_login);
              this.router.navigate(['visitor/visitorreg']);

            }
            else {

              localStorage.setItem('authenticationToken', data[0].token);
              localStorage.setItem('UserId', data[0].id);
              localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
              localStorage.setItem('role', data[0].role);
              localStorage.setItem('standardid', data[0].standard);
              localStorage.setItem('gender', data[0].gender);
              localStorage.setItem('lastOutTime', data[0].out_time);
              localStorage.setItem('lastInTime', data[0].last_login);
              this.router.navigate(['visitor/visitortest']);
            }
          }
          else if (data[0].role == 'Parents') {
            this.toastService.show('Parent successfully Login.', { classname: 'bg-success text-center text-white', delay: 10000 });
            localStorage.setItem('authenticationToken', data[0].token);
            localStorage.setItem('UserId', data[0].id);
            localStorage.setItem('UserName', data[0].fname);
            localStorage.setItem('stuid', data[0].stuid);
            localStorage.setItem('role', data[0].role);
            localStorage.setItem('lastOutTime', data[0].out_time);
            localStorage.setItem('lastInTime', data[0].last_login);
            this.router.navigate(['/']);
          }
          else if (data[0].role == 'Sub-Admin') {
            this.toastService.show('Admin successfully Login.', { classname: 'bg-success text-center text-white', delay: 10000 });
            localStorage.setItem('authenticationToken', data[0].token);
            localStorage.setItem('UserId', data[0].id);
            localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
            localStorage.setItem('role', data[0].role);
            localStorage.setItem('lastOutTime', data[0].out_time);
            localStorage.setItem('lastInTime', data[0].last_login);
            this.router.navigate(['/']);
          }
          // else {
          //     this.router.navigate(['dashboard']);
          // }
        }
      });
    }

  }
  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}

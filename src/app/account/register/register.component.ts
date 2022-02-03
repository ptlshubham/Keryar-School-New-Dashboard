import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { UserProfileService } from '../../core/services/user.service';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { VisitorService } from 'src/app/core/services/visitor.service';
import { RegisterVisitor } from './visitorreg.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();

  // Carousel navigation arrow show
  showNavigationArrows: any;

  layout_mode!: string;

  signupForm!: FormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  public visitorModel: RegisterVisitor = new RegisterVisitor;
  forgotBox: boolean = false;
  changePwd: boolean = false;
  otpBox: boolean = false;
  public visitorDetails: RegisterVisitor[] = [];

  emailResp: any;
  otpResp: any;
  userOtp: any;
  role: any = [];
  selectedRole: string = 'Visitor';
  OTPEmail: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '50px'
    }
  };
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserProfileService,
    private VisitorService: VisitorService
  ) {

  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }

    // Validation Set
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    debugger
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      debugger
      let data = {
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        contact: this.f.contact.value,
        email: this.f.email.value,
        password: this.f.password.value,
        // visitorId:this.f.visitorId.value,
        // contact: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      }
      debugger
      this.VisitorService.saveVisitorRegister(data).subscribe((data: any) => {
        this.visitorDetails = data;
        localStorage.setItem('role', this.selectedRole);
        localStorage.setItem('UserName', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('vid', data.insertId);
        localStorage.setItem('secret', data.password);

        // this.apiService.showNotification('top', 'right', 'Otp Sent on Registered Email Address.', 'success');
        this.otpBox = true;
        this.OTPEmail = localStorage.getItem('email');
      })
      // if (environment.defaultauth === 'firebase') {
      //   this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
      //     this.successmsg = true;
      //     if (this.successmsg) {
      //       this.router.navigate(['']);
      //     }
      //   })
      //     .catch((error: string) => {
      //       this.error = error ? error : '';
      //     });
      // } else {
      //   this.userService.register(this.signupForm.value)
      //     .pipe(first())
      //     .subscribe(
      //       (data: any) => {
      //         this.successmsg = true;
      //         if (this.successmsg) {
      //           this.router.navigate(['/account/login']);
      //         }
      //       },
      //       (error: any) => {
      //         this.error = error ? error : '';
      //       });
      // }
    }
  }
  signup() {

    this.visitorModel.contact = "8141952604";
    this.VisitorService.saveVisitorRegister(this.visitorModel).subscribe((data: any) => {
      this.visitorDetails = data;
      debugger
      localStorage.setItem('role', this.selectedRole);
      localStorage.setItem('UserName', data.username);
      localStorage.setItem('email', data.email);
      localStorage.setItem('vid', data.insertId);
      localStorage.setItem('secret', data.password);

      // this.apiService.showNotification('top', 'right', 'Otp Sent on Registered Email Address.', 'success');
      this.otpBox = true;
      this.OTPEmail = localStorage.getItem('email');
    })
  }
  onOtpChange(otp: any) {
    this.userOtp = otp;
  }
  checkOTP() {
    this.visitorModel.password = localStorage.getItem('secret');
    this.visitorModel.email = localStorage.getItem('email');
    this.visitorModel.visitorId = localStorage.getItem('vid');
    this.visitorModel.visitorOtp = this.userOtp;
    this.VisitorService.getOtp(this.visitorModel).subscribe((data) => {
      localStorage.setItem('authToken', data[0].token);

      // this.apiService.showNotification('top', 'right', 'OTP is verified Successfully.', 'success');
      this.router.navigate(['visitor/visitorreg']);
      localStorage.removeItem('secret');
    });
  }

}

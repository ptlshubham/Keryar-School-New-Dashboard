import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';
import { LoginService } from '../login/login.service';
import { ForgotPwd } from './forgotpwd.model';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.scss']
})
export class ForgotpwdComponent implements OnInit {
  resetForm!: FormGroup;
  unlockForm!: FormGroup;
  submitted = false;
  submitreset = false;
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  public forgotPwdModel: ForgotPwd = new ForgotPwd;
  forgotBox: boolean = false;
  changePwd: boolean = false;
  otpBox: boolean = false;

  emailResp: any;
  otpResp: any;
  role: any = [];
  selectedRole: string = '';
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
  userOtp: any;
  userEmail: any;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /**
     * Form Validation
     */
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.unlockForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [10, [Validators.required, Validators.min(14)]],
      password: ['', Validators.required],confirmpwd: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmpwd'),
      
    });
    // this.unlockForm = this.formBuilder.group({
    //   password: ['', Validators.required], confirmpwd: ['', Validators.required]
    // }, {
    //   validator: MustMatch('password', 'confirmpwd'),

    // });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    else {
      let data = {
        email: this.f.email.value,
      }
      this.userEmail = data.email;
      this.loginService.forgotPwd(data).subscribe((data) => {

        // this.apiService.showNotification('top', 'right', 'Email Sent Successfully on your Email Address.', 'success');
        this.emailResp = data[0].userid;
        this.forgotBox = true;
        this.changePwd = false;
        this.otpBox = true;
      });
    }
  }
  forgotPassword() {
    // this.forgotPwdModel.role = this.selectedRole;

    this.loginService.forgotPwd(this.forgotPwdModel).subscribe((data) => {

      // this.apiService.showNotification('top', 'right', 'Email Sent Successfully on your Email Address.', 'success');
      this.emailResp = data[0].userid;
      this.forgotBox = true;
      this.changePwd = false;
      this.otpBox = true;
    });
  }
  saveOTP() {
    this.forgotPwdModel.id = this.emailResp;
    this.forgotPwdModel.otp = this.userOtp;
    this.loginService.getOneTimePwd(this.forgotPwdModel).subscribe((data) => {

      this.otpResp = data[0].userid;
      this.changePwd = true;
      this.otpBox = false;
      this.forgotBox = true
    });
  }
  onResetSubmit(){
    this.submitted = true;
  }
  changeForgotPwd() {
  
    this.forgotPwdModel.id = this.otpResp;

    this.loginService.updatePassword(this.forgotPwdModel).subscribe((req) => {
      // this.apiService.showNotification('top', 'right', 'Password changed Successfully.', 'success');
      this.router.navigate(['/account/login']);
    })

  }
  onOtpChange(otp: any) {
    this.userOtp = otp;
  }


}


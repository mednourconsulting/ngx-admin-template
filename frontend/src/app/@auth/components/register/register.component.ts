/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthSocialLink, NbAuthService, NbAuthResult} from '@nebular/auth';
import {getDeepFromObject} from '../../helpers';
import {EMAIL_PATTERN} from '../constants';
import {LanguageService} from 'app/languages/language.service';
import {MessagesService} from "../../../messages/messages.service";
import {Observable, of} from "rxjs";


@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent implements OnInit {
  //errorMessage$: Observable<string[]> = of([]);
 //successMessage$: Observable<string[]> = of([]);
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  isFullNameRequired: boolean = this.getConfigValue('forms.validation.fullName.required');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  redirectDelay: number = this.getConfigValue('forms.register.redirectDelay');
  showMessages: any = this.getConfigValue('forms.register.showMessages');
  strategy: string = this.getConfigValue('forms.register.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  registerForm: FormGroup;

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              private fb: FormBuilder,
              protected router: Router,
              public languageService: LanguageService,
              private messagesService: MessagesService,) {
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get terms() {
    return this.registerForm.get('terms');
  }

  translator( key: string) {
    return this.languageService.getLanguageText(key);
  }
  ngOnInit(): void {
  //  this.messagesService.clearErrorMessage();
  //  this.messagesService.clearSuccessMessage();
   // this.errorMessage$ = this.messagesService.getErrorMessage();
  //  this.successMessage$ = this.messagesService.getSuccessMessage();
    const fullNameValidators = [];
    this.isFullNameRequired && fullNameValidators.push(Validators.required);
    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);
    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);
    this.registerForm = this.fb.group({
      fullName: this.fb.control('', [...fullNameValidators]),
      email: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
      terms: this.fb.control(''),
    });
  }

  register(): void {
    this.user = this.registerForm.value;
    this.submitted = true;
   // this.messagesService.clearErrorMessage();
  //  this.messagesService.clearSuccessMessage();

    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      console.warn('result : ', result);
      this.submitted = false;
      /*if (result.isSuccess()) {
        this.statusValue = result.getResponse().status;
        this.status = 'successStatus';
        //this.messagesService.setSuccessMessageFromStatus(result.getResponse().status);
      } else {
        this.statusValue = result.getResponse().status;
        this.status = 'errorStatus';

        //  this.messagesService.setErrorMessageFromStatus(result.getResponse().status);
      }*/
      this.messagesService.setMessage(result.getResponse().status);
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}

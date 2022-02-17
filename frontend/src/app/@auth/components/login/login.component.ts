/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {
  NB_AUTH_OPTIONS,
  NbAuthSocialLink,
  NbAuthService,
  NbAuthResult,
} from '@nebular/auth';
import {getDeepFromObject} from '../../helpers';
import {NbThemeService} from '@nebular/theme';
import {EMAIL_PATTERN} from '../constants';
import {InitUserService} from '../../../@theme/services/init-user.service';
import {LanguageService} from "../../../languages/language.service";
import {Observable, of} from "rxjs";
import {MessagesService} from "../../../messages/messages.service";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NgxLoginComponent implements OnInit {
  public showPasswordOnPress: boolean;
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.login.redirectDelay');
  showMessages: any = this.getConfigValue('forms.login.showMessages');
  strategy: string = this.getConfigValue('forms.login.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');
  rememberMe = this.getConfigValue('forms.login.rememberMe');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  user: any = {};
  submitted: boolean = false;
  loginForm: FormGroup;
  alive: boolean = true;

 // errors: string[] = [];
//  messages: string[] = [];

 // errorMessage$: Observable<string[]> = of([]);
  //successMessage$: Observable<string[]> = of([]);

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected themeService: NbThemeService,
              private fb: FormBuilder,
              protected router: Router,
              protected initUserService: InitUserService,
                 protected languageService: LanguageService,
             private messagesService: MessagesService,
  ) {
  }

  translator(key: string) {
    return this.languageService.getLanguageText(key);
  }

  ngOnInit(): void {
/*    this.messagesService.clearErrorMessage();
    this.messagesService.clearSuccessMessage();
    this.errorMessage$ = this.messagesService.getErrorMessage();
    this.successMessage$ = this.messagesService.getSuccessMessage();*/
    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.loginForm = this.fb.group({
      email: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      rememberMe: this.fb.control(''),
    });
  }

  login(): void {
    this.user = this.loginForm.value;
    this.submitted = true;
    //this.messagesService.clearErrorMessage();
   // this.messagesService.clearSuccessMessage();
    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      console.warn('result', result.getResponse().status);
      this.submitted = false;
      this.messagesService.setMessage(result.getResponse().status);
      if (result.isSuccess()) {
        this.initUserService.initCurrentUser().subscribe();
      }

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

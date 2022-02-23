/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthService, NbAuthResult} from '@nebular/auth';
import {getDeepFromObject} from '../../helpers';
import {LanguageService} from "../../../@components/languages/language.service";
import {MessagesService} from "../../../@components/messages/messages.service";
import {Observable, of, Subject, Subscription} from "rxjs";
import {UsersService} from "../../../@core/backend/common/services/users.service";
import {authRoute, loginRoute} from "../constants";


@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxResetPasswordComponent implements OnInit {
  public showPasswordOnPress: boolean = false;
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.resetPassword.redirectDelay');
  showMessages: any = this.getConfigValue('forms.resetPassword.showMessages');
  strategy: string = this.getConfigValue('forms.resetPassword.strategy');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  activeRouteParam$: Observable<Params> = of();
  isTokenSet: boolean = false;
  result$: Subscription;
  errors$: Subject<string> = new Subject<string>();
  submitted = false;
  user: any = {};
  resetPasswordForm: FormGroup;

  constructor(protected service: NbAuthService,
              //   protected location: Location,
              private userService: UsersService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected fb: FormBuilder,
              protected router: Router,
              private route: ActivatedRoute,
              protected languageService: LanguageService,
              protected messagesService: MessagesService,
  ) {
  }

  translator(key: string) {
    return this.languageService.getLanguageText(key);
  }

  ngOnInit(): void {
    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.resetPasswordForm = this.fb.group({
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
    });
    console.warn(this.route.queryParams);
    this.route.queryParams.subscribe(
      value => {
        if (value['token'] != null) {
          console.warn('yeess');
        }
        if (value['app'] == null) {
          console.warn('noo');
        }
      }
    );
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  /* resetPass(): void {
    this.result$ = this.activeRouteParam$.pipe(
      concatMap(param => {
        // Pour changer le mot de passe on vérifie s'il sajit d'une request depuis
        // un token de récupération de mot de passe ou bien une request depuis une session
        if (param['token']) {
          if (this.resetPasswordForm.valid) {
            if (this.password.value === this.confirmPassword.value) {
              return this.userService.restorePassword({token: param['token'],
                newPassword: this.password.value, confirmPassword: this.confirmPassword.value}).pipe(
                map(() => {
                  setTimeout(() => {
                    this.router.navigate([authRoute, loginRoute]);
                  }, 3000);
                  this.resetPasswordForm.reset();
                  return 'Votre mot de passe a bien été modifié';
                }),
                catchError((error: HttpErrorResponse) => {
                  this.errors$.next(error.statusText);
                  return of();
                }),
              );
            }
          }
        } else {
          if (this.resetPasswordForm.valid) {
            if (this.password.value === this.confirmPassword.value) {
              return this.userService.getCurrentUser()
                .pipe(
                  flatMap((user: User) => {
                    const tmpUser = new User();
                    tmpUser.passwordHash = this.password.value;
                    tmpUser.id = user.id;
                    return this.userService.updateUser(tmpUser);
                  }),
                  map((user) => {
                    setTimeout(() => {
                      this.router.navigate([pagesRoute, dashboardRoute]);
                    }, 3000);
                    this.resetPasswordForm.reset();
                    return 'Votre mot de passe a bien été modifié';
                  }),
                  catchError((error: HttpErrorResponse) => {
                    this.errors$.next(error.statusText);
                    return of();
                  }),
                );
            }
          }
        }
      }),
    );
  }*/
  resetPass(): void {
    this.result$ = this.route.queryParams.subscribe(
      value => {
        if (value['token'] != null) {
          console.warn('token =>', value['token'])
          console.warn('newPass =>', this.password.value)
          console.warn('confirmPass =>', this.confirmPassword.value)
          this.userService.restorePassword({
            token: value['token'],
            newPassword: this.password.value, confirmPassword: this.confirmPassword.value
          }).subscribe(
            (result) => {
              this.messagesService.setMessage(200);
              setTimeout(() => {
                return this.router.navigate([authRoute, loginRoute]);
              }, 2000);
            }, (error) => {
              this.messagesService.setMessage(error.status);
            }
          );
        } else {
          this.submitted = true;
          this.user = this.resetPasswordForm.value;

          this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
            console.warn("result", result);
            this.submitted = false;
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
      });

  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}


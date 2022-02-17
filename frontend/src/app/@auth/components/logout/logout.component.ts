/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import {LanguageService} from "../../../languages/language.service";

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent implements OnInit {

  redirectDelay: number = 1500;
  strategy: string = this.getConfigValue('forms.logout.strategy');

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router,
              protected languageService: LanguageService ) { }
  translator( key: string) {
    return this.languageService.getLanguageText(key);
  }


  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    localStorage.clear();
    this.service.logout(strategy).subscribe((result: NbAuthResult) => {
      const redirect = '/auth/login';
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect) ;

        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}

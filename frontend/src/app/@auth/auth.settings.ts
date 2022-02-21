/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbAuthOAuth2JWTToken, NbPasswordAuthStrategy } from '@nebular/auth';
import { environment } from '../../environments/environment';
import {LanguageService} from "../@components/languages/language.service";

let languageService: LanguageService = new LanguageService();
export const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];
/**
 * For customising the Auth strategy
 * Need some documentation? visit :
 * https://akveo.github.io/nebular/docs/auth/configuring-a-strategy#setup-api-configuration
 * https://akveo.github.io/nebular/docs/auth/nbpasswordauthstrategy#nbpasswordauthstrategy
 **/
export const authOptions = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      baseEndpoint: environment.apiUrl,
      token: {
        class: NbAuthOAuth2JWTToken,
        key: 'token',
      },
      login: {
        endpoint: '/auth/login',
        defaultErrors: [languageService.getLanguageText('default_error_msg')],
        defaultMessages: [languageService.getLanguageText('default_success_msg')],
        method: 'post',
      },
      register: {
        endpoint: '/auth/sign-up',
        redirect: {
          success: '/auth/login',
          failure: null,
        },
        method: 'post',
      },
      logout: {
        endpoint: '/auth/sign-out',
        method: 'post',
        redirect: {
          success: '/auth/login',
          failure: null,
        },
      },
      requestPass: {
        endpoint: '/auth/request-pass',
        method: 'post',
      },
      resetPass: {
        endpoint: '/auth/reset-pass',
        method: 'post',
      },
      refreshToken: {
        endpoint: '/auth/refresh-token',
        method: 'post',
      },
    }),
  ],
  forms: {
    login: {
      socialLinks: socialLinks,
    },
    register: {
      socialLinks: socialLinks,
    },
  },
};

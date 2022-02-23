/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NgxAuthComponent,
  NgxLoginComponent,
  NgxRegisterComponent,
  NgxLogoutComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent, loginRoute, registerRoute, logoutRoute, requestPasswordRoute, resetPasswordRoute,
} from './components';
import {AuthGuard} from "./auth.guard";



const routes: Routes = [{
  path: '',
  component: NgxAuthComponent,
  children: [
    {
      path: '',
      component: NgxLoginComponent,
    },
    {
      path: loginRoute,
      canActivate: [AuthGuard],
      component: NgxLoginComponent,
    },
    {
      path: registerRoute,
      canActivate: [AuthGuard],
      component: NgxRegisterComponent,
    },
    {
      path: logoutRoute,
      component: NgxLogoutComponent,
    },
    {
      path: requestPasswordRoute,

      canActivate: [AuthGuard],
      component: NgxRequestPasswordComponent,
    },
    {
      path: resetPasswordRoute,
      component: NgxResetPasswordComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}

/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesGuard} from './@auth/pages.guard';
import {authRoute, pagesRoute} from "./@auth/components";



const routes: Routes = [
  {
    path: '',
    redirectTo: pagesRoute,
    pathMatch: 'full',
  },
  {
    path: pagesRoute,
    canActivate: [PagesGuard],
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: authRoute,
    loadChildren: () => import('app/@auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: pagesRoute,
    pathMatch: 'full',
  },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}

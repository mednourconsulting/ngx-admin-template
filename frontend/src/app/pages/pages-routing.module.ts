/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {
  chartsRoute,
  dashboardRoute, editorsRoute, extraComponentsRoute,
  formsRoute,
  iotDashboardRoute, layoutRoute, mapsRoute, miscellaneousRoute,
  modalOverlaysRoute, tablesRoute,
  uiFeaturesRoute,
  usersRoute
} from "../@auth/components";


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: dashboardRoute,
      component: ECommerceComponent,
    },
    {
      path: iotDashboardRoute,
      component: DashboardComponent,
    },
    {
      path: usersRoute,
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: layoutRoute,
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: formsRoute,
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: uiFeaturesRoute,
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: modalOverlaysRoute,
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: extraComponentsRoute,
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: mapsRoute,
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: chartsRoute,
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: editorsRoute,
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: tablesRoute,
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: miscellaneousRoute,
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: dashboardRoute,
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

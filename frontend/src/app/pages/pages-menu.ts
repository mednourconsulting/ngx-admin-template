/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  authRoute,
  loginRoute,
  pagesRoute,
  registerRoute,
  requestPasswordRoute,
  resetPasswordRoute,
  chartsRoute,
  editorsRoute,
  mapsRoute,
  miscellaneousRoute,
  tablesRoute,
  extraComponentsRoute,
  modalOverlaysRoute,
  uiFeaturesRoute, formsRoute, layoutRoute, iotDashboardRoute, dashboardRoute, usersRoute
} from "../@auth/components";

@Injectable()
export class PagesMenu {

  getMenu(): Observable<NbMenuItem[]> {
    const dashboardMenu = [
      {
        title: 'E-commerce',
        icon: 'shopping-cart-outline',
        link: '/'+pagesRoute+'/'+dashboardRoute,
        home: true,
        children: undefined,
      },
      {
        title: 'IoT Dashboard',
        icon: 'home-outline',
        link: '/'+pagesRoute+'/'+iotDashboardRoute,


        children: undefined,
      },
    ];

    const menu = [
      {
        title: 'FEATURES',
        group: true,
      },
      {
        title: 'Layout',
        icon: 'layout-outline',
        children: [
          {
            title: 'Stepper',
            link: '/'+pagesRoute+'/'+layoutRoute+ '/stepper'

          },
          {
            title: 'List',
            link: '/'+pagesRoute+'/'+layoutRoute+ '/list'

          },
          {
            title: 'Infinite List',
            link: '/'+pagesRoute+'/'+layoutRoute+ '/infinite-list'

          },
          {
            title: 'Accordion',
            link: '/'+pagesRoute+'/'+layoutRoute+ '/accordion'

          },
          {
            title: 'Tabs',
            pathMatch: 'prefix',
            link: '/'+pagesRoute+'/'+layoutRoute+ '/tabs'

          },
        ],
      },
      {
        title: 'Forms',
        icon: 'edit-2-outline',
        children: [
          {
            title: 'Form Inputs',
            link: '/'+pagesRoute+'/'+formsRoute+ '/inputs'

          },
          {
            title: 'Form Layouts',
            link: '/'+pagesRoute+'/'+formsRoute+ '/layouts'

          },
          {
            title: 'Buttons',
            link: '/'+pagesRoute+'/'+formsRoute+ '/buttons'

          },
          {
            title: 'Datepicker',
            link: '/'+pagesRoute+'/'+formsRoute+ '/datepicker'

          },
        ],
      },
      {
        title: 'UI Features',
        icon: 'keypad-outline',
        link: '/pages/ui-features',
        children: [
          {
            title: 'Grid',
            link: '/'+pagesRoute+'/'+uiFeaturesRoute+ '/grid'
          },
          {
            title: 'Icons',
            link: '/'+pagesRoute+'/'+uiFeaturesRoute+ '/icons'
          },
          {
            title: 'Typography',
            link: '/'+pagesRoute+'/'+uiFeaturesRoute+ '/typography'
          },
          {
            title: 'Animated Searches',
            link: '/'+pagesRoute+'/'+uiFeaturesRoute+ '/search-fields'
          },
        ],
      },
      {
        title: 'Modal & Overlays',
        icon: 'browser-outline',
        children: [
          {
            title: 'Dialog',
            link: '/'+pagesRoute+'/'+modalOverlaysRoute+ '/dialog'

          },
          {
            title: 'Window',
            link: '/'+pagesRoute+'/'+modalOverlaysRoute+ '/window'

          },
          {
            title: 'Popover',
            link: '/'+pagesRoute+'/'+modalOverlaysRoute+ '/popover'

          },
          {
            title: 'Toastr',
            link: '/'+pagesRoute+'/'+modalOverlaysRoute+ '/toastr'

          },
          {
            title: 'Tooltip',
            link: '/'+pagesRoute+'/'+modalOverlaysRoute+ '/tooltip'
          },
        ],
      },
      {
        title: 'Extra Components',
        icon: 'message-circle-outline',
        children: [
          {
            title: 'Calendar',
            link: '/'+pagesRoute+'/'+extraComponentsRoute+ '/calendar'

          },
          {
            title: 'Progress Bar',
            link: '/'+pagesRoute+'/'+extraComponentsRoute+ '/progress-bar'

          },
          {
            title: 'Spinner',
            link: '/'+pagesRoute+'/'+extraComponentsRoute+ '/spinner'

          },
          {
            title: 'Alert',
            link: '/'+pagesRoute+'/'+extraComponentsRoute+ '/alert'

          },
          {
            title: 'Calendar Kit',
            link: '/'+pagesRoute+'/'+extraComponentsRoute+ '/calendar-kit'

          },
          {
            title: 'Chat',
            link: '/'+pagesRoute+'/'+extraComponentsRoute+ '/chat'
          },
        ],
      },
      {
        title: 'Maps',
        icon: 'map-outline',
        children: [
          {
            title: 'Google Maps',
            link: '/'+pagesRoute+'/'+mapsRoute+ '/gmaps'

          },
          {
            title: 'Leaflet Maps',
            link: '/'+pagesRoute+'/'+mapsRoute+ '/leaflet'

          },
          {
            title: 'Bubble Maps',
            link: '/'+pagesRoute+'/'+mapsRoute+ '/bubble'
          },
          {
            title: 'Search Maps',
            link: '/'+pagesRoute+'/'+mapsRoute+ '/searchmap'

          },
        ],
      },
      {
        title: 'Charts',
        icon: 'pie-chart-outline',
        children: [
          {
            title: 'Echarts',
            link: '/'+pagesRoute+'/'+chartsRoute+ '/echarts'

          },
          {
            title: 'Charts.js',
            link: '/'+pagesRoute+'/'+chartsRoute+ '/chartjs'

          },
          {
            title: 'D3',
            link: '/'+pagesRoute+'/'+chartsRoute+ '/d3'

          },
        ],
      },
      {
        title: 'Editors',
        icon: 'text-outline',
        children: [
          {
            title: 'TinyMCE',
            link: '/'+pagesRoute+'/'+editorsRoute+ '/tinymce'

          },
          {
            title: 'CKEditor',
            link: '/'+pagesRoute+'/'+editorsRoute+ '/ckeditor'

          },
        ],
      },
      {
        title: 'Tables & Data',
        icon: 'grid-outline',
        children: [
          {
            title: 'Smart Table',
            link: '/'+pagesRoute+'/'+tablesRoute+ '/smart-table'

          },
          {
            title: 'Tree Grid',
            link: '/'+pagesRoute+'/'+tablesRoute+ '/tree-grid'
          },
        ],
      },
      {
        title: 'Miscellaneous',
        icon: 'shuffle-2-outline',
        children: [
          {
            title: '404',
            link: '/'+pagesRoute+'/'+miscellaneousRoute+ '/404',
          },
        ],
      },
      {
        title: 'Users',
        icon: 'people-outline',
        children: [
          {
            title: 'Add',
            link: '/'+pagesRoute+'/'+usersRoute+ '/add',
          },
          {
            title: 'current',
            link: '/'+pagesRoute+'/'+usersRoute+ '/current',
          },
        ],
      },
      {
        title: 'Auth',
        icon: 'lock-outline',
        children: [
          {
            title: 'Login',
            link: '/'+authRoute+'/'+loginRoute,
          },
          {
            title: 'Register',
            link: '/'+authRoute+'/'+registerRoute,
          },
          {
            title: 'Request Password',
            link: '/'+authRoute+'/'+requestPasswordRoute,
          },
          {
            title: 'Reset Password',
            link: '/'+authRoute+'/'+resetPasswordRoute,
          },
        ],
      },
    ];

    return of([...dashboardMenu, ...menu]);
  }
}

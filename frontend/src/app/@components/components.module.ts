/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxValidationMessageComponent } from './validation-message/validation-message.component';
import {NgxResponseMessageComponent} from "./response-message/response-message.component";
import {NbAlertModule} from "@nebular/theme";

const COMPONENTS = [
  NgxValidationMessageComponent,
  NgxResponseMessageComponent,
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NbAlertModule,
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class ComponentsModule {
}

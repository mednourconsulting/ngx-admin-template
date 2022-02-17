/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {LanguageService} from "../../languages/language.service";

@Component({
    selector: 'ngx-validation-message',
    styleUrls: ['./validation-message.component.scss'],
    template: `
             <p class="caption status-danger"
                *ngIf="showMinLength">{{ translator('min_lenght_msg') }} {{ minLength }} {{ translator('characters') }}</p>
             <p class="caption status-danger"
                *ngIf="showMaxLength">{{ translator('max_lenght_msg') }} {{ maxLength }} {{ translator('characters') }}</p>
             <p class="caption status-danger" *ngIf="showPattern">{{ translator('pattern_msg') }}</p>
             <p class="caption status-danger" *ngIf="showRequired"> {{ translator('is_required_msg') }} </p>
             <p class="caption status-danger" *ngIf="showMin">{{ translator('min_value_msg') }}{{ min }}</p>
             <p class="caption status-danger" *ngIf="showMax">{{ translator('max_value_msg') }}{{ max }}</p>
             <p class="caption status-danger" *ngIf="showInmatched">{{ translator('inmatched_msg') }}</p>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxValidationMessageComponent),
            multi: true,
        },
    ],
})
export class NgxValidationMessageComponent {
  public languageService: LanguageService;


  constructor(languageService: LanguageService) {
    this.languageService = languageService;
  }

  @Input()
    label: string = '';

    @Input()
    showRequired?: boolean;

    @Input()
    min?: number;

    @Input()
    showMin?: boolean;

    @Input()
    max?: number;

    @Input()
    showMax: boolean;

    @Input()
    minLength?: number;

    @Input()
    showMinLength?: boolean;

    @Input()
    maxLength?: number;

    @Input()
    showMaxLength?: boolean;

    @Input()
    showPattern?: boolean;

    @Input()
    showInmatched?: boolean;

  translator( key: string) {
    return this.languageService.getLanguageText(key);
  }
}

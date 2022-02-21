/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, Input, forwardRef, OnInit} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {LanguageService} from "../languages/language.service";
import {Observable, of} from "rxjs";
import {MessagesService} from "../messages/messages.service";

@Component({
    selector: 'ngx-response-message',
    styleUrls: ['./response-message.component.scss'],
    template: `
            <nb-alert *ngIf="(errorMessage$ | async)?.length > 0 && !submitted " outline="danger" role="alert">
               <ul class="alert-message-list">
                 <li *ngFor="let error of (errorMessage$ | async) as errors" class="alert-message">{{ error }}</li>
               </ul>
             </nb-alert>
             <nb-alert *ngIf="(successMessage$ | async)?.length > 0 && !submitted" outline="success" role="alert">
               <ul class="alert-message-list">
                 <li *ngFor="let message of (successMessage$ | async) as messages" class="alert-message">{{ message }}</li>
               </ul>
             </nb-alert>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxResponseMessageComponent),
            multi: true,
        },
    ],
})
export class NgxResponseMessageComponent implements OnInit{
  @Input()
  submitted? : boolean;

  errorMessage$: Observable<string[]> = of([]);
  successMessage$: Observable<string[]> = of([]);
  private languageService: LanguageService;
  private messagesService: MessagesService;
    ngOnInit(): void {
      this.messagesService.clearErrorMessage();
      this.messagesService.clearSuccessMessage();
      this.errorMessage$ = this.messagesService.getErrorMessage();
      this.successMessage$ = this.messagesService.getSuccessMessage();
    }

  constructor(languageService: LanguageService, messagesService: MessagesService) {
    this.languageService = languageService;
    this.messagesService = messagesService;
  }

  translator( key: string) {
    return this.languageService.getLanguageText(key);
  }
}

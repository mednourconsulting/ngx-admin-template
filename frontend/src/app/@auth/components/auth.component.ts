/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';

import { NbAuthService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import {Observable, of} from "rxjs";
import {MessagesService} from "../../@components/messages/messages.service";

@Component({
  selector: 'ngx-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header >
            <nav class="navigation"*ngIf="showCardHeader">
              <a href="#" (click)="back()" class="link back-link" aria-label="Back">
                <nb-icon icon="arrow-back"></nb-icon>
              </a>
            </nav>
            <nb-alert *ngIf="(errorMessage$ | async)?.length > 0" outline="danger" role="alert">
              <ul class="alert-message-list" style="text-decoration: none">
                <li *ngFor="let error of (errorMessage$ | async) as errors" class="alert-message">{{ error }}</li>
              </ul>
            </nb-alert>
            <nb-alert *ngIf="(successMessage$ | async)?.length > 0 " outline="success" role="alert">
              <ul class="alert-message-list" style="text-decoration: none">
                <li *ngFor="let message of (successMessage$ | async) as messages" class="alert-message">{{ message }}</li>
              </ul>
            </nb-alert>
          </nb-card-header>
          <nb-card-body>
            <nb-auth-block>
              <router-outlet></router-outlet>
            </nb-auth-block>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NgxAuthComponent implements OnInit,OnDestroy {
  errorMessage$: Observable<string[]> = of([]);
  successMessage$: Observable<string[]> = of([]);
  private alive = true;

  subscription: any;

  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService, protected location: Location, protected messagesService: MessagesService) {

    this.subscription = auth.onAuthenticationChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }
  /**
   * Check if there is a token in local storage
   * if it's null that's mean we are deconnected => we don't need the back arrow
   * we can disable the nb-card-header
   **/
  showCardHeader : boolean = true;
  inLoginPage(){
    this.showCardHeader = localStorage.getItem('auth_app_token') != null;
  }

  back() {
    this.location.back();
    return false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
    this.inLoginPage();
    this.errorMessage$ = this.messagesService.getErrorMessage();
    this.successMessage$ = this.messagesService.getSuccessMessage();
  }
}

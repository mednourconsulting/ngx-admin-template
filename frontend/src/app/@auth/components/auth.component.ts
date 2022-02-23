import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';

import { NbAuthService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import {MessagesService} from "../../@components/messages/messages.service";

@Component({
  selector: 'ngx-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header *ngIf="showCardHeader">
            <nav class="navigation">
              <a href="#" (click)="back()" class="link back-link" aria-label="Back">
                <nb-icon icon="arrow-back"></nb-icon>
              </a>
            </nav>
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
  }
}

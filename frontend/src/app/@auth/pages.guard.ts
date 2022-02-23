/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {authRoute, loginRoute} from "./components";

@Injectable()
export class PagesGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .pipe(
        map(authenticated => {
          if (!authenticated) {
            this.router.navigate([authRoute, loginRoute]);
            return false;
          } else {
            return true;
          }
        }),
      );

  }
}

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanLoad, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const { url } = state;
      return this.checkAdminLogin(url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    console.log('CanActivateChild Guard is called');
    const { url } = state;
    return this.checkAdminLogin(url);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanLoad Guard is called');
    const url = `/${route.path}`;
    return this.checkAdminLogin(url) as boolean;
  }

  private checkAdminLogin(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn && this.authService.isAdmin) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page, return UrlTree
    this.router.navigate(['/login']);
    return false;
  }
}

import { Component, OnInit, DoCheck, AfterContentInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy  {

  public innerWidth: any;
  deviceInfo = null;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
  );

  private subs = new Subscription();
  public username: any;
  public userinfo: any;
  public scrollEvent: any;
  public contentMargin = 240;
  public opened: any = false;
  public cookieValue: any;
  public IpAddress: any;
  

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) { }


  // ************************************************************************************************************************
  // * NG EVENTS
  // ************************************************************************************************************************


  ngOnInit() {
   
  }

  ngOnDestroy() {
   }

}



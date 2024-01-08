import { Component, OnInit } from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';

import { AccountService } from '@app/_services';
import { User } from '@app/_models';
import { DatePipe, NgIf } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';


@Component({
  selector: 'app-menubar',
  templateUrl: 'menubar.component.html',
  styleUrls: ['menubar.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatBadgeModule,
    AlertComponent,
    NgIf, RouterLink, RouterLinkActive, DatePipe
  ]
})
export class MenubarComponent  {
  badgeVisible = false;
  openDrawer = false;
 // currentTime: Date;


  user?: User | null;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    if (this.user) { this.openDrawer = true; }
   // this.currentTime = new Date();
    
  }
  ngOnInit(): void {
    // Update the current time every second
    setInterval(() => {
    //  this.currentTime = new Date();
    }, 1000);
  }

  logout() {
    this.openDrawer = false;
    this.accountService.logout();
  }

  badgeVisibility() {
    this.badgeVisible = true;
  }
  
}




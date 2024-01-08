import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { User } from '@app/_models';
import { AccountService, BookService } from '@app/_services';
import { MatGridListModule } from
'@angular/material/grid-list';


@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    standalone: true,
    imports: [MatCardModule, CommonModule, MatGridListModule ],  
})
export class HomeComponent implements OnInit {
    user?: User | null;
    totalBooks?: number;
    status = false;
    addToggle() {
        this.status = !this.status;
    }


constructor(  
    private BooksService: BookService, 
    private accountService: AccountService) {
    this.user = this.accountService.userValue;

    }
    ngOnInit() {
        this.BooksService.getTotalBooks().subscribe(total => {
          this.totalBooks = total;
        });
      }
}
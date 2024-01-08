import { Component, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf,CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

import { Book } from '@app/_models';
import { BorrowersRecordService } from '@app/_services/borrow_record.service';
import { TableUtil } from '@app/_helpers/table.util';

@Component({ 
    selector: 'borrowers_record-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['borrowers_record.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule, CommonModule
    ], 
    providers:[DatePipe]
})
export class ListComponent implements OnInit {

    borrowers_record?: Book[];
    dataSource: any;
    displayedColumns: string[] = ['student', 'employee', 'book', 'date_borrowed', 'date_returned', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    
    constructor(private borrowersRecordService: BorrowersRecordService) {}


    ngOnInit() {
        this.getBorrwersRecord();
    }

    getBorrwersRecord() {
        this.borrowersRecordService.getAll()
            .pipe(first())
            .subscribe(borrowers_record => {
                this.borrowers_record = borrowers_record;
                this.dataSource = new MatTableDataSource<Book>(this.borrowers_record);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
            });
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("borrowers_record", "Books");
    }
}
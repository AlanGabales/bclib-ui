import { Component, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf, CommonModule, DatePipe } from '@angular/common';
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
import { BookService } from '@app/_services/book.service';
import { TableUtil } from '@app/_helpers/table.util';

@Component({ 
    selector: 'book-group-list-component',
    templateUrl: 'list-group.component.html',
    styleUrls: ['books.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf, CommonModule,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule
    ],
    providers: [DatePipe]
})
export class ListGroupComponent implements OnInit {

    books?: Book[];
    dataSource: any;
    displayedColumns: string[] = ['title', 'quantity'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;

    constructor(private bookService: BookService,
        public datePipe: DatePipe) {}

    ngOnInit() {
        this.getBooks();
    }

    getBooks() {
        this.bookService.getAllGroupByName()
            .pipe(first())
            .subscribe(books => {
                console.log(books);
                this.books = books;
                this.dataSource = new MatTableDataSource<Book>(this.books);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
                // this.dataSource.filterPredicate = (data: any, filter: string) => {
                //     return data.author?.full_name?.toLocaleLowerCase().includes(filter);
                // }
            });
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("books", "Books");
    }
}
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
import { MatTabsModule } from '@angular/material/tabs';
import { CategoryListComponent } from '@app/category/list.component';
import { PublisherComponent } from '@app/publisher/list.component';
import { AuthorComponent } from '@app/author/list.component';
import { CategoryAddEditComponent } from '@app/category/add-edit.component';

@Component({ 
    selector: 'book-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['books.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf, CommonModule,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule, MatTabsModule, CategoryListComponent, PublisherComponent, AuthorComponent, CategoryAddEditComponent
    ],
    providers: [DatePipe]
})
export class BookComponent implements OnInit {

    books?: Book[];
    dataSource: any;
    displayedColumns: string[] = ['accession','number', 'category', 'title', 'author', 'classification', 'book_status', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    constructor(private bookService: BookService,
        public datePipe: DatePipe) {}

    ngOnInit() {
        this.getBooks();
    }

    getBooks() {
        this.bookService.getAll()
            .pipe(first())
            .subscribe(books => {
                this.books = books;
                this.dataSource = new MatTableDataSource<Book>(this.books);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
                this.dataSource.filterPredicate = (data: any, filter: string) => {
                    console.log('data...', data.category)
                    return data.author?.full_name?.toLocaleLowerCase().includes(filter) ||
                    data.category?.name?.toLocaleLowerCase().includes(filter) ||//for feltering 
                    data.publisher?.name?.toLocaleLowerCase().includes(filter)||
                    data.book_status.toLocaleLowerCase().includes(filter)||
                    data.title.toLocaleLowerCase().includes(filter)||
                    data.accession?.name?.toLocaleLowerCase().includes(filter);
                }
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
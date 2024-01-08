import { Component, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
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

import { Author } from '@app/_models';
import { AuthorService } from '@app/_services/author.service';
import { TableUtil } from '@app/_helpers/table.util';

@Component({ 
    selector: 'author-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['authors.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule
    ]
})
export class AuthorComponent implements OnInit {

    authors?: Author[];
    dataSource: any;
    displayedColumns: string[] = [ 'name', 'number', 'status', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    constructor(private authorService: AuthorService) {}

    ngOnInit() {
        this.getAuthors();
    }

    getAuthors() {
        this.authorService.getAll()
            .pipe(first())
            .subscribe(authors => {
                this.authors = authors;
                this.dataSource = new MatTableDataSource<Author>(this.authors);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
            });
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("authors", "Authors");
    }
}
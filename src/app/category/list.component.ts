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

import { Category } from '@app/_models';
import { CategoryService } from '@app/_services/category.service';
import { TableUtil } from '@app/_helpers/table.util';

@Component({ 
    selector: 'category-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['categorys.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule
    ]
})
export class CategoryListComponent implements OnInit {

    categorys?: Category[];
    dataSource: any;
    displayedColumns: string[] = [ 'name', 'code', 'status', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    constructor(private categoryService: CategoryService) {}

    ngOnInit() {
        this.getCategorys();
    }

    getCategorys() {
        this.categoryService.getAll()
            .pipe(first())
            .subscribe(categorys => {
                this.categorys = categorys;
                this.dataSource = new MatTableDataSource<Category>(this.categorys);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
            });
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("categorys", "Categorys");
    }
}
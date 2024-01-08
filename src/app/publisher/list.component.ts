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

import { Publisher } from '@app/_models';
import { PublisherService } from '@app/_services/publisher.service';
import { TableUtil } from '@app/_helpers/table.util';

@Component({ 
    selector: 'publisher-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['publishers.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule
    ]
})
export class PublisherComponent implements OnInit {

    publishers?: Publisher[];
    dataSource: any;
    displayedColumns: string[] = [ 'name', 'status', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    constructor(private publisherService: PublisherService) {}

    ngOnInit() {
        this.getPublishers();
    }

    getPublishers() {
        this.publisherService.getAll()
            .pipe(first())
            .subscribe(publishers => {
                this.publishers = publishers;
                this.dataSource = new MatTableDataSource<Publisher>(this.publishers);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
            });
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("publishers", "Publishers");
    }
}
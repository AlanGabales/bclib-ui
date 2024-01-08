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

import { Accession } from '@app/_models';
import { AccessionService } from '@app/_services/accession.service';
import { TableUtil } from '@app/_helpers/table.util';

@Component({ 
    selector: 'accession-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['accession.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule
    ]
})
export class ListComponent implements OnInit {

    accessions?: Accession[];
    dataSource: any;
    displayedColumns: string[] = [ 'name', 'code', 'status', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    constructor(private accessionService: AccessionService) {}

    ngOnInit() {
        this.getAccessions();
    }

    getAccessions() {
        this.accessionService.getAll()
            .pipe(first())
            .subscribe(accessions => {
                this.accessions = accessions;
                this.dataSource = new MatTableDataSource<Accession>(this.accessions);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
            });
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("accessions", "Accessions");
    }
}
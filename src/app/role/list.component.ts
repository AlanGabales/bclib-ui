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

import { Role } from '@app/_models';
import { RoleService } from '@app/_services/role.service';
import { TableUtil } from '@app/_helpers/table.util';

@Component({ 
    selector: 'role-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['role.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule
    ]
})
export class ListComponent implements OnInit {

    role?: Role[];
    dataSource: any;
    displayedColumns: string[] = [ 'role', 'status', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    constructor(private roleService: RoleService) {}

    ngOnInit() {
        this.getRoles();
    }

    getRoles() {
        this.roleService.getAll()
            .pipe(first())
            .subscribe(role => {
                this.role = role;
                this.dataSource = new MatTableDataSource<Role>(this.role);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
            });
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("role", "Roles");
    }
}
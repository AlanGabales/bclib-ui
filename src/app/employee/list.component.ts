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

import { Employee } from '@app/_models';
import { EmployeeService } from '@app/_services/employee.service';
import { TableUtil } from '@app/_helpers/table.util';

@Component({ 
    selector: 'employee-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['employee.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule
    ]
})
export class EmployeeComponent implements OnInit {

    employee?: Employee[];
    dataSource: any;
    displayedColumns: string[] = [ 'employee_id', 'full_name', 'course', 'status', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    constructor(private employeeService: EmployeeService) {}

    ngOnInit() {
        this.getEmployee();
    }

    getEmployee() {
        this.employeeService.getAll()
            .pipe(first())
            .subscribe(employee => {
                this.employee = employee;
                this.dataSource = new MatTableDataSource<Employee>(this.employee);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
            });
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("employees", "Employees");
    }
}//
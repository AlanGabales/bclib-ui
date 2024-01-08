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

import { Student } from '@app/_models';
import { StudentService } from '@app/_services/student.service';
import { TableUtil } from '@app/_helpers/table.util';

@Component({ 
    selector: 'student-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['students.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule
    ]
})
export class StudentComponent implements OnInit {

    students?: Student[];
    dataSource: any;
    displayedColumns: string[] = ['student_id', 'full_name', 'year_level', 'course', 'status', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    constructor(private studentService: StudentService) {}

    ngOnInit() {
        this.getStudents();
    }

    getStudents() {
        this.studentService.getAll()
            .pipe(first())
            .subscribe(students => {
                this.students = students;
                this.dataSource = new MatTableDataSource<Student>(this.students);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
            });
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("students", "Students");
    }
}
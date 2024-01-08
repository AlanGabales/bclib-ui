import { Component, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { first } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

import { Course} from '@app/_models';
import { CourseService } from '@app/_services/course.service';
import { TableUtil } from '@app/_helpers/table.util';
import { MatTabsModule } from '@angular/material/tabs';
//import { AddEditComponent } from '@app/category/add-edit.component';
import { CategoryListComponent } from '@app/category/list.component';



@Component({ 
    selector: 'course-list-component',
    templateUrl: 'list.component.html',
    styleUrls: ['course.component.css'],
    standalone: true,
    imports: [
        RouterLink, NgFor, NgIf,
        MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
        MatIconModule, MatTabsModule, RouterOutlet, CategoryListComponent
    ]
})

export class CourseComponent implements OnInit {

    course?: Course[];
    dataSource: any;
    displayedColumns: string[] = [ 'course_name', 'code','updated_at', 'status', 'action'];
    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatSort;
    
    constructor(private courseService: CourseService) {}

    ngOnInit() {
        this.getCourse();
    }

    getCourse() {
        this.courseService.getAll()
            .pipe(first())
            .subscribe(course => {
                this.course = course;
                console.log(this.course);
                this.dataSource = new MatTableDataSource<Course>(this.course);
                this.dataSource.paginator=this.paginator;
                this.dataSource.sort=this.sort;
            });
            
    }

    filterChange(data: Event){
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    exportTable() {
        TableUtil.exportTableToExcel("course", "Course");
    }
}
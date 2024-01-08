import { Component, OnInit } from '@angular/core';
import { NgIf, NgClass, CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { first, map, startWith } from 'rxjs/operators';

import { EmployeeService,  CourseService } from '@app/_services';
import { Status } from '@app/_helpers/enums/status';
import { Course } from '@app/_models';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AlertService } from '@app/_components/alert/alert.service';



@Component({
    templateUrl: 'add-edit.component.html',
    styleUrls: ['employee.component.css'],
    standalone: true,
    imports: [
        NgIf, ReactiveFormsModule, NgClass, CommonModule, RouterLink,
        MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
        MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule
    ]
})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    courses!:Course[];
    filteredOptionsCur!: Observable<Course[]>;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private employeeService: EmployeeService,
        private alertService: AlertService,
        private CourseService: CourseService

    ) { }
    options = {
        autoClose: true,
        keepAfterRouteChange: true
    };
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            employee_id: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            full_name: [''],
            course: ['', Validators.required],
            description: [''],
            status: [Status.ENABLED, Validators.required]
        });
        this.loadCourses();
        this.title = 'Add Employee';
        if (this.id) {
            // edit mode
            this.title = 'Edit Employee';
            this.loading = true;
            this.employeeService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.get('course')?.patchValue(x.course);
                    this.form.patchValue(x);
                    this.loading = false;
                });

        }
        /** Course filter */
        this.filteredOptionsCur = this.form.get('course')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this._listfilterCur(name as string) : this.courses?.slice();
            }),
        );

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // /stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveEmployee()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Employee saved', this.options);
                    this.router.navigateByUrl('/employee');
                },
                error: (error: string) => {
                    this.alertService.error(error), this.options;
                    this.submitting = false;
                }
            })
    }

    private saveEmployee() {
        // create or update employee based on id param
        return this.id
            ? this.employeeService.update(this.id!, this.form.value)
            : this.employeeService.create(this.form.value);
    }
    
     
    /** Courses */
    loadCourses(){
        this.CourseService.getAllEnabled().subscribe(courses => {
            this.courses = courses;
        })
    }

    private _listfilterCur(name: string): Course[] {
        const filterValue = name.toLowerCase();
        return this.courses?.filter(option => option.course_name?.toLowerCase().includes(filterValue));
    }

    displayFnCur(course: Course): string {
        return course && course.course_name ? course.course_name : '';
    }

    //restrick the number
    onKeypressnumber(event: KeyboardEvent) {
        const charCode = event.charCode;
        if (/[0-9]/.test(String.fromCharCode(charCode))) {
          event.preventDefault();
        }
      }
}
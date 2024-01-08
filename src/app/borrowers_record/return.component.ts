import { Component, OnInit } from '@angular/core';
import { NgIf, NgClass, CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { first, map, startWith } from 'rxjs/operators';

import { BorrowersRecordService, StudentService, EmployeeService, BookService } from '@app/_services';
import { BookStatus, BooksStatus, ReturnStatus, Status, borrower_type } from '@app/_helpers/enums/status';
import { Observable } from 'rxjs';
import { Student, Employee, Book } from '@app/_models';

import { AlertService } from '@app/_components/alert/alert.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({ 
    templateUrl: 'add-edit.component.html',
    styleUrls: ['borrowers_record.component.css'],
    standalone: true,
    imports: [
        NgIf, ReactiveFormsModule, NgClass, CommonModule, RouterLink,
        MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
        MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatIconModule,
       
    ]
})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
  


    students!:Student[];
    filteredOptionsStu!: Observable<Student[]>;

    employees!:Employee[];
    filteredOptionsEmp!: Observable<Employee[]>;

    books!:Book[];
    filteredOptionsBook!: Observable<Book[]>;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private borrowers_recordService: BorrowersRecordService,
        private studentService: StudentService,
        private employeeService: EmployeeService,
        private bookService: BookService,
        private alertService: AlertService
    ) { }
    options = {
        autoClose: true,
        keepAfterRouteChange: true
    };
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
          //  name: ['', Validators.required],
            borrower_type: [borrower_type.STUDENT, Validators.required],
            student: ['', Validators.required],
            employee: ['', Validators.required],
            book: ['', Validators.required],
            date_returned: ['', Validators.required],
            remarks: [''],
            books_status: [BookStatus.CHECKEDOUT, Validators.required],
            return_status: [''],
            fee:['']
        });

        this.loadStudents();
        this.loadEmployees();
        this.loadBooks();

        this.title = 'Add Borrowers Record';
        if (this.id) {
            // edit mode
            this.title = 'Edit Borrowers Record';
            this.loading = true;
            this.borrowers_recordService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.get('student')?.patchValue(x.student);
                    this.form.get('employee')?.patchValue(x.employee);
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }

        /** Student filter */
        this.filteredOptionsStu = this.form.get('student')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                const full_name = typeof value === 'string' ? value : value?.full_name;
                return full_name ? this._listfilterStu(full_name as string) : this.students?.slice();
            }),
        );
        
        /** Employee filter */
        this.filteredOptionsEmp = this.form.get('employee')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                const full_name = typeof value === 'string' ? value : value?.full_name;
                return full_name ? this._listfilterEmp(full_name as string) : this.employees?.slice();
            }),
        );

        /** Book filter */
        this.filteredOptionsBook = this.form.get('book')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                const title = typeof value === 'string' ? value : value?.title;
                return title ? this._listfilterBook(title as string) : this.books?.slice();
            }),
        );
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        
        this.submitting = true;
        this.saveBorrowersRecord()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Borrowers Record saved', this.options);
                    this.router.navigateByUrl('/borrowers-record');
                },
                error: (error: string) => {
                    this.alertService.error(error),this.options;
                    this.submitting = false;
                }
            })
    }

    private saveBorrowersRecord() {
        // create or update borrowers_record based on id param
        return this.id
            ? this.borrowers_recordService.update(this.id!, this.form.value)
            : this.borrowers_recordService.create(this.form.value);
    }

    /** Students */
    loadStudents(){
        this.studentService.getAllEnabled().subscribe(students => {
            this.students = students;
        })
    }

    private _listfilterStu(full_name: string): Student[] {
        const filterValue = full_name.toLowerCase();
        return this.students?.filter(option => option.full_name?.toLowerCase().includes(filterValue));
    }

    displayFnStu(student: Student): string {
        return student && student.full_name ? student.full_name: '';
    }

    /** Employee */
    loadEmployees(){
        this.employeeService.getAllEnabled().subscribe(employees => {
            this.employees =employees;
        })
    }

    private _listfilterEmp(full_name: string): Employee[] {
        const filterValue = full_name.toLowerCase();
        return this.employees?.filter(option => option.full_name?.toLowerCase().includes(filterValue));
    }

    displayFnEmp(employee: Employee): string {
        return employee && employee.full_name ? employee.full_name : '';
    }

    /** Books */
    loadBooks(){
        this.bookService.getAllEnabled().subscribe(books => {
            this.books = books;
        })
    }

    private _listfilterBook(title: string): Book[] {
        const filterValue = title.toLowerCase();
        return this.books?.filter(option => option.title?.toLowerCase().includes(filterValue));
    }

    displayFnBook(book: Book): string {
        return book && book.title ? book.title : '';
    }

    //restrick the number
    onKeypressnumber(event: KeyboardEvent) {
        const charCode = event.charCode;
        if (/[0-9]/.test(String.fromCharCode(charCode))) {
          event.preventDefault();
        }
      }

      // restrick the charater
    onKeypress(event: KeyboardEvent) {
        const charCode = event.charCode;
        if ((charCode < 48) || (charCode > 57)) {
          event.preventDefault();
        }
      }
      
}
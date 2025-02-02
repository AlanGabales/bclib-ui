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

import { BookService, AlertService, AuthorService, CategoryService, PublisherService } from '@app/_services';
import { Status } from '@app/_helpers/enums/status';
import { Observable } from 'rxjs';
import { Author, Category, Publisher } from '@app/_models';

@Component({ 
    templateUrl: 'add-edit.component.html',
    styleUrls: ['books.component.css'],
    standalone: true,
    imports: [
        NgIf, ReactiveFormsModule, NgClass, CommonModule, RouterLink,
        MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
        MatSelectModule, MatAutocompleteModule
    ]
})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    authors!:Author[];
    filteredOptions!: Observable<Author[]>;

    categories!:Category[];
    filteredOptionsCat!: Observable<Category[]>;

    publishers!:Publisher[];
    filteredOptionsPub!: Observable<Publisher[]>;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private bookService: BookService,
        private authorService: AuthorService,
        private categoryService: CategoryService,
        private publisherService: PublisherService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            author: ['', Validators.required],
            category: ['', Validators.required],
            publisher: ['', Validators.required],
            description: [''],
            access_book_num: [''],
            status: [Status.ENABLED, Validators.required]
        });

        this.loadAuthors();
        this.loadCategories();
        this.loadPublishers();

        this.title = 'Add Book';
        if (this.id) {
            // edit mode
            this.title = 'Edit Book';
            this.loading = true;
            this.bookService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.get('author')?.patchValue(x.author);
                    this.form.get('category')?.patchValue(x.category);
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }

        /** Author filter */
        this.filteredOptions = this.form.get('author')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this._listfilter(name as string) : this.authors?.slice();
            }),
        );
        
        /** Category filter */
        this.filteredOptionsCat = this.form.get('category')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this._listfilterCat(name as string) : this.categories?.slice();
            }),
        );

        /** Publisher filter */
        this.filteredOptionsPub = this.form.get('publisher')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this._listfilterPub(name as string) : this.publishers?.slice();
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
        this.saveBook()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Book saved', true);
                    this.router.navigateByUrl('/books');
                },
                error: (error: string) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveBook() {
        // create or update book based on id param
        return this.id
            ? this.bookService.update(this.id!, this.form.value)
            : this.bookService.create(this.form.value);
    }

    /** Authors */
    loadAuthors(){
        this.authorService.getAllEnabled().subscribe(authors => {
            this.authors = authors;
        })
    }

    private _listfilter(name: string): Author[] {
        const filterValue = name.toLowerCase();
        return this.authors?.filter(option => option.name?.toLowerCase().includes(filterValue));
    }

    displayFn(author: Author): string {
        return author && author.name ? author.name : '';
    }

    /** Categories */
    loadCategories(){
        this.categoryService.getAllEnabled().subscribe(categories => {
            this.categories = categories;
        })
    }

    private _listfilterCat(name: string): Category[] {
        const filterValue = name.toLowerCase();
        return this.categories?.filter(option => option.name?.toLowerCase().includes(filterValue));
    }

    displayFnCat(category: Category): string {
        return category && category.name ? category.name : '';
    }

    /** Publishers */
    loadPublishers(){
        this.publisherService.getAllEnabled().subscribe(publishers => {
            this.publishers = publishers;
        })
    }

    private _listfilterPub(name: string): Publisher[] {
        const filterValue = name.toLowerCase();
        return this.publishers?.filter(option => option.name?.toLowerCase().includes(filterValue));
    }

    displayFnPub(publisher: Publisher): string {
        return publisher && publisher.name ? publisher.name : '';
    }
}
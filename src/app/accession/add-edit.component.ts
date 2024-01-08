import { Component, OnInit } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { first } from 'rxjs/operators';

import { AccessionService } from '@app/_services';
import { Status } from '@app/_helpers/enums/status';
import { AlertService } from '@app/_components/alert/alert.service';


@Component({ 
    templateUrl: 'add-edit.component.html',
    styleUrls: ['accession.component.css'],
    standalone: true,
    imports: [
        NgIf, ReactiveFormsModule, NgClass, RouterLink,
        MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
        MatSelectModule
    ]
})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private AccessionService: AccessionService,
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
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: [''],
            status: [Status.ENABLED, Validators.required]
        });

        this.title = 'Add Accession';
        if (this.id) {
            // edit mode
            this.title = 'Edit Accession';
            this.loading = true;
            this.AccessionService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
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
        this.saveAccession()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Accession saved', this.options);
                    this.router.navigateByUrl('/accessions');
                },
                error: (error: string) => {
                    this.alertService.error(error), this.options;                    
                    this.submitting = false;
                }
                
            })
    }

    private saveAccession() {
        // create or update Accession based on id param
        return this.id
            ? this.AccessionService.update(this.id!, this.form.value)
            : this.AccessionService.create(this.form.value);
    }

      //restrick the number
      onKeypressnumber(event: KeyboardEvent) {
        const charCode = event.charCode;
        if (/[0-9]/.test(String.fromCharCode(charCode))) {
          event.preventDefault();
        }
      }
}
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

import { AccountService } from '@app/_services';
//import { Role } from '@app/_helpers/enums/role';
import { Status } from '@app/_helpers/enums/status';
import { AlertService } from '@app/_components/alert/alert.service';
import { User } from '@app/_models/user';

@Component({ 
    selector: 'profile-component',
    templateUrl: 'profile.component.html',
    styleUrls: ['add-edit.component.css'],
    standalone: true,
    imports: [
        NgIf, ReactiveFormsModule, NgClass, RouterLink,
        MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
        MatSelectModule
    ]
})
export class ProfileComponent implements OnInit {
    user?: User | null;
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    username = '';

    options = {
        autoClose: true,
        keepAfterRouteChange: true
    };

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { 
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {
        console.log(this.user?.user)
        this.id = this.user?.user?.id;

        // form with validation rules
        this.form = this.formBuilder.group({
            // password only required in add mode
            password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]]
        });

        if (this.id) {
            // edit mode
            this.title = 'Profile';
            this.loading = true;
            this.accountService.getById(this.id)
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
        this.saveUser()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User saved', this.options);
                    this.submitting = false;
                    this.router.navigateByUrl('/users/profile/'+this.user?.user?.id);
                },
                error: error => {
                    this.alertService.error(error, this.options);
                    this.submitting = false;
                }
            })
    }

    private saveUser() {
        // update user based on id param
        return this.accountService.update(this.id!, this.form.value)
    }
}
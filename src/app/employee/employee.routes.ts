import { Routes } from '@angular/router';

import { EmployeeComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

export const EMPLOYEE_ROUTES: Routes = [
    { path: '', component: EmployeeComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent }
];
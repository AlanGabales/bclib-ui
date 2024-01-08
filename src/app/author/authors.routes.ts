import { Routes } from '@angular/router';

import { AuthorComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

export const AUTHORS_ROUTES: Routes = [
    { path: '', component: AuthorComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent }
];
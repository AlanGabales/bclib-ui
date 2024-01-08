import { Routes } from '@angular/router';

import { PublisherComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

export const PUBLISHERS_ROUTES: Routes = [
    { path: '', component: PublisherComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent }
];
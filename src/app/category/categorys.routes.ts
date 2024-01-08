import { Routes } from '@angular/router';

import { CategoryAddEditComponent } from './add-edit.component';
import { CategoryListComponent } from './list.component';

export const CATEGORYS_ROUTES: Routes = [
    { path: '', component: CategoryListComponent },
    { path: 'addcategory', component: CategoryAddEditComponent },
    { path: 'editcategory/:id', component: CategoryAddEditComponent }
    
];
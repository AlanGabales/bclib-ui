import { Routes } from '@angular/router';
import { authGuard } from '../_helpers';

import { BookComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ViewComponent } from './view.component';
import { ListGroupComponent } from './list-group.component';
import { CategoryAddEditComponent } from '@app/category/add-edit.component';
import { CategoryListComponent } from '@app/category/list.component';
//const categorysRoutes = () => import('../category/categorys.routes').then(x => x.CATEGORYS_ROUTES);

export const BOOKS_ROUTES: Routes = [
    { path: '', component: BookComponent },    
    { path: 'groups', component: ListGroupComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'editbook/:id', component: AddEditComponent },
    { path: 'view/:id', component: ViewComponent },
    { path: 'groups', component: ListGroupComponent },
    { path: './', component: CategoryListComponent },
    { path: 'addcategory', component: CategoryAddEditComponent },
    { path: 'editcategory/:id', component: CategoryAddEditComponent },
   /// { path: 'categorys', loadChildren: categorysRoutes, canActivate: [authGuard] },

]
    
import { Routes } from '@angular/router';

import { CourseComponent } from './list.component';
import { CourseAddEditComponent } from './add-edit.component';
import { CourseViewComponent } from './view.component';
import { CategoryListComponent } from '@app/category/list.component';
import { authGuard } from '@app/_helpers/auth.guard';
import { LogsComponent } from './logs.component';
//const publishersRoutes = () => import('../publisher/publishers.routes').then(x => x.PUBLISHERS_ROUTES);



export const COURSE_ROUTES: Routes = [
    { path: '', component: CourseComponent },
    { path: 'add', component: CourseAddEditComponent },
    { path: 'editcourse/:id', component: CourseAddEditComponent },
    { path: 'view/:id', component: CourseViewComponent },
    { path: 'list', component: CategoryListComponent },
    // { path: 'publishers', loadChildren: publishersRoutes, canActivate: [authGuard] },
    { path: 'logs', component: LogsComponent },




];
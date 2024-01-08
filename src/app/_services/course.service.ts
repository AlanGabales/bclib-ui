import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@app/environments/environment';
import { Course } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CourseService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<Course[]>(`${environment.apiUrl}/course`);
    }

    getAllEnabled() {
        return this.http.get<Course[]>(`${environment.apiUrl}/course/enabled`);
    }

    create(course: Course) {
        return this.http.post(`${environment.apiUrl}/course`, course);
    }

    getById(id: string) {
        return this.http.get<Course>(`${environment.apiUrl}/course/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/course/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
}
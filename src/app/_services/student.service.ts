import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@app/environments/environment';
import { Student } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class StudentService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<Student[]>(`${environment.apiUrl}/students`);
    }
    getAllEnabled() {
        return this.http.get<Student[]>(`${environment.apiUrl}/students/enabled`);
    }

    create(student: Student) {
        return this.http.post(`${environment.apiUrl}/students`, student);
    }

    getById(id: string) {
        return this.http.get<Student>(`${environment.apiUrl}/students/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/students/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
}
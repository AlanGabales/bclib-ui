import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@app/environments/environment';
import { Employee } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<Employee[]>(`${environment.apiUrl}/employees`);
    }

    getAllEnabled() {
        return this.http.get<Employee[]>(`${environment.apiUrl}/employees/enabled`);
    }

    create(Employee:Employee) {
        return this.http.post(`${environment.apiUrl}/employees`, Employee);
    }

    getById(id: string) {
        return this.http.get<Employee>(`${environment.apiUrl}/employees/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/employees/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
}
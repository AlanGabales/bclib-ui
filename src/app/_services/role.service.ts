import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@app/environments/environment';
import { Role } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class RoleService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<Role[]>(`${environment.apiUrl}/roles`);
    }

    getAllEnabled() {
        return this.http.get<Role[]>(`${environment.apiUrl}/roles/enabled`);
    }

    create(roles: Role) {
        return this.http.post(`${environment.apiUrl}/roles`, roles);
    }

    getById(id: string) {
        return this.http.get<Role>(`${environment.apiUrl}/roles/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/roles/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
}
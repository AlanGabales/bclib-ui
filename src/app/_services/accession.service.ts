import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@app/environments/environment';
import { Accession } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccessionService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<Accession[]>(`${environment.apiUrl}/accessions`);
    }

    getAllEnabled() {
        return this.http.get<Accession[]>(`${environment.apiUrl}/accessions/enabled`);
    }

    create(accession: Accession) {
        return this.http.post(`${environment.apiUrl}/accessions`,accession);
    }

    getById(id: string) {
        return this.http.get<Accession>(`${environment.apiUrl}/accessions/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/accessions/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
}
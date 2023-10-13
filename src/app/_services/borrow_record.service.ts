import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@app/environments/environment';
import { borrow_record } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class borrow_recordService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<borrow_record[]>(`${environment.apiUrl}/BorrowRecord`);
    }

    create(borrow_record: borrow_record) {
        return this.http.post(`${environment.apiUrl}/BorrowRecord`, borrow_record);
    }

    getById(id: string) {
        return this.http.get<borrow_record>(`${environment.apiUrl}/BorrowRecord/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/BorrowRecord/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
}
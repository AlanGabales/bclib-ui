import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@app/environments/environment';
import { BorrowersRecord } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class BorrowersRecordService  {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<BorrowersRecord[]>(`${environment.apiUrl}/borrowers-record`);
    }

    create(BorrowersRecord: BorrowersRecord) {
        return this.http.post(`${environment.apiUrl}/borrowers-record`, BorrowersRecord);
    }

    getById(id: string) {
        return this.http.get<BorrowersRecord>(`${environment.apiUrl}/borrowers-record/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/borrowers-record/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }
}
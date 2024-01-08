import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@app/environments/environment';
import { Book } from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<Book[]>(`${environment.apiUrl}/books`);
    }
    
    getAllEnabled() {
        return this.http.get<Book[]>(`${environment.apiUrl}/books/enabled`);
    }

    getAllGroupByName() {
        return this.http.get<Book[]>(`${environment.apiUrl}/books/group-by-name`);
    }

    create(book: Book) {
        return this.http.post(`${environment.apiUrl}/books`, book);
    }

    getById(id: string) {
        return this.http.get<Book>(`${environment.apiUrl}/books/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/books/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    getTotalBooks() {
        return this.http.get<number>(`${environment.apiUrl}/total`);
      }
}
/*
* This API was implemented in: https://github.com/hugoestevam/nodejs-desafio-01
* If you need to integrate them, please clone this repository.
* By @hugoestevam
*/
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Repository } from '../model/repository';

@Injectable()
export class RepositoryService {
  private baseUrl = 'http://localhost:3333'; // URL to web api

  constructor(@Inject(HttpClient) private http: HttpClient) {  }

  get() : Observable<Repository[]> {
    return this.http
      .get<Repository[]>(this.baseUrl + '/repositories')
      .pipe(map(data => data), catchError(this.handleError));
  }

  delete(id: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/repositories/${id}`;

    return this.http.delete<Repository>(url).pipe(catchError(this.handleError));
  }

  post(repo: Repository) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Repository>(this.baseUrl + '/repositories', repo)
      .pipe(catchError(this.handleError));
  }

  put(repo: Repository) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/repositories/${repo.id}`;

    return this.http.put<Repository>(url, repo).pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
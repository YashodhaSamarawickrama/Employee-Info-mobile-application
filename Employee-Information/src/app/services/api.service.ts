import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = "https://gorest.co.in/public-api/users";
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError('Something went wrong; please try again later.');
  };

  // Add a new employee
  createEmployee(item): Observable<Employee> {
    return this.http
      .post<Employee>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

    // Get employee detail data by ID
    getEmployee(id): Observable<Employee> {
      return this.http
        .get<Employee>(this.base_path + '/' + id)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
   
    // Get employee list
    getList(): Observable<Employee> {
      return this.http
        .get<Employee>(this.base_path)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
   
    // Update employee by id
    updateEmployee(id, item): Observable<Employee> {
      return this.http
        .put<Employee>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
   
    // Delete emplpyee by id
    deleteEmployee(id) {
      return this.http
        .delete<Employee>(this.base_path + '/' + id, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError))
 



}

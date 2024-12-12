// customer-service.service.ts
import { Injectable } from '@angular/core';
import { Customer } from './models/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:5187/api/Customer';
  private loggedInCustomer: Customer | null = null;

  constructor(private http: HttpClient) {
    
    
  }

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  postCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/CustomerPost`, customer);
  }

  setLoggedInCustomer(customer: Customer): void {
    this.loggedInCustomer = customer;
    localStorage.setItem('loggedInCustomer', JSON.stringify(customer)); // שמירה ב-localStorage
  }

  getLoggedInCustomer(): Customer | null {
    return this.loggedInCustomer;
  }

  clearLoggedInCustomer(): void {
    this.loggedInCustomer = null;
    localStorage.removeItem('loggedInCustomer'); // מחיקה מה-localStorage
  }
}

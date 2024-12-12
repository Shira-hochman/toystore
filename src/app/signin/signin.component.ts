import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Customer } from '../models/customer';
import { CustomerService } from '../customer-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule, CardModule, ButtonModule, InputTextModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})

export class SigninComponent {
  public customer: Customer = {
    customerId: 0, // מזהה הלקוח ייקבע אוטומטית על ידי השרת
    customerName: '',
    email: '',
    phone: '',
    birthDate: new Date(),
  };
  birthDateError = false;

  constructor(private router: Router, private customerService: CustomerService) {}
  validateBirthDate() {
    const birthYear = new Date(this.customer.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    this.birthDateError = birthYear < 1900 || birthYear > currentYear;
  }
  post(): void {
    this.customerService.postCustomer(this.customer).subscribe({
      next: (response: Customer) => {
        console.log('לקוח נוסף בהצלחה:', response);
        // שמירת הלקוח עם ה-ID שנוצר מהשרת
        this.customerService.setLoggedInCustomer(response); 
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('שגיאה בהוספת הלקוח:', error);
        alert('שגיאה בהוספת הלקוח. אנא נסה שוב.');
      },
    });
  }
}

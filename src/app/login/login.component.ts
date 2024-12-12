import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule  } from 'primeng/inputtext';
import { CustomerService } from '../customer-service.service';
import { Customer } from '../models/customer';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,CommonModule,CheckboxModule,FloatLabelModule, FormsModule, CardModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name: string = '';
  email: string = '';
  accept: boolean = false;
 
  constructor(private router: Router, private customerservice: CustomerService) {}

  checkCustomer(): void {
    if (!this.name || !this.email) {
      alert('נא למלא את כל השדות.');
      return;
    }
  
    this.customerservice.getCustomer().subscribe(
      (customers: Customer[]) => {
        const currentCustomer = customers.find(
          (customer) => customer.customerName === this.name && customer.email === this.email
        );
  
        if (currentCustomer) {
          this.customerservice.setLoggedInCustomer(currentCustomer); // שמור את המשתמש המחובר
          this.router.navigate(['/payment']);
        } else {
          alert('הלקוח לא קיים במערכת. נא להירשם.');
          this.router.navigate(['/signin']);
        }
      },
      (error) => {
        console.error('Error fetching customers:', error);
        alert('אירעה שגיאה בעת בדיקת הלקוח. אנא נסו שוב מאוחר יותר.');
      }
    );
  }
}

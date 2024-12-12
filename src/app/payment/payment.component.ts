import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ShoppingBasketService } from '../shopping-basket-service.service';
import { CustomerService } from '../customer-service.service';
import { Customer } from '../models/customer';
import { Basket } from '../models/basket';
import { Purchases } from '../models/purchases';
import { PurchaseDetails } from '../models/purchase-details';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,CommonModule, CardModule, ButtonModule, InputTextModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  constructor(
    private customerService: CustomerService,
    private shoppingBasketService: ShoppingBasketService
    
  ) {}

  toPay(): void {
    const currentCustomer = this.customerService.getLoggedInCustomer();

    if (!currentCustomer) {
      alert('לא נמצא לקוח מחובר. אנא התחבר מחדש.');
      return;
    }

    console.log('ID של הלקוח הוא:', currentCustomer.customerId);

    const basketItems: Basket[] = this.shoppingBasketService.myBagList;
    if (!basketItems || basketItems.length === 0) {
      alert('הסל ריק. אנא הוסף פריטים לסל.');
      return;
    }

    const totalAmount: number = basketItems.reduce(
      (sum: number, item: Basket) => sum + item.totalPrice,
      0
    );

    const purchase: Purchases = {
      purchaseId: 0,
      customerId: currentCustomer.customerId,
      purchaseDate: new Date(),
      note: '',
      totalAmount,
    };

    console.log('פרטי הרכישה:', purchase);
    this.postPurchase(purchase, basketItems);
  }

  postPurchase(purchase: Purchases, basketItems: Basket[]): void {
    this.shoppingBasketService.postPurchases(purchase).subscribe({
      next: (response: Purchases) => {
        console.log('הרכישה בוצעה בהצלחה:', response);
        alert('התשלום בוצע בהצלחה!');
        
        const purchaseId = response.purchaseId;  // ה-ID החדש של הרכישה
        if (purchaseId && purchaseId !== 0) {
          this.postPurchaseDetails(purchaseId, basketItems);
        } else {
          console.error('ID הרכישה לא התעדכן כראוי');
          alert('שגיאה בהוספת פרטי הרכישה');
        }
      },
      error: (error) => {
        console.error('שגיאה בהוספת הרכישה:', error);
        alert('שגיאה בהוספת הרכישה. אנא נסה שוב.');
      },
    });
  }
  
  

  postPurchaseDetails(purchaseId: number, basketItems: Basket[]): void {
    const purchaseDetailsList: PurchaseDetails[] = basketItems.map((item: Basket) => {
      return {
        purchaseDetailsId: 0, // ייווצר אוטומטית ב-SQL
        purchaseId: purchaseId,
        productId: item.product.productId,
        quantity: item.amount,
      };
    });

    console.log("רשימת פרטי הרכישה שנשלחת:", purchaseDetailsList);

    // שולחים את הרשימה דרך ה-SERVICE
    this.shoppingBasketService.postDetails(purchaseDetailsList).subscribe({
      next: (response: PurchaseDetails[]) => {
        console.log('פרטי הרכישה נוספו בהצלחה:', response);
      },
      error: (error) => {
        console.error('שגיאה בהוספת פרטי הרכישה:', error);
        alert('שגיאה בהוספת פרטי הרכישה. אנא נסה שוב.');
      },
    });
  }
}

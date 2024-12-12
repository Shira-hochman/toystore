import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ShoppingBasketService } from '../shopping-basket-service.service';
import { MessageService } from 'primeng/api';
import {Basket}from '../models/basket'
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  providers: [MessageService]
})
export class ProductDetailsComponent {
  @Input() product!: Product;
  @Output() goBack = new EventEmitter<void>();
  showAddToBasketMessage: boolean = false; 
  constructor(private shoppingBasketService: ShoppingBasketService ,private messageService: MessageService) {}
  
  backToList(): void {
    this.goBack.emit();
  }

  addToCard(p: Product, event: MouseEvent) {
    event.stopPropagation();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'המוצר נוסף בהצלחה' });
    this.showAddToBasketMessage = true;
    setTimeout(() => {
      this.showAddToBasketMessage = false;
    }, 1500); // ההודעה תיעלם אחרי 5 שניות
    this.messageService.add({
      severity: 'success',
      summary: 'פעולה הצליחה',
      detail: 'הפריט נוסף בהצלחה לסל הקניות!',
    });
    if (
      this.shoppingBasketService.myBagList.length > 0 && this.shoppingBasketService.myBagList.find(a => a.product.productName == p.productName)) {
        this.shoppingBasketService.myBagList[this.shoppingBasketService.myBagList.indexOf(this.shoppingBasketService.myBagList.filter(a => a.product.productId== p.productId)[0])].amount++;
        this.shoppingBasketService.myBagList[this.shoppingBasketService.myBagList.indexOf(this.shoppingBasketService.myBagList.filter(a => a.product.productId == p.productId)[0])].totalPrice += p.price;
    }
    
    else
        this.shoppingBasketService.myBagList.push(new Basket(p, 1, p.price));
}


}

import { Component, OnInit } from '@angular/core';
import { ShoppingBasketService } from '../shopping-basket-service.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Card, CardModule } from 'primeng/card';
import { Product } from '../models/product';
import { Router, RouterModule } from '@angular/router'; // ייבוא Router ו-RouterModule
import { ChangeDetectionStrategy } from '@angular/core';
import {Basket} from '../models/basket'
import {ProductsServiceService} from '../products-service.service'
@Component({
  selector: 'app-shopping-basket',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, RouterModule,], // הוספת RouterModule
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css'],
  
})
export class ShoppingBasketComponent implements OnInit {
  basket: { product: Product; quantity: number }[] = [];
  cards:Basket[];
  numP:number=0;
  sum:number=0;
 
  constructor( private productService:ProductsServiceService , private shoppingBasketService: ShoppingBasketService, private router: Router) {
    this.cards=this.shoppingBasketService.myBagList;
    this.shoppingBasketService.myBagList.map(a=>this.numP+=a.amount)
    this.cards.map(a=>this.sum+=a.totalPrice);} // הוספת Router

  ngOnInit(): void {
   
  }
  remove(c:Basket){
    this.cards=this.cards.filter(a =>c.product.productName!=a.product.productName);
    this.shoppingBasketService.myBagList=this.cards;
    this.numP-=c.amount;
    this.sum-=c.totalPrice;
    this.sum = parseFloat(this.sum.toFixed(1));
  }
  increase(c:Basket) {
    if (c.amount<9){
      c.amount++;
      c.totalPrice+=c.product.price;
      this.sum+=c.product.price;
      this.numP++;
    }
   
  }
  
  decrease(c:Basket) {
    if (c.amount>1){
      c.totalPrice-=c.product.price;
      c.amount--;
      this.sum-=c.product.price;
      this.numP--;
    }
    }
  proceedToForm(): void {
    this.router.navigate(['/login']); // ניווט לנתיב של רכיב הטופס
  }
}

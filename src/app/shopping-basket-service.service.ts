import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product';
import{Basket} from './models/basket'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import{Purchases}from './models/purchases'
import {PurchaseDetails} from './models/purchase-details'
@Injectable({
  providedIn: 'root',
})
export class ShoppingBasketService {
 
  myBagList:Basket[]=[];
  constructor(private http:HttpClient){}
 postPurchases(purchases: Purchases): Observable<Purchases> {
    return this.http.post<Purchases>(
      "http://localhost:5187/api/purchases/purchasesPost",
      purchases
    );

}
postDetails(purchaseDetailsList: PurchaseDetails[]): Observable<PurchaseDetails[]> {
  return this.http.post<PurchaseDetails[]>(
    "http://localhost:5187/api/PurchaseDetails/PurchaseDetailsPost",
    purchaseDetailsList
  );
}




}
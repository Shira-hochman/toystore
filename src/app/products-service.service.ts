import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../app/models/category';
import {Basket}from './models/basket'
@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor(private http:HttpClient) { }
  

    getProduct():Observable<Product[]>{
      return this.http.get<Product[]>("http://localhost:5187/api/Products")
    }

    getCategoryList(): Observable<Category[]> {
      return this.http.get<Category[]>("http://localhost:5187/api/Category");
    }
   
    getProductsByCategories(categoryIds: number[]): Observable<Product[]> {
      return this.http.post<Product[]>(
        "http://localhost:5187/api/Products/FilterByCategories",
        categoryIds
      );
      
    }
    getProductsByPriceRange(minPrice: number, maxPrice: number): Observable<Product[]> {
      return this.http.get<Product[]>(`http://localhost:5187/api/products/GetPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`)
        
        
    }
    
  
  }

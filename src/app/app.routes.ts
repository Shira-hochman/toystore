import { Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component'
import {ProductsComponent}from './products/products.component'
import {ShoppingBasketComponent} from './shopping-basket/shopping-basket.component'

import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { PaymentComponent } from './payment/payment.component';
export const routes: Routes = [
    {path:'',component: HomePageComponent},
    {path:'home',component: HomePageComponent},
    {path:'product',component: ProductsComponent },
    {path:'shop',component: ShoppingBasketComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'payment', component: PaymentComponent },
    
];

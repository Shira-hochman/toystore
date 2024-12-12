import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MenubarModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'toy_store';
  menuItems: MenuItem[];
  ngOnInit() {
    this.menuItems = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Products', icon: 'pi pi-shopping-cart', routerLink: '/product' },
      { label: 'Shopping Basket', icon: 'pi pi-shopping-bag', routerLink: '/shop' }
    ];}
}

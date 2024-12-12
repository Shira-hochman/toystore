import { Component, OnInit ,} from '@angular/core';
import { Product } from '../models/product'; // עדכן לפי המיקום שלך
import { ProductsServiceService } from '../products-service.service'; // עדכן לפי המיקום שלך
import { ShoppingBasketService } from '../shopping-basket-service.service'; // עדכן לפי המיקום שלך
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from '../product-details/product-details.component'; // עדכן לפי המיקום שלך
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from '../models/category';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { Basket } from '../models/basket'
import { SliderModule } from 'primeng/slider';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,AccordionModule, CheckboxModule, FormsModule, ProductDetailsComponent, CardModule, DropdownModule, SliderModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService],
})


export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  originalProductList: Product[] = [];
  originalcategoryList: Category[] = [];
  selectedProduct: Product | null = null;
  searchTerm: string = ''; // מילת חיפוש
  selectedSortOption: string | null = null; // אפשרות מיון
  age: number | null = null; // סינון לפי גיל
  categoryList: Category[] = []; // קטגוריות זמינות
  selectedCategories: number[] = []; // קטגוריות שנבחרו
  showAddToBasketMessage: boolean = false;
  priceRange: number[] = [0, 500];
  selectedPriceRange = { min: 0, max: 1000 }; 
  sortOptions = [
    { label: 'מיין לפי מחיר מנמוך לגבוה', value: 'asc' },
    { label: 'מיין לפי מחיר מגבוה לנמוך', value: 'desc' },
    { label: 'מיין לפי שם (א-ת)', value: 'name' },
  ];
  isCategoryFilterOpen = false; // קטגוריות סגורות בהתחלה
  isPriceFilterOpen = false; // מחיר סגור בהתחלה
  isAgeFilterOpen = false; // גיל סגור בהתחלה
  showIcons: boolean = false;

  constructor(
    private productService: ProductsServiceService,
    private shoppingBasketService: ShoppingBasketService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();

  }

  // טעינת רשימת המוצרים
  loadProducts(): void {
    this.productService.getProduct().subscribe((data: Product[]) => {
      this.productList = data;
      this.originalProductList = [...data];
    });
  }
  
  loadCategories(): void {
    this.productService.getCategoryList().subscribe((data: Category[]) => {
      this.categoryList = data
      this.originalcategoryList = [...data];

    });
  }

  onCategoryChange(category: Category): void {
    if (category.selected) {
      this.selectedCategories.push(category.categoryId); // הוספת קטגוריה שנבחרה
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        id => id !== category.categoryId // הסרת קטגוריה שלא נבחרה
      );
    }

    // שליחת מזהי הקטגוריות לשרת
    this.productService
      .getProductsByCategories(this.selectedCategories)
      .subscribe((data: Product[]) => {
        this.productList = data; // עדכון רשימת המוצרים
      });
  }


  toggleCategoryFilter() {
    this.isCategoryFilterOpen = !this.isCategoryFilterOpen;
  }

  togglePriceFilter() {
    this.isPriceFilterOpen = !this.isPriceFilterOpen;
  }
  
  toggleAgeFilter() {
    this.isAgeFilterOpen = !this.isAgeFilterOpen;
  }

  onPriceRangeChange(minPrice: number, maxPrice: number): void {
    // שמירת טווח המחירים הנבחר
    this.selectedPriceRange = { min: minPrice, max: maxPrice };

    // שליחת טווח המחירים לשרת
    this.productService
      .getProductsByPriceRange(this.selectedPriceRange.min, this.selectedPriceRange.max)
      .subscribe((data: Product[]) => {
        this.productList = data; // עדכון רשימת המוצרים עם התוצאות מהשרת
      });
  }

  // חיפוש מוצרים
  searchProducts(): void {
    this.applyFilters();
  }

  // סינון לפי גיל
  filterAge(): void {
    if (!this.age || this.age <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'שגיאה',
        detail: 'יש להזין גיל חוקי.',
      });
      return;
    }

    this.applyFilters();
  }

  // מיון מוצרים
  onSortOptionSelected(sortOption: string): void {
    this.selectedSortOption = sortOption;
    this.applyFilters();
  }


  // סינון ומיון כללי
  applyFilters(): void {
    let filteredProducts = [...this.originalProductList];

    // סינון לפי קטגוריה
    if (this.selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        this.selectedCategories.includes(product.categoryId));

    }
   
    // סינון לפי חיפוש
    if (this.searchTerm.trim() !== '') {
      filteredProducts = filteredProducts.filter(product =>
        product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // סינון לפי גיל
    if (this.age) {
      filteredProducts = filteredProducts.filter(product => product.age === this.age);
    }

    // מיון מוצרים
    if (this.selectedSortOption) {
      switch (this.selectedSortOption) {
        case 'asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));
          break;
      }


      this.productList = filteredProducts;
    }
  }
  // הצגת פרטי מוצר
  showDetails(product: Product): void {
    this.selectedProduct = product;
  }

  // חזרה לרשימת המוצרים
  goBack(): void {
    this.selectedProduct = null;
  }

  // הוספה לסל הקניות

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
      this.shoppingBasketService.myBagList[this.shoppingBasketService.myBagList.indexOf(this.shoppingBasketService.myBagList.filter(a => a.product.productId == p.productId)[0])].amount++;
      this.shoppingBasketService.myBagList[this.shoppingBasketService.myBagList.indexOf(this.shoppingBasketService.myBagList.filter(a => a.product.productId == p.productId)[0])].totalPrice += p.price;
    }

    else
      this.shoppingBasketService.myBagList.push(new Basket(p, 1, p.price));
  }

}

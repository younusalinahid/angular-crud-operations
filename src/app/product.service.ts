import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 100, quantity: 10 },
    { id: 2, name: 'Product 2', price: 200, quantity: 20 },
    { id: 3, name: 'Product 3', price: 300, quantity: 30 }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }

  deleteProduct(id: number) {
    console.log('Products in service:', this.products);
    this.products = this.products.filter((product) => product.id !== id);
    console.log('Current products:', this.products);
  }

}

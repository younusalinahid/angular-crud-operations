import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [CommonModule],
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {
    this.productService.getProducts().subscribe(data => this.products = data);
  }


  deleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    console.log('Products after delete in component:', this.products);
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log('Updated products in component:', this.products);
    });
  }


  editProduct(product: Product): void {
    this.router.navigate(['/edit', product.id]);
  }

  addProduct(): void {
    this.router.navigate(['/add']);
  }
}

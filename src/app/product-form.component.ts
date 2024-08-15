import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  imports: [FormsModule, CommonModule],
})
export class ProductFormComponent {
  product: Product = { id: 0, name: '', price: 0, quantity: 0 };
  isEditMode = false;


  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const productId = parseInt(id, 10);
      this.productService.getProducts().subscribe(products => {
        const foundProduct = products.find(p => p.id === productId);
        if (foundProduct) {
          this.product = foundProduct;
        }
      });
    }
  }

  saveProduct(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product);
    } else {
      this.productService.addProduct(this.product);
    }
    this.router.navigate(['/']);
  }


}


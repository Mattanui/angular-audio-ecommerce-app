import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private _router: Router) {}

  navigateToProductDetail(): void {
    this._router.navigate(['/products', this.product.slug]);
  }
}

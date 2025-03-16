import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-checkout-summary',
  standalone: false,
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.scss'],
})
export class CheckoutSummaryComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() total: number = 0;
  @Input() shipping: number = 0;
  @Input() vat: number = 0;
  @Input() grandTotal: number = 0;

  @Output() onSubmit = new EventEmitter<void>();

  submitOrder(): void {
    this.onSubmit.emit();
  }

  // Obtenient l'URL de l'image du produit
  getProductImageUrl(item: CartItem): string {
    if (item.product.image && item.product.image.desktop) {
      return item.product.image.desktop;
    } else if (item.product.slug) {
      return `/assets/images/product-${item.product.slug}/desktop/image-product.jpg`;
    }
    return '';
  }

  // Obtenient le nom court du produit
  getShortProductName(item: CartItem): string {
    return (
      item.product.shortName ||
      item.product.name.split(' ').slice(0, 2).join(' ')
    );
  }
}

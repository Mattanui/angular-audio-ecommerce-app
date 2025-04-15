import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../../core/models/order.model';
import { ProductService } from '../../../../core/services/product.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-confirmation',
  standalone: false,
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  showAllItems = false;
  displayedItems = 1; // Nombre d'éléments à afficher dans le résumé
  products: { [key: number]: any } = {};
  loading = true;

  constructor(
    private _router: Router,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    const orderData = localStorage.getItem('lastOrder');
    if (!orderData) {
      this._router.navigate(['/']);
      return;
    }

    this.order = JSON.parse(orderData);
    localStorage.removeItem('lastOrder'); // Nettoyer après la lecture

    // Charger les détails des produits
    if (this.order) {
      const productIds = this.order.items.map((item) => item.productId);
      const uniqueProductIds = [...new Set(productIds)];

      const productRequests = uniqueProductIds.map((id) =>
        this._productService.getProductById(id)
      );

      forkJoin(productRequests).subscribe({
        next: (products) => {
          products.forEach((product) => {
            this.products[product.id] = product;
          });
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this._router.navigate(['/']);
        },
      });
    }
  }

  getProductName(productId: number): string {
    return this.products[productId]?.name || `Product ${productId}`;
  }

  getProductImage(productId: number): string {
    return (
      this.products[productId]?.image?.desktop ||
      `/assets/images/product-${productId}/desktop/image-product.jpg`
    );
  }

  get visibleItems() {
    if (!this.order) return [];
    return this.showAllItems
      ? this.order.items
      : this.order.items.slice(0, this.displayedItems);
  }

  get remainingItems(): number {
    if (!this.order) return 0;
    return Math.max(0, this.order.items.length - this.displayedItems);
  }

  toggleItemsVisibility(): void {
    this.showAllItems = !this.showAllItems;
  }

  backToHome(): void {
    this._router.navigate(['/']);
  }
}

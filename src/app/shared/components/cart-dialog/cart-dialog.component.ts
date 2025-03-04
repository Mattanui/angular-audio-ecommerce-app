import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService, CartItem } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-dialog',
  standalone: false,
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
})
export class CartDialogComponent implements OnInit {
  @Output() closeCart = new EventEmitter<void>();
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  removeAll(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    // Rediriger vers la page de paiement (à implémenter ultérieurement)
    console.log('Redirection vers le checkout');
    this.closeCart.emit();
  }
}

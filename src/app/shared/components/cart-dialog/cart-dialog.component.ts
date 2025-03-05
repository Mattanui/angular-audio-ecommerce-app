import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-cart-dialog',
  standalone: false,
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.scss',
})
export class CartDialogComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.getCart().subscribe((items) => {
      this.cartItems = items;
      this.total = this._cartService.getTotal();
    });
  }

  closeDialog(): void {
    this._cartService.toggleCartDialog(false);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this._cartService.updateQuantity(productId, quantity);
    } else if (quantity === 0) {
      this._cartService.removeFromCart(productId);
    }
  }

  removeItem(productId: number): void {
    this._cartService.removeFromCart(productId);
  }

  removeAll(): void {
    this._cartService.clearCart();
  }

  checkout(): void {
    // TODO: Rediriger vers la page de paiement
    console.log('Redirection vers le checkout');
    this.closeDialog();
  }

  // Obtenient l'URL de l'image du produit
  getProductImageUrl(product: Product): string {
    // Vérifie la structure du produit et construire le chemin approprié
    if (product.image && product.image.desktop) {
      return product.image.desktop;
    } else if (product.slug) {
      // S'adapte à la structure de fichiers du dossier images
      return `/public/assets/images/product-${product.slug}/desktop/image-product.jpg`;
    }
    return '';
  }
}

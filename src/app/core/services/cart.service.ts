import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    // Récupère le panier depuis le localStorage au démarrage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  getCartItemsCount(): Observable<number> {
    return new Observable<number>((observer) => {
      this.getCart().subscribe((items) => {
        const count = items.reduce((total, item) => total + item.quantity, 0);
        observer.next(count);
      });
    });
  }

  addToCart(product: Product, quantity: number): void {
    // Vérifie si le produit est déjà dans le panier
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      // Met à jour la quantité si le produit existe déjà
      existingItem.quantity += quantity;
    } else {
      // Ajoute un nouvel élément
      this.cartItems.push({ product, quantity });
    }

    // Met à jour le subject et sauvegarder dans le localStorage
    this._updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find((item) => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
      this._updateCart();
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this._updateCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this._updateCart();
  }

  private _updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}

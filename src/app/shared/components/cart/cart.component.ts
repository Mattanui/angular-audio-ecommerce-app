import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  // TODO: ajouter des fonctionnalités liées au panier
  // ex: nombre d'articles, ouvrir/fermer le panier, etc.
  itemCount = 0;

  toggleCart() {
    // *Implémentation future pour ouvrir/fermer le panier
    console.log('Cart toggled');
  }
}

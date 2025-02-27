import { Component } from '@angular/core';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  // TODO: ajouter des fonctionnalités liées au panier
  // ex: nombre d'articles, ouvrir/fermer le panier, etc.
  itemCount = 0;

  toggleBasket() {
    // *Implémentation future pour ouvrir/fermer le panier
    console.log('Basket toggled');
  }
}

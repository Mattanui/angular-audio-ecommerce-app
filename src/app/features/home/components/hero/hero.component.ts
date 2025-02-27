import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  productTitle = 'XX99 MARK II HEADPHONES';
  productDescription =
    'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.';

  onSeeProduct() {
    // Navigation vers la page de détail du produit
    console.log('Navigate to product details');
  }
}

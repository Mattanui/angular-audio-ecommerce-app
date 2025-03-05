import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  productSlug = 'xx99-mark-two-headphones';

  constructor(private _router: Router) {}

  onSeeProduct() {
    this._router.navigate(['/products', this.productSlug]);
  }
}

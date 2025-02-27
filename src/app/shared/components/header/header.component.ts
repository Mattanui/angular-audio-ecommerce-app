// src/app/shared/components/header/header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  onMenuToggle(isOpen: boolean): void {
    this.isMobileMenuOpen = isOpen;
  }
}

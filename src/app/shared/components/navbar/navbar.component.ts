import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  navItems = [
    { label: 'HOME', route: '/' },
    { label: 'HEADPHONES', route: '/headphones' },
    { label: 'SPEAKERS', route: '/speakers' },
    { label: 'EARPHONES', route: '/earphones' },
  ];
}

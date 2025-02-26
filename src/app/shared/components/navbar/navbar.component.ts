import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  navLinks = [
    {
      label: 'HOME',
      link: '/',
    },
    {
      label: 'HEADPHONES',
      link: '/headphones',
    },
    {
      label: 'SPEAKERS',
      link: '/speakers',
    },
    {
      label: 'EARPHONES',
      link: '/earphones',
    }
  ];

  
}

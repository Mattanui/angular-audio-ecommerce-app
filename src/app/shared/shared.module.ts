import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    NavbarComponent,
    CartComponent,
    FooterComponent,
    MobileMenuComponent,
    AboutComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, AboutComponent, RouterModule],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DesignSystemModule } from '../design-system/design-system.module';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    NavbarComponent,
    CartComponent,
    FooterComponent,
    MobileMenuComponent,
    AboutComponent,
    CartDialogComponent,
  ],
  imports: [CommonModule, RouterModule, DesignSystemModule],
  exports: [
    HeaderComponent,
    CartDialogComponent,
    FooterComponent,
    AboutComponent,
    RouterModule,
  ],
})
export class SharedModule {}

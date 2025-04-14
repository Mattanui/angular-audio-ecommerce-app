import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DesignSystemModule } from '../../design-system/design-system.module';

import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
  {
    path: 'confirmation',
    component: OrderConfirmationComponent,
  },
];

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutSummaryComponent,
    OrderConfirmationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DesignSystemModule,
    RouterModule.forChild(routes),
  ],
})
export class CheckoutModule {}

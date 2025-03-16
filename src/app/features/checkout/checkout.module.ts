import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DesignSystemModule } from '../../design-system/design-system.module';

import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
];

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DesignSystemModule,
    RouterModule.forChild(routes),
  ],
})
export class CheckoutModule {}

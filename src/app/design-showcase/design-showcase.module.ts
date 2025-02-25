import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DesignSystemModule } from '../design-system/design-system.module';
import { DesignShowcaseComponent } from './design-showcase.component';

const routes: Routes = [
  {
    path: '',
    component: DesignShowcaseComponent,
  },
];

@NgModule({
  declarations: [DesignShowcaseComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignSystemModule,
    RouterModule.forChild(routes),
  ],
})
export class DesignShowcaseModule {}

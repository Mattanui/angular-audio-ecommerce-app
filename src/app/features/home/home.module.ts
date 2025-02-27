import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { DesignSystemModule } from '../../design-system/design-system.module';

import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './components/hero/hero.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, HeroComponent],
  imports: [
    CommonModule,
    SharedModule,
    DesignSystemModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule {}

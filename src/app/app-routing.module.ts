import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'design-system',
    loadChildren: () =>
      import('./design-showcase/design-showcase.module').then(
        (m) => m.DesignShowcaseModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

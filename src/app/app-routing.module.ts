import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignShowcaseComponent } from './design-showcase/design-showcase.component';

const routes: Routes = [
  { path: 'design-system', component: DesignShowcaseComponent },

  {
    path: '',
    redirectTo: 'design-system',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { NumberInputComponent } from './components/number-input/number-input.component';

@NgModule({
  declarations: [
    ButtonComponent,
    TextFieldComponent,
    RadioButtonComponent,
    NumberInputComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ButtonComponent,
    TextFieldComponent,
    RadioButtonComponent,
    NumberInputComponent,
    // ? Exporter également les modules de formulaires pour les utiliser dans les composants parents
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DesignSystemModule {}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-design-showcase',
  templateUrl: './design-showcase.component.html',
  styleUrls: ['./design-showcase.component.scss'],
})
export class DesignShowcaseComponent implements OnInit {
  // Pour démontrer les boutons
  primaryButtonClicked = false;
  secondaryButtonClicked = false;
  textButtonClicked = false;

  // Pour démontrer les radio buttons
  selectedPaymentMethod = 'card';

  // Pour démontrer les number inputs
  quantity = 1;

  // Pour démontrer les form fields
  demoForm!: FormGroup;
  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  constructor(private fb: FormBuilder) {
    console.log('DesignShowcaseComponent constructeur appelé');
  }

  ngOnInit(): void {
    console.log('DesignShowcaseComponent ngOnInit appelé');

    // Initialiser le formulaire de démonstration
    this.demoForm = this.fb.group({
      name: this.nameControl,
      email: this.emailControl,
      password: this.passwordControl,
    });

    console.log('Formulaire initialisé:', this.demoForm);
  }

  // Méthodes pour démontrer les boutons
  onPrimaryButtonClick(event: any): void {
    console.log('Bouton primaire cliqué', event);
    this.primaryButtonClicked = true;
    setTimeout(() => (this.primaryButtonClicked = false), 1000);
  }

  onSecondaryButtonClick(event: any): void {
    console.log('Bouton secondaire cliqué', event);
    this.secondaryButtonClicked = true;
    setTimeout(() => (this.secondaryButtonClicked = false), 1000);
  }

  onTextButtonClick(event: any): void {
    console.log('Bouton texte cliqué', event);
    this.textButtonClicked = true;
    setTimeout(() => (this.textButtonClicked = false), 1000);
  }

  // Méthode pour démontrer les radio buttons
  onPaymentMethodChange(value: string): void {
    console.log('Méthode de paiement changée:', value);
    this.selectedPaymentMethod = value;
  }

  // Méthode pour démontrer les number inputs
  onQuantityChange(value: number): void {
    console.log('Quantité changée:', value);
    this.quantity = value;
  }

  // Méthode pour soumettre le formulaire de démonstration
  onSubmit(): void {
    console.log('Formulaire soumis, état:', this.demoForm.valid);
    if (this.demoForm.valid) {
      console.log('Formulaire valide', this.demoForm.value);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.demoForm.controls).forEach((key) => {
        const control = this.demoForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}

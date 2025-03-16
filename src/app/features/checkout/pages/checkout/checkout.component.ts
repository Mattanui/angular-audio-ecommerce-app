import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  total = 0;
  shipping = 50; // Frais de livraison fixes
  vat = 0; // TVA
  grandTotal = 0;
  selectedPaymentMethod: string = 'cash';
  showEMoneyDetails: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _cartService: CartService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._loadCartData();

    // Observer les changements de méthode de paiement
    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
      this.selectedPaymentMethod = method;
      this.showEMoneyDetails = method === 'emoney';

      // Ajuster les validateurs selon la méthode de paiement
      if (method === 'emoney') {
        this.checkoutForm
          .get('emoneyNumber')
          ?.setValidators([
            Validators.required,
            Validators.pattern('^[0-9]{9}$'),
          ]);
        this.checkoutForm
          .get('emoneyPin')
          ?.setValidators([
            Validators.required,
            Validators.pattern('^[0-9]{4}$'),
          ]);
      } else {
        this.checkoutForm.get('emoneyNumber')?.clearValidators();
        this.checkoutForm.get('emoneyPin')?.clearValidators();
      }

      this.checkoutForm.get('emoneyNumber')?.updateValueAndValidity();
      this.checkoutForm.get('emoneyPin')?.updateValueAndValidity();
    });
  }

  private _initForm(): void {
    this.checkoutForm = this._fb.group({
      // Informations de facturation
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^\\+?[0-9\\s\\-\\(\\)]+$')],
      ],

      // Informations de livraison
      address: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],

      // Informations de paiement
      paymentMethod: ['cash', [Validators.required]],
      emoneyNumber: [''],
      emoneyPin: [''],
    });
  }

  private _loadCartData(): void {
    this._cartService.getCart().subscribe((items) => {
      this.cartItems = items;
      this._calculateTotals();
    });
  }

  private _calculateTotals(): void {
    this.total = this._cartService.getTotal();
    this.vat = Math.round(this.total * 0.2); // 20% de TVA
    this.grandTotal = this.total + this.shipping;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Formulaire valide', this.checkoutForm.value);

      // Prépare les données de commande pour la page de confirmation
      const orderData = {
        formData: this.checkoutForm.value,
        cartItems: this.cartItems,
        total: this.total,
        shipping: this.shipping,
        vat: this.vat,
        grandTotal: this.grandTotal,
      };

      // Stocke les données de commande temporairement (ex: localStorage)
      localStorage.setItem('orderData', JSON.stringify(orderData));

      // Vide le panier
      this._cartService.clearCart();

      // Redirige vers la page de confirmation
      this._router.navigate(['/checkout/confirmation']);
    } else {
      // Marque tous les champs comme touchés pour afficher les erreurs
      this._markFormGroupTouched(this.checkoutForm);
    }
  }

  // Méthode utilitaire pour marquer tous les champs comme touchés
  private _markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this._markFormGroupTouched(control);
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  // Vérifie si un champ est invalide et a été touché
  isFieldInvalid(fieldName: string): boolean {
    const control = this.checkoutForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  // Obtenient le message d'erreur pour un champ
  getErrorMessage(fieldName: string): string {
    const control = this.checkoutForm.get(fieldName);

    if (!control) return '';

    if (control.hasError('required')) {
      return 'Ce champ est obligatoire';
    }

    if (control.hasError('email')) {
      return "Format d'email invalide";
    }

    if (control.hasError('minlength')) {
      return `Minimum ${
        control.getError('minlength').requiredLength
      } caractères`;
    }

    if (control.hasError('pattern')) {
      switch (fieldName) {
        case 'phone':
          return 'Format de téléphone invalide';
        case 'zipCode':
          return 'Code postal invalide (5 chiffres)';
        case 'emoneyNumber':
          return 'Numéro e-Money invalide (9 chiffres)';
        case 'emoneyPin':
          return 'PIN e-Money invalide (4 chiffres)';
        default:
          return 'Format invalide';
      }
    }

    return '';
  }
}

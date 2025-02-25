import {
  Component,
  Input,
  Self,
  Optional,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: false,
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() errorMessage: string = '';

  id: string = `text-field-${Math.random().toString(36).substring(2, 11)}`;
  errorId: string = `${this.id}-error`;
  control: FormControl = new FormControl();

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.ngControl && this.ngControl.control) {
      // Synchroniser le FormControl du composant avec celui fourni par NgControl
      this.control = this.ngControl.control as FormControl;
    }
  }

  get isInvalid(): boolean {
    return (
      this.control &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }

  onBlur(): void {
    this.control.markAsTouched();
    this.onTouched();
  }

  // Implémentation des méthodes de ControlValueAccessor
  writeValue(value: any): void {
    if (value !== undefined) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }
}

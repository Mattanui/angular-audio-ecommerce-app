import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-input',
  standalone: false,
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent {
  @Input() value: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 99;
  @Input() step: number = 1;
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<number>();

  increment(): void {
    if (this.value < this.max) {
      this.value += this.step;
      this.valueChange.emit(this.value);
    }
  }

  decrement(): void {
    if (this.value > this.min) {
      this.value -= this.step;
      this.valueChange.emit(this.value);
    }
  }

  onInput(event: Event): void {
    const inputValue = +(event.target as HTMLInputElement).value;

    if (!isNaN(inputValue)) {
      // Assurer que la valeur est entre min et max
      const newValue = Math.max(this.min, Math.min(inputValue, this.max));
      this.value = newValue;
      this.valueChange.emit(this.value);
    }
  }
}

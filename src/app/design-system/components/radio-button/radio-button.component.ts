import { Component, EventEmitter, Input, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-radio-button',
  standalone: false,
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input() label: string = '';
  @Input() value: any;
  @Input() name: string = '';
  @Input() checked: boolean = false;
  @Output() change = new EventEmitter<any>();

  id: string = `radio-${uuidv4()}`;

  onSelect(): void {
    if (!this.checked) {
      this.checked = true;
      this.change.emit(this.value);
    }
  }
}

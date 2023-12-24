import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent {
  @Input() control: AbstractControl;
  @Input() label: string;
  @Input() name: string;
  @Input() inputType = 'text';
  @Input() placeholder = 'Введите значение...'
}

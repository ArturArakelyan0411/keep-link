import {
  Component,
  ElementRef,
  forwardRef, HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

// Utilities
import { getErrorMessage } from '../../../core/utilities/get-error-message';

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => InputComponent)
  }],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s ease', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class InputComponent implements ControlValueAccessor, OnChanges {
  focused: boolean = false;
  divided: boolean = false;
  errorMessage: string = '';
  value: string = '';

  @Input({ required: true }) placeholder: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() error: ValidationErrors | null | undefined;
  @Input() showError: boolean = false;
  @Input() placeholderBackgroundColor: string = 'var(--background-color)';

  @HostBinding('class.focus') get classFocus() { return this.focused; }
  @HostBinding('class.divide') get classDivide() { return this.divided; }
  @HostBinding('class.error') get classError() { return this.showError && this.errorMessage; }

  @ViewChild('input', { static: true }) inputElement: ElementRef<HTMLInputElement> | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['error']) {
      const error = getErrorMessage(changes['error'].currentValue);

      if (error) {
        this.errorMessage = error;
      }
    }
  }

  @HostListener('click')
  onHostClick() {
    if (this.inputElement?.nativeElement) {
      this.inputElement?.nativeElement.focus();
    }
  }

  onInput(e: Event) {
    const value = (<HTMLInputElement>e.target).value;

    this.value = value;

    this.onChange(value);
  }

  onFocus() {
    this.focused = true;
    this.divided = true;
  }

  onBlur() {
    this.onTouched();

    this.focused = false;

    if (!this.inputElement?.nativeElement?.value) {
      this.divided = false;
    }
  }

  onChange(value: string) {}

  onTouched() {}

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}

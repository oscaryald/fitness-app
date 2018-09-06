import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorcoutTypeComponent),
  multi: true
};

@Component({
  selector: 'app-worcout-type',
  templateUrl: './worcout-type.component.html',
  styleUrls: ['./worcout-type.component.scss'],
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class WorcoutTypeComponent implements ControlValueAccessor {

  selectors = ['strength', 'endurance'];

  value: string;

  private onTouch: Function;
  private onModelChange: Function;

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch(value);
  }

}

import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Meal } from '../../../shared/services/meals/meals.services';
import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAssignComponent implements OnInit {

  @Input()
  section: any;

  @Input()
  list: Meal[] | Workout[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  private selected: string[] = [];

  constructor() { }

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  toggleItem(name: string) {
    if (this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }


}

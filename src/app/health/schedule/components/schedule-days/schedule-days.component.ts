import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDaysComponent implements OnInit {

  @Input()
  selected: number;

  @Output()
  select = new EventEmitter<number>();

  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut', 'Sun'];

  constructor() { }

  ngOnInit() {
  }

  selectDay(index: number) {
    this.select.emit(index);
  }

}

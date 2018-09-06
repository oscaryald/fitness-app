import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleItem } from '../../../shared/services/schedule/schedule.service';


@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSectionComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  section: ScheduleItem;

  @Output()
  select = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  onSelect(type: string, assigned: string[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    });
  }

}

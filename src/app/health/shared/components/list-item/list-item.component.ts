import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MealsService } from '../../services/meals/meals.services';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit {


  @Input() item;

  @Output()
  remove = new EventEmitter<any>();

  toggled = false;

  constructor(
    private mealsService: MealsService
  ) { }

  ngOnInit() {
  }

  getRoute(item: any) {
   return [
     `../${item.ingredients ? 'meals' : 'workouts'}`,
      item.$key
    ];
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

}

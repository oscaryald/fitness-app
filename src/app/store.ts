
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators/';
import { User } from './auth/shared/services/auth.service';
import { Meal } from './health/shared/services/meals/meals.services';
import { Workout } from './health/shared/services/workouts/workouts.service';
import { ScheduleItem } from './health/shared/services/schedule/schedule.service';

export interface State {
  user: User;
  meals: Meal[];
  workouts: Workout[];
  schedule: ScheduleItem[];
  selected: any;
  list: any;
  date: Date;
  [key: string]: any;
}

const state = {
  user: undefined,
  meals: undefined,
  workouts: undefined,
  schedule: undefined,
  date: undefined,
  selected: undefined,
  list: undefined,
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select(name: string): Observable<any> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({...this.value, [name]: state});
  }

}

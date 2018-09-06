import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from '../../../../store';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Meal } from '../meals/meals.services';
import { Workout } from '../workouts/workouts.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../../../auth/shared/services/auth.service';
import { pipe } from '@angular/core/src/render3/pipe';

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$
  .pipe(withLatestFrom(this.section$))
  .pipe(map(([items, section]: any[]) => {
    const id = section.data.$key;
    const defaults: ScheduleItem = {
      workouts: null,
      meals: null,
      section: section.section,
      timestamp: new Date(section.day).getTime()
    };
    const payload = {
      ...(id ? section.data : defaults),
      ...items
    };
    if (id) {
      return this.updateSection(id, payload);
    } else {
      return this.createSection(payload);
    }
  }));

  selected$ = this.section$
  .pipe(tap((next: any) => this.store.set('selected', next)));

  list$ = this.selected$
  .pipe(map((value: any) => this.store.value[value.type]))
  .pipe(tap((next: any) => this.store.set('list', next)));

  schedule$: Observable<ScheduleItem[]> = this.date$
  .pipe(tap((next: any) => this.store.set('date', next)))
  .pipe(map((day: any) => {
    const startAt = (
      new Date(day.getFullYear(), day.getMonth(), day.getDate())
    ).getTime();

    const endAt = (
      new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
    ).getTime() - 1;
    return { startAt, endAt };
  }))
  .pipe(map(({startAt, endAt}: any) => {
      return this.getSchedule(startAt, endAt);
  }))
  .pipe(switchMap((data: any) => {
    return data.snapshotChanges();
  }))
  .pipe(map((data: any) => {
    const mapData = data.map(el => {
      const $key = el.key;
      return {
        ...el.payload.val(),
        $key
      };
    });
    const mapped: ScheduleList = {};
    for (const prop of mapData) {
      if (!mapped[prop.section]) {
        mapped[prop.section] = prop;
      }
    }
    return mapped;
  }))
  .pipe(tap((next: any) => this.store.set('schedule', next)));

  constructor(
              private store: Store,
              private db: AngularFireDatabase,
              private authService: AuthService,
            ) { }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  get uid() {
    return this.authService.user.uid;
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.uid}`, (ref) => {
          return ref.orderByChild('timestamp').startAt(startAt).endAt(endAt);
    });
  }

  private createSection(payload: ScheduleItem) {
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    delete payload.$key; // because the payload will overwrite all prop but just not this $key, $key is just firebase index
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }
}

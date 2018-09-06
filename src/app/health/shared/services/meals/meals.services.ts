import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Store } from '../../../../store';
import { AuthService } from '../../../../auth/shared/services/auth.service';
import { Observable, of, pipe } from 'rxjs';
import { tap, map, filter} from 'rxjs/operators';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {

  meals$ = this.db.list(`meals/${this.uid}`)
                  .snapshotChanges()
                  .pipe(map(res => {
                    return res.map(meal => {
                      return {
                        $key: meal.key, ...meal.payload.val()
                      };
                    });
                  }))
                  .pipe(tap(next => {
                    return this.store.set('meals', next);
                  }));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }

  getMeal(key: string) {
    if (!key) {
      return of({});
    }
    return this.store.select('meals')
    .pipe(filter(Boolean))
    .pipe(map(meals => {
      return meals.find((meal: Meal) => meal.$key === key);
    }));
  }

  updateMeal(key: string, payload: Meal) {
    return this.db.object(`meals/${this.uid}/LLhs6wntSpDQJbidJgI`).update(payload);
  }

}

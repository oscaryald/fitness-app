import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Store } from '../../../../store';
import { AuthService } from '../../../../auth/shared/services/auth.service';
import { Observable, of, pipe } from 'rxjs';
import { tap, map, filter} from 'rxjs/operators';

export interface Workout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {

  workouts$ = this.db.list(`workouts/${this.uid}`)
                  .snapshotChanges()
                  .pipe(map(res => {
                    return res.map(workout => {
                      return {
                        $key: workout.key, ...workout.payload.val()
                      };
                    });
                  }))
                  .pipe(tap(next => {
                    return this.store.set('workouts', next);
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

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }

  getWorkout(key: string) {
    if (!key) {
      return of();
    }
    return this.store.select('workouts')
    .pipe(filter(Boolean))
    .pipe(map(workouts => {
      return workouts.find((workout: Workout) => workout.$key === key);
    }));
  }

  updateWorkout(key: string, payload: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(payload);
  }

}

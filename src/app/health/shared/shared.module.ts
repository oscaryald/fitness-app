import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MealsService } from './services/meals/meals.services';
import { ListItemComponent } from './components/list-item/list-item.component';
import { WorkoutsService } from './services/workouts/workouts.service';
import { JoinPipe } from './join.pipe';
import { WorkoutPipe } from './workout.pipe';
import { ScheduleService } from './services/schedule/schedule.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [ListItemComponent, JoinPipe, WorkoutPipe],
  exports: [ListItemComponent, JoinPipe, WorkoutPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService,
        ScheduleService,
      ]
    };
  }
 }

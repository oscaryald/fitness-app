import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutComponent } from './containers/workout/workout.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { SharedModule } from '../shared/shared.module';
import { WorcoutTypeComponent } from './components/worcout-type/worcout-type.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: WorkoutsComponent,
  },
  {
    path: 'new',
    component: WorkoutComponent
  },
  {
    path: ':id',
    component: WorkoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [WorkoutsComponent, WorkoutComponent, WorkoutFormComponent, WorcoutTypeComponent]
})
export class WorkoutsModule { }

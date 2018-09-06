import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Workout } from '../../../shared/services/workouts/workouts.service';
import { Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit, OnChanges {


  @Input() workout: Workout;

  @Output()
  create = new EventEmitter<Workout>();
  @Output()
  update = new EventEmitter<Workout>();
  @Output()
  remove = new EventEmitter<Workout>();

  exists = false;
  toggled = false;

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['strength'],
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

  }

  get placeholder() {
    return `e.g ${this.form.get('type').value === 'strength' ? 'Brenchpress' : 'Treadmill'}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( this.workout && this.workout.name ) {
      this.exists = true;
      const value = this.workout;
      this.form.patchValue(value);
    }

  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }


}

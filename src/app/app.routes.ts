import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/add-user', pathMatch: 'full' },
  { path: 'add-user', component: UserFormComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'workout-chart', component: WorkoutChartComponent }
];
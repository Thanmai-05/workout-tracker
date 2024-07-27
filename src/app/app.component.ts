import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { WorkoutChartComponent } from "./components/workout-chart/workout-chart.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserFormComponent } from "./components/user-form/user-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, WorkoutChartComponent, UserListComponent, UserFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workout-tracker';
}

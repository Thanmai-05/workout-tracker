import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService} from '../../services/user-data.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-form',
  standalone:true,
  imports:[FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  name: string = '';
  workoutType: string = '';
  minutes: number = 0;

  name1:string = "";
  workoutType1: string = "";
  minutes1: number = 0;

  constructor(private userDataService: UserDataService) {}

  onSubmit(): void {
    if (this.name && this.workoutType && this.minutes > 0) {
      this.userDataService.addUser(this.name, { type: this.workoutType, minutes: this.minutes });
      this.resetForm();
    }
  }

  onSubmitWorkout(): void {
    if (this.name1 && this.workoutType1 && this.minutes1 > 0) {
      this.userDataService.addWorkout(this.name1, { type: this.workoutType1, minutes: this.minutes1 });
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.name = '';
    this.workoutType = '';
    this.minutes = 0;
    this.name1 = "";
    this.workoutType1 = "";
    this.minutes1 = 0;
  }
}
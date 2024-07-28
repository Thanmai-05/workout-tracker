import { Injectable , Inject, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Workout } from '../models/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromLocalStorage();
    }
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(name: string, workout: Workout): void {
    const user = this.users.find(user => user.name === name);
    if(!user){
    const newUser: User = {
      id: this.users.length + 1,
      name,
      workouts: [workout]
    };
    this.users.push(newUser);
    this.updateUsers();
    }
    else{
      alert("User already exists!!.")
    }
  }


  addWorkout(username: string, workout: Workout): void {
    //const user = this.users.find(u => u.id === userId);
    const user = this.users.find(u => u.name === username);
    if (user) {
      user.workouts.push(workout);
      this.updateUsers();
      alert("Workout added successfully!!.");
    }
  }

  private updateUsers(): void {
    this.usersSubject.next(this.users);
    if (isPlatformBrowser(this.platformId)) {
      this.saveToLocalStorage();
    }

  }

  private loadFromLocalStorage(): void {
    const storedUsers = localStorage.getItem('userData');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.usersSubject.next(this.users);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('userData', JSON.stringify(this.users));
  }
}
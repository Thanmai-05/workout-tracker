import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should add a new user', (done) => {
    const initialLength = service['users'].length;
    service.addUser('Test User2', { type: 'Running', minutes: 30 });
    service.getUsers().subscribe(users => {
      const user = users.find(user => user.name === 'Test User2');
      if(!user){
        console.log(users,users.length)
        expect(users.length).toBe(initialLength + 1);
        expect(users[users.length - 1].name).toBe('Test User');
      }
      done();
    });
  });

  it('should add a workout to an existing user', (done) => {
    const userName = "Jane Smith" ;
    const initialWorkouts = service['users'].find(u => u.name === userName)?.workouts.length || 0;
    service.addWorkout(userName, { type: 'Swimming', minutes: 45 });
    service.getUsers().subscribe(users => {
      const updatedUser = users.find(u => u.name === userName);
      expect(updatedUser?.workouts.length).toBe(initialWorkouts + 1);
      expect(updatedUser?.workouts[updatedUser.workouts.length - 1].type).toBe('Swimming');
      done();
    });
  });
});

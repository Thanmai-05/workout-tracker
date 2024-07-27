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
    service.addUser('Test User', { type: 'Running', minutes: 30 });
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(initialLength + 1);
      expect(users[users.length - 1].name).toBe('Test User');
      done();
    });
  });

  it('should add a workout to an existing user', (done) => {
    const userId = 1;
    const initialWorkouts = service['users'].find(u => u.id === userId)?.workouts.length || 0;
    service.addWorkout(userId, { type: 'Swimming', minutes: 45 });
    service.getUsers().subscribe(users => {
      const updatedUser = users.find(u => u.id === userId);
      expect(updatedUser?.workouts.length).toBe(initialWorkouts + 1);
      expect(updatedUser?.workouts[updatedUser.workouts.length - 1].type).toBe('Swimming');
      done();
    });
  });
});

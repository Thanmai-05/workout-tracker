import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserDataService } from '../../services/user-data.service';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserDataService', ['getUsers']);

    await TestBed.configureTestingModule({
      
      imports: [ FormsModule,UserListComponent ],
      providers: [
        { provide: UserDataService, useValue: spy }
      ]
    }).compileComponents();

    userDataServiceSpy = TestBed.inject(UserDataService) as jasmine.SpyObj<UserDataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const testUsers = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 45 }] }
    ];
    userDataServiceSpy.getUsers.and.returnValue(of(testUsers));

    fixture.detectChanges(); // This calls ngOnInit

    expect(component.users).toEqual(testUsers);
    expect(component.filteredUsers).toEqual(testUsers);
  });

  it('should filter users by name', () => {
    component.users = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 45 }] }
    ];
    component.searchTerm = 'John';
    
    component.applyFilters();

    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');
  });

  it('should filter users by workout type', () => {
    component.users = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 45 }] }
    ];
    component.workoutTypeFilter = 'Swimming';
    
    component.applyFilters();

    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Jane Smith');
  });
});
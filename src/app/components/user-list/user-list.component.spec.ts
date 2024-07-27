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
      declarations: [ UserListComponent ],
      imports: [ FormsModule ],
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

  it('should filter users by name', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', workouts: [] },
      { id: 2, name: 'Jane Smith', workouts: [] }
    ];
    userDataServiceSpy.getUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges();
    component.searchTerm = 'John';
    component.applyFilters();

    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');
  });

  it('should filter users by workout type', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 45 }] }
    ];
    userDataServiceSpy.getUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges();
    component.workoutTypeFilter = 'Running';
    component.applyFilters();

    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');
  });
});
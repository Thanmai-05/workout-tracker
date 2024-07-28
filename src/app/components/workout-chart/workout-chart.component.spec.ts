import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';
import { UserDataService } from '../../services/user-data.service';
import { of } from 'rxjs';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserDataService', ['getUsers']);

    await TestBed.configureTestingModule({
      imports:[WorkoutChartComponent],
      providers: [
        { provide: UserDataService, useValue: spy }
      ]
    }).compileComponents();

    userDataServiceSpy = TestBed.inject(UserDataService) as jasmine.SpyObj<UserDataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create chart on init', () => {
    const testUsers = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 45 }] }
    ];
    userDataServiceSpy.getUsers.and.returnValue(of(testUsers));

    spyOn(component, 'createChart');
    fixture.detectChanges(); // This calls ngOnInit

    expect(component.createChart).toHaveBeenCalled();
  });

  // Add more specific tests for chart creation and data processing
});
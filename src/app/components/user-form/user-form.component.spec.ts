import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';
import { UserDataService } from '../../services/user-data.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserDataService', ['addUser']);

    await TestBed.configureTestingModule({
      
      imports: [ FormsModule, UserFormComponent ],
      providers: [
        { provide: UserDataService, useValue: spy }
      ]
    }).compileComponents();

    userDataServiceSpy = TestBed.inject(UserDataService) as jasmine.SpyObj<UserDataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addUser when form is submitted with valid data', () => {
    component.name = 'John Doe';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.onSubmit();

    expect(userDataServiceSpy.addUser).toHaveBeenCalledWith('John Doe', { type: 'Running', minutes: 30 });
  });

  it('should not call addUser when form is submitted with invalid data', () => {
    component.name = '';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.onSubmit();

    expect(userDataServiceSpy.addUser).not.toHaveBeenCalled();
  });
});
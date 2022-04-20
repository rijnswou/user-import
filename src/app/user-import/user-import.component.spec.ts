import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserImportComponent} from './user-import.component';

describe('UserImportComponent', () => {
  let component: UserImportComponent;
  let fixture: ComponentFixture<UserImportComponent>;
  const title: string = 'Welcome to UserImport!'
  const mockRawData: { name: string, email: string, role: string }[] = [
    {
      name: 'Ans van Testlingen',
      email: 'test@reconcept.nl',
      role: 'STUDENT'
    },
    {
      name: 'Steven Karma',
      email: 'steven@reconcept.nl',
      role: 'TEACHER'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ UserImportComponent ]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', async () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title ${title}`, async() => {
    const userImport = fixture.debugElement.componentInstance;
    console.log(userImport.title);
    expect(userImport.title).toEqual(title);
  });

  it('should render title in a h1 tag', async() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(title);
  });

  it('should have editMode boolean to be false and toggleable', (): void => {
    expect(component.editMode).toBeFalse();
    component.toggleEditMode();
    expect(component.editMode).toBeTrue();
  });

});

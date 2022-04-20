import {Component, OnInit} from '@angular/core';
import {rawData} from '../raw-data';
import {getRoleTypeStrings, MockApiService, Portfolio, Role, RoleTypeEnum, User} from '../mock-api.service';
import {UploadStatus, UserUpload} from './types/user-upload.type';

@Component({
  selector: 'app-user-import',
  templateUrl: './user-import.component.html',
  styleUrls: ['./user-import.component.scss']
})
export class UserImportComponent implements OnInit {

  readonly title: string = 'Welcome to UserImport!';

  userUploads: UserUpload[] = [];
  editMode: boolean = false;
  hideSuccessStatus: boolean = true;

  constructor(
    private mockApi: MockApiService
  ){}

  ngOnInit(): void {
    this.loadRawData();
  }

  private loadRawData(): void {

    // get the rawData from the provided file
    rawData.forEach(rawUser => this.userUploads.push(new UserUpload(rawUser)));
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  toggleSuccessFilter(): void {
    this.hideSuccessStatus = !this.hideSuccessStatus;
  }

  clickSubmit(): void {

    // for each user check where to (re-)start upload process and start it
    this.userUploads.forEach((userUpload: UserUpload) => {
      if (userUpload.rawUser.role.toUpperCase() === 'STUDENT' && userUpload.portfolioId) return;

      if (userUpload.rawUser.role.toUpperCase() === 'TEACHER' && userUpload.roleId) return;

      if (userUpload.userId && !userUpload.roleId) {
        try {
          this.createRole(userUpload, userUpload.userId, userUpload.rawUser.role);
        } catch (error) {
          console.error(error);
          return;
        }
      }

      if (userUpload.status !== UploadStatus.Success && !userUpload.userId) {
        this.createUser(userUpload);
      }

    });

  }

  createUser(userUpload: UserUpload): void {
    this.setStatusInProgress(userUpload);

    this.mockApi.createUser(userUpload.rawUser.name, userUpload.rawUser.email)
      .subscribe({
        next: (user: User) => {
          userUpload.userId = user.id;
          this.createRole(userUpload, user.id, userUpload.rawUser.role)
        },
        error: (err) => this.setStatusError(userUpload, err),
        complete: () => {
          if (userUpload.status !== UploadStatus.Error) {
            this.setStatusSuccess(userUpload);
          }
        }

      });

  }

  createRole(userUpload: UserUpload, forUserId: string, roleString: string): void {

    // temporary solution to handle a typo in role. See this.tempRoleConvert() for: to do
    if (!getRoleTypeStrings().includes(roleString)) {

      let roleTypes: string = '';
      getRoleTypeStrings().forEach(string => roleTypes += `${string} `);

      this.setStatusError(userUpload, `Error: incorrect role, use one of these: ${roleTypes}`);

      throw Error('De opgegeven rol is niet bekend');
    } else {

      const roleType: RoleTypeEnum = this.tempRoleConvert(roleString);

      this.mockApi.createRole(forUserId, roleType).subscribe({
        next: (role: Role) => {
          userUpload.roleId = role.id;

          if (role.roleType === RoleTypeEnum.student) {
            this.createPortfolio(forUserId, userUpload);
          }
        },
        error: (err) => {
          this.setStatusError(userUpload, err);
          throw Error('De opgegeven rol is niet bekend');
        },
        complete: () => {
          this.setStatusSuccess(userUpload);
        }

      });

    }

  }

  createPortfolio(forUserId: string, userUpload: UserUpload): void {
    this.mockApi.createPortfolio(forUserId).subscribe((portfolio: Portfolio) => userUpload.portfolioId = portfolio.id);
  }

  //TODO ask Gerhard how to handle the string vs enum situation.
  // imho the mockApi needs a change, but the assignment say I can't.
  // mockApi.createRole accepts a RoleTypeEnum and then checks if the roleType is correct
  // An incorrect roleType string can't be converted to an enum (or I'm missing something here :-) ),
  // therefore I think a string should be accepted as well, like this: createRole(forUserId: string, roleType: RoleTypeEnum | string)
  // and the validation should be the first thing to check in the createRole method
  tempRoleConvert(role: string): RoleTypeEnum{
    let roleType: RoleTypeEnum;

    if (role.toUpperCase() === 'STUDENT') {
      roleType = RoleTypeEnum.student;
    } else {
      roleType = RoleTypeEnum.teacher;
    }

    return roleType;
  }

  setStatusInProgress(userUpload: UserUpload): void {

    userUpload.status = UploadStatus.InProgress;
    userUpload.message = '';
  }

  setStatusError(userUpload: UserUpload, error: any): void {

    userUpload.status = UploadStatus.Error;
    userUpload.message = error;
  }

  setStatusSuccess(userUpload: UserUpload): void {

    userUpload.status = UploadStatus.Success;
    userUpload.message = '';
  }

}

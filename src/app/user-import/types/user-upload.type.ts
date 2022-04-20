import {RawUser} from './raw-user.type';

export enum UploadStatus {
  ToDo = 'TO DO',
  InProgress = 'IN PROGRESS',
  Success = 'Success',
  Error =  'Error'
}


// wrapper to keep track of uploadstatus
export class UserUpload {
  rawUser: RawUser;
  userId?: string;
  roleId?: string;
  portfolioId?: string;
  status: UploadStatus;
  message?: string;

  constructor(rawUser: { name: string; email: string; role: string }) {
    this.rawUser = rawUser;
    this.status = UploadStatus.ToDo;
  }
}

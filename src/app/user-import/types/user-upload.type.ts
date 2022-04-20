import {RawUser} from './raw-user.type';

export type UploadStatus = 'to do' | 'in progress' | 'success' | 'error';

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
    this.status = 'to do';
  }
}

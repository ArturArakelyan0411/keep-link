import { IUser } from '../../core/models/user.model';

export interface UserState {
  user: IUser | null;
}
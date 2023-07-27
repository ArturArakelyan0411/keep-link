// Models
import { IFolder } from '../../core/models/folder.model';

export interface FolderState {
  list: IFolder[];
  loading: {
    getFolders: boolean;
    addFolder: boolean;
    editFolder: boolean;
  };
  errors: {
    getFolders: boolean;
  };
}
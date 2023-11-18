
import { user } from "src/app/main/models/user.model";

export interface userState {
  users: any[];
  loading: boolean;
  error: string | null;
}

import { IBaseEntity } from "./IBaseEntity";
import { IProfile } from "./IProfile";

export interface IReview extends IBaseEntity {
  id: string;
  text: string;
  createdByUser: IProfile;
  createdAt: string;
}

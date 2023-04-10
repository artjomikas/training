import { IBaseEntity } from "./IBaseEntity";

export interface IReview extends IBaseEntity {
  id: string;
  text: string;
  appUserId: string;
  createdAt: string;
}

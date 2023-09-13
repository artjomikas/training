import { IProfile } from "./IProfile";

export interface IComment {
  id: string;
  text: string;
  appUser: IProfile
  createdAt: string;
  parentCommentId: string;
  replies: IComment[]
}
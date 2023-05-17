export interface IComment {
  id: string;
  text: string;
  appUserFirstName: string;
  appUserLastName: string;
  createdAt: string;
  parentCommentId: string;
  replies: IComment[]
}
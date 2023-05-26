import { IComment } from "../domain/IComment";
import dayjs from "dayjs";
import { TbMessageCircle } from "react-icons/tb";
import CommentSettingDropDown from "./CommentSettingDropDown";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Comment = ({
  data,
  setReply,
  setReplyMessageId,
  style,
  deleteComment,
}: {
  data: IComment;
  setReply: React.Dispatch<React.SetStateAction<string>>;
  setReplyMessageId: React.Dispatch<React.SetStateAction<string>>;
  style: string;
  deleteComment: any;
}) => {
  const { user } = useContext(AuthContext);

  console.log(data);
  return (
    <article className={`p-6 ${style}`}>
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center pb-2">

          <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
            <img
              id="avatar"
              src={data.appUser.image}
              className="mr-2 w-6 h-6 rounded-full "
              alt="Profile Avatar"
            />
            {data.appUser.firstName} {data.appUser.lastName}
          </p>
          
          <p className="text-sm text-gray-600">
            {dayjs(data.createdAt).format("MMM DD, HH:mm")}
          </p>
        </div>

        {(data.appUser.id == user?.id && (
          <CommentSettingDropDown
            commentId={data.id}
            deleteComment={deleteComment}
          />
        )) ||
          ""}
      </footer>

      <p className="text-gray-500 ">{data.text}</p>

      <div className="flex items-center mt-4 space-x-3">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline"
          onClick={() => {
            setReply(
              `Reply to ${data.appUser.firstName} ${data.appUser.lastName}`
            );
            setReplyMessageId(data.id);
          }}
        >
          <TbMessageCircle className="text-gray-500 text-md mr-1" />
          Reply
        </button>
      </div>
    </article>
  );
};
export default Comment;

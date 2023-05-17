import { IComment } from "../domain/IComment";
import dayjs from "dayjs";
import { TbMessageCircle } from "react-icons/tb";

const Comment = ({
  data,
  setReply,
  setReplyMessageId,
  style,
}: {
  data: IComment;
  setReply: React.Dispatch<React.SetStateAction<string>>;
  setReplyMessageId: React.Dispatch<React.SetStateAction<string>>;
  style: string;
}) => {
  return (
    <article className={`p-6 ${style}`}>
      <div className="flex items-center pb-2">
        <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
          <img
            id="avatar"
            src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
            className="mr-2 w-6 h-6 rounded-full "
            alt="Profile Avatar"
          />
          {data.appUserFirstName} {data.appUserLastName}
        </p>
        <p className="text-sm text-gray-600">
          {dayjs(data.createdAt).format("MMM DD, HH:mm")}
        </p>
      </div>

      <p className="text-gray-500 dark:text-gray-400">{data.text}</p>

      <div className="flex items-center mt-4 space-x-3">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline"
          onClick={() => {
            setReply(
              `Reply to ${data.appUserFirstName} ${data.appUserLastName}`
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

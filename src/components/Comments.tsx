import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { CommentService } from "../services/CommentService";
import { AuthContext } from "../context/AuthContext";
import { IComment } from "../domain/IComment";
import dayjs from "dayjs";

import { MdOutlineClose } from "react-icons/md";
import Comment from "./Comment";
import { WorkoutService } from "../services/WorkoutService";

const Comments = ({
  workoutId,
  comments,
}: {
  workoutId: string;
  comments: IComment[];
}) => {
  const workoutService = new WorkoutService();

  const [formattedComments, setFormattedComments] = useState<IComment[]>([]);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const [statusText, setStatusText] = useState("");
  const [reply, setReply] = useState("");
  const [replyMessageId, setReplyMessageId] = useState("");

  const nest = (items: any, id = null, link = "parentCommentId") =>
    items
      .filter((item: any) => item[link] === id)
      .map((item: any) => ({
        ...item,
        replies: nest(items, item.id),
      }));

  const onSubmit = async (data: any) => {
    data.workoutId = workoutId;
    data.appUserId = user.id;
    data.parentCommentId = replyMessageId;
    data.createdAt = dayjs();

    const commentService = new CommentService();
    await commentService.add(data);

    setReplyMessageId("");
    setReply("");

    setStatusText("Successfuly added!");
    // Remove success text
    setTimeout(() => {
      setStatusText("");
    }, 3000);

    workoutService.getById(workoutId).then((result) => {
      setFormattedComments(nest(result.comments));
    });
  };

  useEffect(() => {
    if (comments != undefined) {
      setFormattedComments(nest(comments));
    }
  }, [comments]);

  return (
    <div className="pt-6 pb-24">
      <form
        className={`mb-6 ${reply && "hidden"}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <textarea
            id="comment"
            {...register("text")}
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          >
            Post comment
          </button>
          {reply && (
            <div className="flex gap-2 items-center  text-gray-500">
              <p className="text-sm">{reply}</p>
              <MdOutlineClose
                className="cursor-pointer"
                onClick={() => {
                  setReply("");
                  setReplyMessageId("");
                }}
              />
            </div>
          )}

          <p className="text-sm text-emerald-600">{statusText}</p>
        </div>
      </form>

      <div className="pt-8">
        {formattedComments?.map((data, index) => (
          <div key={index} className="border-b-2 last:border-0 mb-6">
            <Comment
              data={data}
              style={""}
              setReply={setReply}
              setReplyMessageId={setReplyMessageId}
            />

            {data.replies.map((reply, index) => (
              <div key={index}>
                <Comment
                  style={"ml-8 "}
                  data={reply}
                  setReply={setReply}
                  setReplyMessageId={setReplyMessageId}
                />
              </div>
            ))}

            {replyMessageId == data.id && (
              <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <textarea
                    id="comment"
                    {...register("text")}
                    rows={6}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <div className="flex gap-4 items-center">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                  >
                    Post comment
                  </button>
                  {reply && (
                    <div className="flex gap-2 items-center  text-gray-500">
                      <p className="text-sm">{reply}</p>
                      <MdOutlineClose
                        className="cursor-pointer"
                        onClick={() => {
                          setReply("");
                          setReplyMessageId("");
                        }}
                      />
                    </div>
                  )}

                  <p className="text-sm text-emerald-600">{statusText}</p>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Comments;

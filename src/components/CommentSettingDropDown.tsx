import { useState } from "react";
import { CommentService } from "../services/CommentService";

const CommentSettingDropDown = ({
  commentId,
  deleteComment,
}: {
  commentId: string;
  deleteComment: any;
}) => {
  const [active, setActive] = useState(false);

  const editComment = async () => {
    const commentService = new CommentService();
    await commentService.removeComment(commentId);
  };

  return (
    <div className="inline-flex ">
      <div className="relative">
        <button
          onClick={() => setActive(!active)}
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>

        <div
          className={` right-0 z-10 w-40 mt-2 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg ${
            active ? "absolute" : "hidden"
          }`}
        >
          <div className="p-2">
            <a
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
              onClick={() => editComment()}
            >
              Edit
            </a>
            <a
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
              onClick={() => {
                deleteComment(commentId);
                setActive(false);
              }}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentSettingDropDown;

import { IReview } from "./../domain/IReview";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Review = ({ review }: { review: IReview }) => {
  return (
    <section className="py-6 border-b w-[50%] ">
      <footer className="flex justify-between items-center mb-2">
        <Link to={`/profile/${review.createdByUser.id}`}>
          <div className="flex items-center pb-2 ">
            <img
              id="avatar"
              src={review.createdByUser.image}
              className="mr-4 w-8 h-8 rounded-full "
              alt="Profile Avatar"
            />
            <p className="inline-flex items-center mr-3 text-gray-900 ">
              {review.createdByUser.firstName} {review.createdByUser.lastName}
            </p>

            <p className="text-gray-600">
              {dayjs(review.createdAt).format("MMM DD, HH:mm")}
            </p>
          </div>
        </Link>
      </footer>

      <p className="text-gray-500 dark:text-gray-400">{review.text}</p>
    </section>
  );
};
export default Review;

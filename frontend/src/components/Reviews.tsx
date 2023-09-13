import { IReview } from "../domain/IReview";
import Review from "./Review";

const Reviews = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <>
      <div className="text-2xl font-medium pt-20">Reviews:</div>
      {reviews.map((review: any, i: number) => (
        <Review review={review} />
      ))}
    </>
  );
};
export default Reviews;

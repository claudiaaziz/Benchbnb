import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/benches";

const ReviewShow = ({ review, benchId }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  const handleDeleteReview = () => dispatch(deleteReview(review.id, benchId))

  return (
    <ul className="review">
      <li>Rating: {review.rating}/5</li>
      <li>{review.username}</li>
      <li>{review.body}</li>
      {sessionUser?.id === review.userId && <button onClick={handleDeleteReview} className="delete-review">Delete your review</button>}
    </ul>
  )
}

export default ReviewShow;
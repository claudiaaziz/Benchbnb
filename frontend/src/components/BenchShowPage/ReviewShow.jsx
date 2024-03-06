import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";

const ReviewShow = ({ review }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  const handleDeleteReview = () => dispatch(deleteReview(review.id))

  return (
    <ul className="review">
      <li>{review.username}</li>
      <li>{review.rating}/5</li>
      <li>{review.body}</li>
      {sessionUser.id === review.userId && <button onClick={handleDeleteReview} className="delete-review">Delete your review</button>}
    </ul>
  )
}

export default ReviewShow;
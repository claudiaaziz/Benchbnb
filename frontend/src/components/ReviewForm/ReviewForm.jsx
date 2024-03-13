import { useDispatch } from "react-redux";
import { useInput, useSubmit } from "../../hooks";
import { FormErrors, Input, TextArea } from "../Forms";
import "./ReviewForm.css"
import { createReview, fetchBench } from "../../store/benches";

const ReviewForm = ({ benchId, closeModal }) => {
  const dispatch = useDispatch();
  const [rating, onRatingChange] = useInput(5);
  const [comment, onCommentChange] = useInput("");

  const [errors, onSubmit] = useSubmit({
    action: createReview( { rating, body: comment, benchId }),
    onSuccess: () => {
      closeModal()
      dispatch(fetchBench(benchId))
    }
  })

  return (
    <form onSubmit={onSubmit} className="review-form">
      <FormErrors errors={errors} />
        <Input
          label="Rate this bench:"
          type='number'
          min="1"
          max="5"
          value={rating}
          onChange={onRatingChange}
          required
        />
        <TextArea
          label="Comment:"
          cols="30"
          rows="10"
          value={comment}
          onChange={onCommentChange}
          required
        />
      <button type="submit">Submit Review</button>
    </form>
  )
}

export default ReviewForm
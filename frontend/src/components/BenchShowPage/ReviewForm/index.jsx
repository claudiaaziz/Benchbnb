import { useDispatch, useSelector } from "react-redux";
import { useInput, useSubmit } from "../../../hooks";
import { FormErrors, Input, TextArea } from "../../formElements";
import "./ReviewForm.css"
import { createReview, fetchBench } from "../../../store/benches";
import { closeModal } from "../../../store/modal";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const bench = useSelector(state => state?.modal?.props.bench)
  const [rating, onRatingChange] = useInput(5);
  const [comment, onCommentChange] = useInput("");

  const [errors, onSubmit] = useSubmit({
    action: createReview( { rating, body: comment, benchId: bench?.id }),
    onSuccess: () => {
      dispatch(closeModal())
      dispatch(fetchBench(bench.id))
    }
  })

  return (
    <form onSubmit={onSubmit} className="review-form form">
      <h1>Review {bench?.title}</h1>
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
          placeholder="Leave a Comment..."
          cols="30"
          rows="6"
          value={comment}
          onChange={onCommentChange}
          required
        />
      <button type="submit">Submit Review</button>
    </form>
  )
}

export default ReviewForm
import { useInput, useSubmit } from "../../hooks";
import { FormErrors, Input, TextArea } from "../Forms";
import "./ReviewForm.css"
import { createReview, fetchBench } from "../../store/benches";

const ReviewForm = ({ benchId, onClose }) => {
  const [rating, onRatingChange] = useInput(5);
  const [comment, onCommentChange] = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { rating, body: comment, benchId }
    const res = await dispatch(createReview(review))

    if (res.message) {
      onClose()
      dispatch(fetchBench(benchId))
    } else {
      const validationErrors = res.errors
      setErrors([...validationErrors])
    }
  };

  // const [errors, onSubmit] = useSubmit({
  //   createAction: () => {
  //     const review = { rating, body: comment, benchId }
  //     return createReview(review)
  //   },
  //   onSuccess: () => console.log("successss yay")
  // })

  return (
    <form onSubmit={onSubmit} className="review-form">
      {errors.length > 0 && <FormErrors errors={errors}/>}

        <Input
          label="Rate this bench:"
          type='number'
          min="0"
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
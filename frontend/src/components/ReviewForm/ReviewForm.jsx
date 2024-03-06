import { useState } from "react";
import { useDispatch } from "react-redux";
import { useInput } from "../../hooks";
import { FormErrors, Input, TextArea } from "../Forms";
import "./ReviewForm.css"
import { createReview } from "../../store/reviews";

const ReviewForm = ({ benchId, onClose }) => {
  const dispatch = useDispatch();
  const [rating, onRatingChange] = useInput(0);
  const [description, onDescriptionChange] = useInput("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { rating, body: description, benchId }
    const res = await dispatch(createReview(review))

    if (res.rating) {
      onClose()
    } else {
      const validationErrors = res.errors
      setErrors([...validationErrors])
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && <FormErrors errors={errors}/>}
        <Input
          label="Rate this bench"
          type='number'
          value={rating}
          onChange={onRatingChange}
          required
        />
        <TextArea
          label="Description:"
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
          required
        />
      <button type="submit">Submit Review</button>
    </form>
  )
}

export default ReviewForm
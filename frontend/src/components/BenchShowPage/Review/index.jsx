const Review = ({ review }) => {
  return (
    <ul className="review">
      <li>{review.username}</li>
      <li>{review.rating}/5</li>
      <li>{review.body}</li>
    </ul>
  )
}

export default Review
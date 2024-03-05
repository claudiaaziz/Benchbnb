import csrfFetch from "./csrf";

export const SET_REVIEW = "reviews/SET_REVIEW";

const setReview = (review) => ({
  type: SET_REVIEW,
  payload: review,
});

export const createReview = (reviewData) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!res.ok) throw res;

    const newReview = await res.json();
    dispatch(setReview(newReview));
    return newReview;
  } catch (error) {
    const validationErrors = await error.json();
    console.error("Error creating review:", error);
    return validationErrors;
  }
};

const reviewesReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_REVIEW:
      return { ...state, [action.payload.review.id]: action.payload.review };
    default:
      return state;
  }
};

export default reviewesReducer;

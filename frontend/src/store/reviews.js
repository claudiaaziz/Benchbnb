import csrfFetch from "./csrf";

export const SET_REVIEW = "reviews/SET_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

const setReview = (review) => ({
  type: SET_REVIEW,
  payload: review,
});

const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  payload: reviewId,
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

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) dispatch(removeReview(reviewId));
};

const reviewesReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_REVIEW:
      return { ...state, [action.payload.review.id]: action.payload.review };
    case REMOVE_REVIEW:
      const newState = {...state}
      delete newState[action.payload.reviewId]
      return newState
    default:
      return state;
  }
};

export default reviewesReducer;

import csrfFetch from "./csrf";

export const SET_BENCHES = "benches/SET_BENCHES";
export const SET_BENCH = "benches/SET_BENCH";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

const setBenches = (benches) => ({
  type: SET_BENCHES,
  payload: benches,
});

const setBench = (bench) => ({
  type: SET_BENCH,
  payload: bench,
});

const removeReview = (reviewId, benchId) => ({
  type: REMOVE_REVIEW,
  payload: { reviewId, benchId: Number(benchId) },
});

export const fetchBenches = filters => async (dispatch) => {
  const filterParams = new URLSearchParams(filters)
  const res = await csrfFetch(`/api/benches?${filterParams}`);
  const benches = await res.json();
  dispatch(setBenches(benches));
};

export const fetchBench = (benchId) => async (dispatch) => {
  const res = await csrfFetch(`/api/benches/${benchId}`);
  const bench = await res.json();
  dispatch(setBench(bench));
};

export const createBench = benchFormData => async (dispatch) => {
    const res = await csrfFetch("/api/benches", {
      method: "POST",
      body: benchFormData,
    });

    const newBench = await res.json();
    dispatch(setBench(newBench));
    return res;
};

export const createReview = (reviewData) => async (dispatch) => { // for now this works bc if res.ok dispatch fetch bench in useSubmit
  await csrfFetch("/api/reviews", {
    method: "POST",
    body: JSON.stringify(reviewData)
  });
};

export const deleteReview = (reviewId, benchId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) dispatch(removeReview(reviewId, benchId));
};

const benchesReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_BENCHES:
      return { ...action.payload };
    case SET_BENCH:
      return { ...state, [action.payload.bench.id]: action.payload.bench };
    case REMOVE_REVIEW: {
      const benchId = action.payload.benchId;
      const reviewsLeft = state[benchId].reviews.filter(
        (review) => review.id !== action.payload.reviewId
      );

      return { ...state, [benchId]: {...state[benchId], reviews: reviewsLeft } }
    }
    default:
      return state;
  }
};

export default benchesReducer;

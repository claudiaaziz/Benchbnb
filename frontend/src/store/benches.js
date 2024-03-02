import csrfFetch from "./csrf";

export const SET_BENCHES = "benches/SET_BENCHES";
export const SET_BENCH = "benches/SET_BENCH";

const setBenches = (benches) => ({
  type: SET_BENCHES,
  payload: benches,
});

const setBench = (bench) => ({
  type: SET_BENCH,
  payload: bench,
});

export const fetchBenches = () => async (dispatch) => {
  const res = await csrfFetch("/api/benches");
  const benches = await res.json();
  dispatch(setBenches(benches));
};

export const fetchBench = (benchId) => async (dispatch) => {
  const res = await csrfFetch(`/api/benches/${benchId}`);
  const bench = await res.json();
  dispatch(setBench(bench));
};

export const createBench = (benchData) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/benches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(benchData),
    });

    if (!res.ok) throw res;

    const newBench = await res.json();
    dispatch(setBench(newBench));
    return newBench;
  } catch (error) {
    console.error("Error creating bench:", error);
    return null;
  }
};

const benchesReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_BENCHES:
      return { ...action.payload };
    case SET_BENCH:
      return { ...state, [action.payload.bench.id]: action.payload.bench };
    default:
      return state;
  }
};

export default benchesReducer;

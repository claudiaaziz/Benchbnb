export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modalTitle, props) => ({
  type: OPEN_MODAL,
  payload: {modalTitle: modalTitle, props: props}
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

const modalReducer = (state = {}, action) => {

  switch (action.type) {
    case "OPEN_MODAL":
        return { ...state, ...action.payload }
    case "CLOSE_MODAL":
      return {};
    default:
      return state;
  }
};

export default modalReducer;

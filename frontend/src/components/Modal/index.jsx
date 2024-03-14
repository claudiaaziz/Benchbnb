import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modal";
import ReviewForm from "../BenchShowPage/ReviewForm";
import SignupForm from "../SessionForms/SignupForm";
import LoginForm from "../SessionForms/LoginForm";
import "./Modal.css"

const Modal = () => {
  const dispatch = useDispatch()
  const modalTitle = useSelector(state => state.modal.modalTitle)

  if (!modalTitle) return null;

  let component;
  let modalClass;

  switch (modalTitle) {
    case "login":
      component = <LoginForm />;
      modalClass = "login-modal";
      break;
    case "signup":
      component = <SignupForm />;
      modalClass = "signup-modal";
      break;
    case "ReviewForm":
      component = <ReviewForm />;
      modalClass = "review-form-modal";
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={() => dispatch(closeModal())}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

export default Modal
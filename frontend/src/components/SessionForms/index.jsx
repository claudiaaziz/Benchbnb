import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const SessionModal = ({ setShowModal, showModal, type }) => {
  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {type === "login" ? <LoginForm setShowModal={setShowModal} /> : <SignupForm setShowModal={setShowModal}/>}
        </Modal>
      )}
    </>
  );
}

export default SessionModal;
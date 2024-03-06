import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';

const ReviewFormModal = ({ benchId }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false)

  return (
    <>
      <button onClick={() => setShowModal(true)}>Review this bench!</button>
      {showModal && (
        <Modal onClose={closeModal}>
          <ReviewForm onClose={closeModal} benchId={benchId}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;
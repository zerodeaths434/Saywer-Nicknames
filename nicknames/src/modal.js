import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { isModalOpen, closeModal, result } = useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h1>{result}</h1>
        <div className="omg">
          <button className="close-btn" onClick={closeModal}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

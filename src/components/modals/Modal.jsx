import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import close from "./close.svg";
import "./style.css";

function Modals({ title, openModal, modalSize, onClose, btnText, children }) {
  return (
    <Modal
      show={openModal}
      size={modalSize}
      onClose={onClose}
      className="bg-gray-400"
      style={{
        borderRadius: "5.489px",
        padding: "0",
        zIndex: "100"
      }}
    >
      <div className="flex justify-between items-center mr-6 ml-6 py-4">
        <p className="modal-title">{title}</p>
        <button className="modal-close" onClick={onClose}>
          <img src={close} alt="" />
        </button>
      </div>

      <Modal.Body>
        <div className="">{children}</div>

        {btnText && ( // Check if btnText is provided
          <div className="flex justify-center pb-10 p-3">
            <button className="modal-btn w-full">{btnText}</button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

// PropTypes definition
Modals.propTypes = {
  title: PropTypes.string,
  openModal: PropTypes.bool.isRequired,
  modalSize: PropTypes.string.isRequired,
  btnText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modals;

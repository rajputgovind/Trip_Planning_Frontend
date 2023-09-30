import React from "react";
import Modal from "react-modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "next/image";
import check from "../../public/doublecheck.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const index = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="container-fluid">
        <button onClick={openModal} className="btn btn-primary mb-4">
          Open Modal
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="modal-title p-3 mb-3">
            <div className="modal-title-txt-2 d-flex justify-content-center ">
              <h2>طلب الانضمام</h2>
            </div>
          </div>

          <div className="p-3">
            <div className="text-content--2 mt-104">
              <h2>
                <span>تم طلب الانضمام بنجاح، شكرًا لاستخدام Gate 8</span>
              </h2>
              <h2>سيتم التواصل من قبل منظم الرحلة لتأكيد انضمامك للرحلة</h2>
            </div>
            <div className="confirm-img-box d-flex justify-content-center">
              <Image src={check} alt="" />
            </div>
            <div className="modal-btn--1 mb-5">
              <button>تفاصيل رحلتي</button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default index;

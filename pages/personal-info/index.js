import React from "react";
import Modal from "react-modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

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
          <div className="modal-title p-3 d-flex justify-content-end mb-3">
            <div className="modal-title-txt">
              <h2>المعلومات الشخصية</h2>
              <h2 onClick={closeModal} className="mb-0 cross-btn">
                X
              </h2>
            </div>
          </div>

          <div className="p-3 list-text-content">
            <Form>
              <Row className="mb-5">
                <Col>
                  <Form.Label>الاسم الأول</Form.Label>
                  <Form.Control />
                </Col>
                <Col>
                  <Form.Label>الاسم الثاني</Form.Label>
                  <Form.Control />
                </Col>
              </Row>
              <Row className="mb-5">
                <Col>
                  <Form.Label>رقم الجوال</Form.Label>
                  <Form.Control />
                </Col>
                <Col>
                  <Form.Label>الجنس</Form.Label>
                  <Form.Control />
                </Col>
              </Row>
              <Row className="mb-190">
                <Col>
                  <Form.Label>الايميل</Form.Label>
                  <Form.Control />
                </Col>
                <Col>
                  <Form.Label>تاريخ الميلاد</Form.Label>
                  <Form.Control />
                </Col>
              </Row>
            </Form>
            <div className="modal-btn--1 mb-5">
              <button>البحث</button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default index;

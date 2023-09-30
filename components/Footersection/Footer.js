import React from "react";
import Modal from "react-modal";

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

const Footer = () => {
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
        <h1 className="text-center">Footer section</h1>
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
          <div className="modal-title p-3 d-flex justify-content-end">
            <div className="modal-title-txt">
              <h2>الشروط والأحكام</h2>
              <h2 onClick={closeModal} className="mb-0 cross-btn">
                X
              </h2>
            </div>
          </div>

          <div className="p-3 list-text-content">
            <ol>
              <li>
                الرجال فقط: هذه الرحلة مخصصة للرجال فقط. يرجى التأكد من أنك
                تستوفي هذا الشرط قبل
              </li>

              <li>
                المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين
                واللوائح المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة
                بالانقراض أو النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين
                الصادرة عن
              </li>
              <li>
                المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين
                واللوائح المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة
                بالانقراض أو النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين
                الصادرة عن
              </li>
              <li>
                المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين
                واللوائح المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة
                بالانقراض أو النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين
                الصادرة عن
              </li>
              <li>
                المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين
                واللوائح المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة
                بالانقراض أو النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين
                الصادرة عن
              </li>
              <li>
                المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين
                واللوائح المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة
                بالانقراض أو النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين
                الصادرة عن
              </li>
            </ol>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Footer;

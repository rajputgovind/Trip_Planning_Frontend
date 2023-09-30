import React, { useEffect, useState, useContext } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import emptycheck from "../../public/emptycheck.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import Header from "@/components/HeaderSection/Header";
import { useRouter } from "next/router";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import cookie from "js-cookie";
import { MyContext } from "../../MyContext";
import {
  addDestinationForm,
  createDocuments,
} from "../../ApiServices/apiService";
import check from "../../public/doublecheck.svg";
import Modal from "react-bootstrap/Modal";

const index = (data) => {
  const router = useRouter();

  const { flightInformation, setFlightInformation, addDestination, setDestination } =
    useContext(MyContext);
  const [documentInfo, setDocumentInfo] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    age: false,
    gender: false,
    healthIssues: false,
    passport: false,
    id: false,
  });

  const createTrip = () => {
    const token = cookie.get("token");
    if (token) {
      if (documentInfo?.firstName || documentInfo?.lastName || documentInfo?.birthDate || documentInfo?.age || documentInfo?.gender || documentInfo?.healthIssues || documentInfo?.passport || documentInfo?.id) {
        let dataFound = addDestinationForm(
          token,
          addDestination,
          router,
          flightInformation,
          documentInfo, setConfirmModalShow, confirmModalShow
        );
      }
      else {
        toast.error("Please check the Document")
      }
    } else {
      router.push("/admin/login");
    }
  };
  const [show, setShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const handleCloseConfirm = () => setConfirmModalShow(false);
  const handleShowConfirm = () => setConfirmModalShow(true);

  return (
    <>
      {/* <Header /> */}
      <ProfileHeader />
      <div className="trip-info-bg-section">
        <div className="container">
          <div className="breadcrumbs-txt-container pt-5">
            <p>إنشاء رحلات</p>
            <MdKeyboardArrowLeft />
            <p
              className="breadcrumbs-active cursor-pointer"
              onClick={() => {
                router.push("/admin/user-form-page");
              }}
            >
              ادخال معلومات الرحلة
            </p>
          </div>
          <div className="info-checkbox">
            <div className="infocheck">
              <div className="active-infocheck"></div>
              <p>معلومات الرحلة</p>
            </div>

            <div className="infocheck">
              <div className="active-infocheck"></div>
              <p>معلومات المسافر</p>
            </div>
          </div>
          <p className=" travller-info">معلومات المسافر المطلوبة</p>
          <div className="form-checkbox-container mb-5">
            <div className="check-list--container">
              <ul>
                <li>
                  <label className="container-check">
                    <input
                      type="checkbox"
                      name="firstName"
                      onChange={(e) => {
                        setDocumentInfo({
                          ...documentInfo,
                          [e.target.name]: !documentInfo?.firstName,
                        });
                      }}
                    />
                    <span className="checkmark">
                      <Image src={emptycheck} alt="" />
                    </span>
                  </label>
                  <p className="txt-test">الاسم الأول</p>
                </li>
                <li>
                  <label className="container-check">
                    <input
                      type="checkbox"
                      name="lastName"
                      onChange={(e) => {
                        setDocumentInfo({
                          ...documentInfo,
                          [e.target.name]: !documentInfo?.lastName,
                        });
                      }}
                    />
                    <span className="checkmark">
                      <Image src={emptycheck} alt="" />
                    </span>
                  </label>
                  <p className="txt-test">جواز السفر</p>
                </li>
                <li>
                  <label className="container-check">
                    <input
                      type="checkbox"
                      name="birthDate"
                      onChange={(e) => {
                        setDocumentInfo({
                          ...documentInfo,
                          [e.target.name]: !documentInfo?.birthDate,
                        });
                      }}
                    />
                    <span className="checkmark">
                      <Image src={emptycheck} alt="" />
                    </span>
                  </label>
                  <p className="txt-test">جواز السفر</p>
                </li>

                <li>
                  <label className="container-check">
                    <input
                      type="checkbox"
                      name="age"
                      onChange={(e) => {
                        setDocumentInfo({
                          ...documentInfo,
                          [e.target.name]: !documentInfo?.age,
                        });
                      }}
                    />
                    <span className="checkmark">
                      <Image src={emptycheck} alt="" />
                    </span>
                  </label>
                  <p className="txt-test"> جواز السفر</p>
                </li>
                {/* <li>
                  <label className="container-check">
                    <input type="checkbox" />
                    <span className="checkmark">
                      <Image src={emptycheck} alt="" />
                    </span>
                  </label>
                  <p className="txt-test"> الاسم الأول</p>
                </li> */}
              </ul>

              <ul>
                <li>
                  <label className="container-check">
                    <input
                      type="checkbox"
                      name="gender"
                      onChange={(e) => {
                        setDocumentInfo({
                          ...documentInfo,
                          [e.target.name]: !documentInfo?.gender,
                        });
                      }}
                    />
                    <span className="checkmark">
                      <Image src={emptycheck} alt="" />
                    </span>
                  </label>
                  <p className="txt-test"> الاسم الاخير</p>
                </li>

                <li>
                  <label className="container-check">
                    <input
                      type="checkbox"
                      name="healthIssues"
                      onChange={(e) => {
                        setDocumentInfo({
                          ...documentInfo,
                          [e.target.name]: !documentInfo?.healthIssues,
                        });
                      }}
                    />
                    <span className="checkmark">
                      <Image src={emptycheck} alt="" />
                    </span>
                  </label>
                  <p className="txt-test"> الرقم</p>
                </li>

                <li>
                  <label className="container-check">
                    <input
                      type="checkbox"
                      name="passport"
                      onChange={(e) => {
                        setDocumentInfo({
                          ...documentInfo,
                          [e.target.name]: !documentInfo?.passport,
                        });
                      }}
                    />
                    <span className="checkmark">
                      <Image src={emptycheck} alt="" />
                    </span>
                  </label>
                  <p className="txt-test"> الاسم الاخير</p>
                </li>

                <li>
                  <label className="container-check">
                    <input
                      type="checkbox"
                      name="id"
                      onChange={(e) => {
                        setDocumentInfo({
                          ...documentInfo,
                          [e.target.name]: !documentInfo?.id,
                        });
                      }}
                    />
                    <span className="checkmark">
                      <Image src={emptycheck} alt="" />
                    </span>
                  </label>
                  <p className="txt-test"> الاسم الاخير</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="user-form-btn">
            {/* handleShowConfirm */}
            <button onClick={createTrip}>انشاء الرحلة</button>
          </div>
        </div>
      </div>

      <Modal
        show={confirmModalShow}
        onHide={handleCloseConfirm}
        className="modal-box"
      >
        <div className="modal-title p-3 mb-3 modal-header--sticky">
          <div className="modal-title-txt-2 d-flex justify-content-center ">
            <h2>طلب الانضمام</h2>
          </div>
        </div>

        <div className="p-3">
          <div className="text-content--2 mt-6">
            <h2>
              <span>تم طلب انشاء رحلة بنجاح، شكرًا لاستخدامك Gate 8 </span>
            </h2>
            <h2>سيتم التواصل معك للموافقة على انشاء الرحلة من قبل المسؤولين</h2>
          </div>
          <div className="confirm-img-box d-flex justify-content-center">
            <Image src={check} alt="" />
          </div>
          <div className="modal-btn--1 mb-5">
            <button
              type="button"
              onClick={() => {
                router.push("/admin/my-trip");
              }}
            >
              تفاصيل رحلتي
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
  // createTrip
};
export async function getServerSideProps(context) {


  const id = context.params.editForm;
  try {
    if (id) {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-single-trip/${id}`
      );
      // const reviewDetails = data?.review;

      return {
        props: {
          data: data?.data,
        },
      };
    } else {
      return {
        props: {
          data: "",
        },
      };
    }
  } catch (err) {
    return {
      props: {},
    };
  }
}
export default index;

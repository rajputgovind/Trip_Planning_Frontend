import Header from "@/components/HeaderSection/Header";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Image from "next/image";
import circle1 from "../../../public/circle-img-1.svg";
import circle2 from "../../../public/circle-img-2.svg";
import circle3 from "../../../public/circle-img-3.svg";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Modal from "react-modal";
import formatDate from "../../../CommonFunctions/FormatDate";
import {
  getJoiningRequest,
  updateStatusFunction,
} from "../../../ApiServices/apiService";
import Link from "next/link";
import { toast } from "react-toastify";

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

const index = (data) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [acceptedModalIsOpen, AcceptedSetIsOpen] = React.useState(false);
  const [RejectModalIsOpen, RejectSetIsOpen] = React.useState(false);

  const [OverlayAcceptModalIsOpen, OverlayAcceptSetIsOpen] =
    React.useState(false);
  const [OverlayRejectModalIsOpen, OverlayRejectSetIsOpen] =
    React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModalAccepted() {
    AcceptedSetIsOpen(true);
  }

  function closeModalAccepted() {
    AcceptedSetIsOpen(false);
  }

  function openModalReject() {
    RejectSetIsOpen(true);
  }

  function closeModalReject() {
    RejectSetIsOpen(false);
  }

  function openModalOverlayAccept() {
    OverlayAcceptSetIsOpen(true);
  }

  function closeModalOverlayAccept() {
    OverlayAcceptSetIsOpen(false);
  }

  function openModalOverlayReject() {
    OverlayRejectSetIsOpen(true);
  }

  function closeModalOverlayReject() {
    OverlayRejectSetIsOpen(false);
  }

  const router = useRouter();
  const [tripDetails, setTripDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState();
  const [id, setId] = useState();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const token = cookie.get("token");
    const role = cookie.get("role");
    if (token) {
      if (role === "Organizer") {
        if (data?.data) {
          getJoiningRequest(setTripDetails, setLoading, token, data?.data);
        }
      } else {
        router.push("/");
      }
    } else {
      router.push("/admin/login");
    }
  }, []);


  const modalFormed = (datastatus) => {
    if (datastatus === "Accepted") {
      openModalAccepted();
    } else if (datastatus === "Rejected") {
      openModalAccepted();
    } else {
      openModal();
    }
  };

  const statusFunction = (statusGot) => {
    let token = cookie.get("token");
    let role = cookie.get("role");
    if (token) {
      if (role === "Organizer") {
        updateStatusFunction(
          token,
          id,
          statusGot,
          setLoading,
          setIsOpen,
          setTripDetails,
          data?.data,
          OverlayAcceptSetIsOpen,
          OverlayRejectSetIsOpen
        );
      } else {
        toast.error("ليس لديك الإذن بالتحديث");
        router.push("/");
      }
    } else {
      router.push("/admin/login");
    }
  };
  const createTrip = () => {
    let token = cookie.get("token");
    let role = cookie.get("role");
    if (token) {
      if (role === "Organizer") {
        router.push("/admin/my-trip");
      } else {
        toast.error("ليس لديك الإذن بالتحديث");
        router.push("/admin/profile-page");
      }
    } else {
      router.push("/admin/login");
    }
  };

  return (
    <>
      <Header />
      {/* <ProfileHeader/> */}
      <div className="trip-info-bg-section">
        <div className="container">
          <div className="breadcrumbs-txt-container pt-5">
            <p
              onClick={() => {
                createTrip();
              }}
              className="cursor-pointer"
            >
              إنشاء رحلات
            </p>
            <MdKeyboardArrowLeft />
            <p className="breadcrumbs-active">رحلة الصيد والمغامرة </p>
          </div>
          {isLoading === true ? (
            <div className="loader-box">
              <div className="loader"></div>
            </div>
          ) : (
            ""
          )}
          <div className="row mt-4">
            <div className="col-lg-5 col-md-6 col-sm-12">
              <p className="details-txt">طلبات الإنضمام</p>
              <div className="bg-trip-req p-3">
                <div className="trip-request-section p-2">
                  {tripDetails &&
                    tripDetails?.joiningRequests?.map((users) => {
                      return (
                        <div className="new-request-box mb-3" key={users?._id}>
                          <p className="mb-0">{users?.userDetails?.name}</p>
                          <button
                            type="button"
                            className={
                              users?.status === "Accepted"
                                ? "btn--green"
                                : users?.status === "Rejected"
                                  ? "btn--red"
                                  : ""
                            }
                            onClick={() => {
                              setStatus(users?.status);
                              setUserInfo({
                                firstName:
                                  users?.userDetails?.name?.split(" ")?.[0],
                                lastName:
                                  users?.userDetails?.name?.split(" ")?.[1],
                                phoneNumber: users?.userDetails?.phone,
                                email: users?.userDetails?.email,
                              });
                              modalFormed(users?.status);
                              setId(users?._id);
                            }}
                          >
                            {users?.status === "Accepted"
                              ? "تم القبول"
                              : users?.status === "Rejected"
                                ? "تم الرفض"
                                : "طلب جديد"}
                          </button>
                        </div>
                      );
                    })}
                  {tripDetails && tripDetails?.joiningRequests?.length == 0 && (
                    <b>لم يتم العثور على المستخدم</b>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-6 col-sm-12">
              <div className="details-btn-box">
                <p className="mb-0 details-txt">تفاصيل الرحلة</p>
                <Link href={`/details-page?id=${data?.data}`}>
                  مشاهدة الرحلة كزائر
                </Link>
              </div>
              <div className="trip-adventure-scetion mt-3">
                <div className="hunting-trip-box">
                  <p>رحلة الصيد والمغامرة</p>
                  <div className="switch-btn-box">
                    <p className="mb-0">حالة الرحلة:</p>
                    <button>فعَّالة</button>
                  </div>
                </div>
                <hr />
                <div className="catagory-section text-common">
                  <p>
                    {tripDetails
                      ? tripDetails?.groupType
                        ? tripDetails?.groupType === "Male"
                          ? "ذكر"
                          : tripDetails?.groupType === "Female"
                            ? "أنثى"
                            : "عائلات"
                        : ""
                      : ""}
                    <span>الفئة</span>
                  </p>
                  <p>
                    {tripDetails
                      ? tripDetails?.tripDuration
                        ? tripDetails?.tripDuration === "One week"
                          ? "إسبوعي"
                          : tripDetails?.tripDuration === "Two weeks"
                            ? "إسبوعين"
                            : tripDetails?.tripDuration === "Month"
                              ? "شهر"
                              : "أكثر من شهر"
                        : ""
                      : ""}
                    : <span>المدة</span>
                  </p>
                  <p>
                    السعر:{" "}
                    <span>{tripDetails ? tripDetails?.tripPrice : ""} ر.س</span>
                  </p>
                </div>
                <p className="text-common">يشمل الاتي:</p>
                <div className="includes-listbox">
                  <ul>
                    {tripDetails
                      ? tripDetails?.tripIncludes
                        ?.split(",")
                        ?.map((tripInclude, index) => {
                          return <li key={index}>{tripInclude}</li>;
                        })
                      : ""}
                  </ul>
                </div>
                <p className="text-common">الرحلة:</p>
                <div className="journey-img-container">
                  {tripDetails
                    ? tripDetails?.destination?.map((place, index) => {
                      return (
                        <div className="img--content" key={index}>
                          <div className="img--box">
                            {/* <Image src={circle1} alt="" /> */}
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGES}/public/destinationImages/${place?.destinationImage[0]}`}
                              alt="img"
                            />
                          </div>

                          <p className="text-common mb-0">{place?.city}</p>
                          <p>{formatDate(place?.destinationDate)}</p>
                        </div>
                      );
                    })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* travel info modal  */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="modal-title p-3 d-flex justify-content-end modal-header--sticky">
            <div className="modal-title-txt">
              <h2>معلومات المُنضم للرحلة</h2>
              <h2 onClick={closeModal} className="mb-0 cross-btn">
                X
              </h2>
            </div>
          </div>
          <div className="px-5">
            <div className="mt-5 name-details-box d-flex justify-content-between">
              <div className="name-box">
                <p>
                  الاسم الأول: <span>{userInfo?.firstName}</span>
                </p>
                <p>
                  الاسم الثاني: <span> {userInfo?.lastName}</span>
                </p>
              </div>
              <div className="number--box">
                <p>
                  رقم الجوال:<span>{userInfo?.phoneNumber}</span>
                </p>
                <p>
                  الايميل:<span>{userInfo?.email}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="sign-out-btn mt-3 pb-5 d-flex justify-content-between px-5">
            <button
              className="file-btn mt-3"
              type="button"
              onClick={() => {
                statusFunction("Accepted");
              }}
            >
              قبول
            </button>

            <button
              className="file-btn mt-3"
              type="buttom"
              onClick={() => {
                statusFunction("Rejected");
              }}
            >
              رفض
            </button>
          </div>
        </Modal>

        {/* Accepted modal  */}

        <Modal
          isOpen={acceptedModalIsOpen}
          onRequestClose={closeModalAccepted}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="modal-title p-3 d-flex justify-content-end modal-header--sticky">
            <div className="modal-title-accepted">
              <button
                className={
                  status === "Accepted"
                    ? "btn--green accept-btn"
                    : "btn--red accept-btn"
                }
              >
                {status === "Accepted" ? "تم القبول " : "تم الرفض"}
              </button>

              <h2>معلومات المُنضم للرحلة</h2>
              <h2 onClick={closeModalAccepted} className="mb-0 cross-btn">
                X
              </h2>
            </div>
          </div>
          <div className="px-5">
            <div className="mt-5 name-details-box d-flex justify-content-between pb-5">
              <div className="name-box">
                <p>
                  الاسم الأول: <span>{userInfo?.firstName}</span>
                </p>
                <p>
                  الاسم الثاني: <span>{userInfo?.lastName}</span>
                </p>
              </div>
              <div className="number--box">
                <p>
                  رقم الجوال:<span>{userInfo?.phoneNumber}</span>
                </p>
                <p>
                  الايميل:<span>{userInfo?.email}</span>
                </p>
              </div>
            </div>
          </div>
        </Modal>
        {/* over accept modal  */}
        <Modal
          isOpen={OverlayAcceptModalIsOpen}
          onRequestClose={closeModalOverlayAccept}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="modal-title p-3  modal-header--sticky">
            <div className="modal-title-accepted">
              <h2 className="">تم قبول المُنضم للرحلة</h2>
              <h2 onClick={closeModalOverlayAccept} className="mb-0 cross-btn">
                X
              </h2>
            </div>
          </div>
          <div className="px-5">
            <div className="mt-5 pb-5">
              <p className="text-center">
                بنجاح{userInfo?.firstName}
                {userInfo?.lastName ? userInfo?.lastName : ""}قبول تم
              </p>
            </div>
          </div>
        </Modal>

        {/* over reject modal  */}

        <Modal
          isOpen={OverlayRejectModalIsOpen}
          onRequestClose={closeModalOverlayReject}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="modal-title p-3  modal-header--sticky">
            <div className="modal-title-accepted">
              <h2 className="">تم رفض المُنضم للرحلة</h2>
              <h2 onClick={closeModalOverlayReject} className="mb-0 cross-btn">
                X
              </h2>
            </div>
          </div>
          <div className="px-5">
            <div className="mt-5 pb-5">
              <p className="text-center">
                بنجاح{userInfo?.firstName}
                {userInfo?.lastName ? userInfo?.lastName : ""}
                {status === "Accepted" ? "قبول تم" : "رفض القيام به"}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  const access_token = context.req.cookies.token;

  const id = context.query.id;
  try {
    if (id) {
      return {
        props: {
          data: id,
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

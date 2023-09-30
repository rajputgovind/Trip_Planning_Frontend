import Header from "@/components/HeaderSection/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import plus from "../../../public/plus-img.svg";
import stars from "../../../public/stars.svg";
import gun from "../../../public/gun.svg";
import italy from "../../../public/italy.svg";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import commonFunction from "../../../CommonFunctions/dateTime";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Modal from "react-modal";
import Link from "next/link";
import arabicFormat from "../../../CommonFunctions/ArabicFormat";
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
import Pagination from "react-js-pagination";
import chevronrighticon from "../../../public/chevron-right-icon.svg";
import chevronlefticon from "../../../public/chevron-left-icon.svg";
import doublearrowleft from "../../../public/double-arrow-left.svg";
import doublearrowright from "../../../public/double-arrow-right.svg";
import { getTripInfo, deleteTripData } from "../../../ApiServices/apiService";
const index = (data) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tripInfo, setTripInfo] = useState([]);
  const [totalDocs, setTotalDocs] = useState();
  const [limit, setLimit] = useState();

  useEffect(() => {
    if (
      data?.data === "token not found" ||
      data?.data?.message === "unAuthorized"
    ) {
      cookie.remove("token");
      cookie.remove("role");
      router.push("/login-page");
    }
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleLogout = () => {
    cookie.remove("token");
    cookie.remove("role");
    setAuthToken("");
    router.push("/admin/login");
    closeModal();
  };
  const createTripFunction = () => {
    let token = cookie.get("token");
    if (token) {
      let role = cookie.get("role");
      if (role === "Organizer") {
        router.push("/admin/trip-info");
      }
    } else {
      router.push("/admin/login");
    }
  };

  const deleteFunction = (id) => {
    let token = cookie.get("token");
    if (token) {
      deleteTripData(id, setLoading, router, token, setTripInfo);
    } else {
      router.push("/admin/login");
    }
  };
  const editTripFunction = (id) => {
    let token = cookie.get("token");
    if (token) {
      router.push(`/admin/edit-info/${id}`);
    } else {
      router.push("/admin/login");
    }
  };
  useEffect(() => {
    const token = cookie.get("token");
    if (token) {
      getTripInfo(
        setTripInfo,
        token,
        setLoading,
        router,
        setLimit,
        setTotalDocs,
        currentPage
      );
    } else {
      router.push("/admin/login");
    }
  }, [currentPage]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Header />
      {/* <ProfileHeader /> */}
      <div className="profile-bg-section">
        <div className="container">
          <div className="row">
            {loading === true ? (
              <div className="loader-box">
                <div className="loader"></div>
              </div>
            ) : (
              ""
            )}
            <div className="col">
              <div className="profile-main-container pt-130">
                <div className="btn-container">
                  <p
                    className="inactive-txt-profile cursor-pointer"
                    onClick={() => router.push("/admin/profile-page")}
                  >
                    الملف الشخصي
                  </p>
                  <p className="active-txt-profile cursor-pointer">رحلاتي</p>
                  <p
                    className="inactive-txt-profile cursor-pointer"
                    onClick={openModal}
                  >
                    تسجيل الخروج
                  </p>
                </div>
                <div className="mt-trip-admin-content">
                  <div className="my-trip-grid">
                    <div className="mytrip-admin-cardbox">
                      <div className="plus-img-box">
                        <Image
                          onClick={() => {
                            createTripFunction();
                          }}
                          src={plus}
                          alt=""
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    {tripInfo?.map((createdTrip) => {
                      return (
                        <div
                          className="mytrip-admin-cardbox"
                          key={createdTrip?._id}
                        >
                          <div className="mycard-img-box">
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripImages/${createdTrip?.mainTripImage}`}
                            />
                           
                          </div>
                          <p className="admin-cardbox-title">
                            {createdTrip?.tripName}
                          </p>
                          <div className="subscriber-box">
                            <p>
                              عدد المنضمين:
                              {createdTrip?.joiningRequests?.length}
                            </p>
                            <p>
                              المدة:
                              {createdTrip?.tripDuration
                                ? createdTrip?.tripDuration === "One week"
                                  ? "إسبوعي"
                                  : createdTrip?.tripDuration === "Two weeks"
                                    ? "إسبوعين"
                                    : createdTrip?.tripDuration === "Month"
                                      ? "شهر"
                                      : "أكثر من شهر"
                                : ""}
                            </p>
                          </div>
                          <div className="date-content d-flex gap-2 align-items-center">
                            <p>التاريخ:</p>
                            <p className="">
                              {arabicFormat(createdTrip?.tripDate)}
                            </p>
                          </div>
                          <div className="btn-box-cardbox d-flex justify-content-end">
                            <button
                              type="button"
                              onClick={() =>
                                router.push(
                                  `/admin/trip-details?id=${createdTrip?._id}`
                                )
                              }
                            >
                              التفاصيل
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {tripInfo?.length === 0 && <b>لم يتم العثور على رحلات</b>}
          {totalDocs >= 6 && (
            <div className="pagination-buttons">
              <div className="table-pagination">
                <span className="text-gray mb-3">
                  عرض {(currentPage - 1) * limit + 1}ل {currentPage * limit} ل{" "}
                  {totalDocs}
                </span>
                <ul className="inline-flex items-center gap-1 ">
                  <li>
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={limit}
                      totalItemsCount={totalDocs}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                      nextPageText={
                        <Image unoptimized src={chevronrighticon} alt="hh" />
                      }
                      prevPageText={
                        <Image unoptimized src={chevronlefticon} alt="hh" />
                      }
                      firstPageText={
                        <Image unoptimized src={doublearrowleft} alt="hh" />
                      }
                      lastPageText={
                        <Image unoptimized src={doublearrowright} alt="hh" />
                      }
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="modal-title-signout p-3 d-flex justify-content-end modal-header--sticky">
          <div className="modal-title-txt">
            <h2>تسجيل الخروج</h2>
            <h2 onClick={closeModal} className="mb-0 cross-btn">
              X
            </h2>
          </div>
        </div>

        <div className="signout-text mt-5 ">
          <p>هل انت متأكد من المتابعة لتسجيل الخروج؟</p>
        </div>
        <div className="sign-out-btn mt-3 pb-5">
          <Link onClick={handleLogout} href="">
            تسجيل الخروج
          </Link>
          {/* <button type="button " onClick={handleLogout}>تسجيل الخروج</button> */}
        </div>
      </Modal>
    </>
  );
};

export default index;

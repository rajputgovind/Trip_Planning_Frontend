import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";
import Image from "next/image";
import shoot from "../../public/shooting.svg";
import galaxy from "../../public/galaxy.svg";
import down from "../../public/down.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import Header from "@/components/HeaderSection/Header";
import Accordion from "react-bootstrap/Accordion";
import circle1 from "../../public/circle-img-1.svg";
import circle2 from "../../public/circle-img-2.svg";
import circle3 from "../../public/circle-img-3.svg";
import upload from "../../public/upload-icon.svg";
import tImage1 from "../../public/travelpic1.svg";
import color from "../../public/color-upload.svg";
import Modal from "react-modal";
import Pagination from "react-js-pagination";
import {
  getAllUserRequest,
  uploadUserInfo,
} from "../../ApiServices/apiService";
import chevronrighticon from "../../public/chevron-right-icon.svg";
import chevronlefticon from "../../public/chevron-left-icon.svg";
import doublearrowleft from "../../public/double-arrow-left.svg";
import doublearrowright from "../../public/double-arrow-right.svg";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import formatDate from "../../CommonFunctions/FormatDate";
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
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [totalDocs, setTotalDocs] = useState();
  const [limit, setLimit] = useState();
  const [userRequest, setAllUserRequest] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [id, setSelectedId] = useState();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const token = cookie.get("token");
    const role = cookie.get("role");
    if (token) {
      if (role === "User") {
        getAllUserRequest(
          setAllUserRequest,
          setLoading,
          setLimit,
          setTotalDocs,
          currentPage,
          token
        );
      } else {
        router.push("/admin/my-trip");
      }
    } else {
      router.push("/admin/login");
    }
  }, [currentPage]);
  const uploadFile = () => {
    let token = cookie.get("token");
    let role = cookie.get("role");
    if (token) {
      if (role === "User") {
        if (selectedFile) {
          uploadUserInfo(
            token,
            selectedFile,
            setLoading,
            id,
            setIsOpen,
            setSelectedFile
          );
        } else {
          toast.error("قم بتحميل الملف أولا");
        }
      } else {
        toast.error("المنظم ليس لديه إذن لرؤية");
      }
    } else {
      router.push("/admin/login");
    }
  };
  function commonFunction(data) {
    if (data) {
      const data1 = data.toString();
      const data2 = new Date(data);
      const dataFound = data2.toString().split(" ");
      let formatDate = ` ${dataFound[2]} ${dataFound[1]}`;

      return formatDate;
    }
  }

  return (
    <>
      <Header />
      {/* <ProfileHeader/> */}
      <div className="mytrip-section">
        <div className="container-fluid">
          <div className="p-class container">
            <div className="breadcrumbs-txt-container mt-2 mb-5">
              <p
                onClick={() => {
                  router.push("/admin/profile-page");
                }}
                className="cursor-pointer"
              >
                الملف الشخصي
              </p>
              {isLoading === true ? (
                <div className="loader-box">
                  <div className="loader"></div>
                </div>
              ) : (
                ""
              )}
              <MdKeyboardArrowLeft />
              <p className="breadcrumbs-active cursor-pointer">رحلاتي</p>
            </div>
            {userRequest?.map((user) => {
              return (
                <div className="accordian-container" key={user?._id}>
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <span>
                          <div className="mytrip-img-container">
                            <div className="img-content">
                              <img
                                src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripImages/${user?.trip?.mainTripImage}`}
                                alt=""
                              />
                            </div>
                            <div className="mytrip-img-txt">
                              <p className="p--1 mb-0">
                                {user?.trip?.tripName}
                              </p>

                              <p className="mb-0">
                                الفئة:
                                {user?.trip?.groupType
                                  ? user?.trip?.groupType === "Male"
                                    ? "ذكر"
                                    : user?.trip?.groupType === "Female"
                                    ? "أنثى"
                                    : "عائلات"
                                  : ""}
                              </p>
                              <p className="mb-0">
                                المدة:
                                {user?.trip?.tripDuration
                                  ? user?.trip?.tripDuration === "One week"
                                    ? "إسبوعي"
                                    : user?.trip?.tripDuration === "Two weeks"
                                    ? "إسبوعين"
                                    : user?.trip?.tripDuration === "Month"
                                    ? "شهر"
                                    : "أكثر من شهر"
                                  : ""}
                              </p>
                              <p className="mb-0">
                                السعر:{user?.trip?.tripPrice} ر.س
                              </p>
                              <p className="mb-0">
                                <span>التفاصيل</span>
                              </p>
                              <span className="accordian-icon">
                                <Image src={down} alt="" />
                              </span>
                            </div>
                          </div>
                        </span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="accordian-content">
                          <p className="text-common">يشمل الاتي:</p>
                          <div className="includes-listbox">
                            <ul>
                              {user?.trip?.tripIncludes
                                ?.split(",")
                                ?.map((userTrips, i) => {
                                  return <li key={i}>{userTrips}</li>;
                                })}
                            </ul>
                          </div>
                          <p className="text-common">الرحلة:</p>

                          <div className="journey-img-container-2">
                            {user?.trip?.destination?.map((tripInfo) => {
                              return (
                                <div
                                  className="img--content"
                                  key={tripInfo?._id}
                                >
                                  <div className="img--box">
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_IMAGES}/public/destinationImages/${tripInfo?.destinationImage[0]}`}
                                      alt="not found"
                                    />
                                    {/* <Image src={tImage1} alt="" /> */}
                                  </div>

                                  <p className="text-common mb-0">
                                    {tripInfo?.city}
                                  </p>
                                  <p>{formatDate(tripInfo?.destinationDate)}</p>
                                </div>
                              );
                            })}

                            {/* <div className="img--content">
                                <div className="img--box">
                                  <Image src={tImage1} alt="" />
                                </div>

                                <p className="text-common mb-0">كيب تاون</p>
                                <p>JULY 16</p>
                              </div>
                              <div className="img--content">
                                <div className="img--box">
                                  <Image src={tImage1} alt="" />
                                </div>

                                <p className="text-common mb-0">قاردن روت</p>
                                <p>JULY 17</p>
                              </div> */}
                          </div>
                          <div className="journey-btn--box">
                            <button
                              type="button"
                              onClick={() => {
                                openModal();
                                setSelectedFile(null);
                                setSelectedId(user?.trip?._id);
                              }}
                            >
                              <Image src={upload} alt="" className="mb-0" />
                              ارفاق ملفات
                            </button>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              );
            })}
            {userRequest?.length === 0 && <b>لم يتم العثور على رحلات</b>}
            {totalDocs >= 6 && (
              <div className="pagination-buttons">
                <div className="table-pagination">
                  <span className="text-gray mb-3">
                    عرض {(currentPage - 1) * limit + 1} ل {currentPage * limit}{" "}
                    ل {totalDocs}
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
          <div className="modal-title p-3 d-flex justify-content-end modal-header--sticky">
            <div className="modal-title-txt">
              <h2>ارفاق ملفات</h2>
              <h2 onClick={closeModal} className="mb-0 cross-btn">
                X
              </h2>
            </div>
          </div>
          <div className="px-5">
            <div className="mt-3">
              <p>ارفق الملف هنا</p>
            </div>
            <div className="upload-input--box">
              <Image src={color} alt="" />

              <input
                type="file"
                onClick={(e) => {
                  e.target.value = null;
                  setSelectedFile(null);
                }}
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                }}
              />
              <span>{selectedFile?.name}</span>
            </div>
          </div>

          <div className="sign-out-btn mt-3 pb-5">
            <button
              type="button"
              onClick={() => uploadFile()}
              className="file-btn mt-3"
            >
              {/* {isLoading && <span className="loader1 loader-img"></span>} */}
              ارفاق
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default index;

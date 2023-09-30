import Header from "@/components/HeaderSection/Header";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import sideimg1 from "../../public/side-img-1.svg";
import sideimg2 from "../../public/side-img-2.svg";
import sideimg3 from "../../public/side-img-3.svg";
import sideimg4 from "../../public/side-img-4.svg";
import middleimg1 from "../../public/middleimg1.svg";
import middleimg2 from "../../public/middleimg2.svg";
import middleimg3 from "../../public/middleimg3.svg";
import shootimg from "../../public/trip-pic.svg";
import check from "../../public/doublecheck.svg";
import { Router, useRouter } from "next/router";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import cookie from "js-cookie";
import Footer from "@/components/Footersection/Footer";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import { toast } from "react-toastify";
import { userJoinRequest } from "@/ApiServices/apiService";
import Dropdown from "react-bootstrap/Dropdown";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Topbar from "@/components/TopbarAdmin/Topbar";
import formatDate from "../../CommonFunctions/FormatDate";

const index = (data) => {
  const [tripInfo, setTripInfo] = useState();

  const validationSchema = yup.object().shape({
    firstName: tripInfo?.document?.firstName
      ? yup.string().required("الإسم الأول مطلوب")
      : "",
    lastName: tripInfo?.document?.lastName
      ? yup.string().required("إسم العائلة مطلوب")
      : "",
    birthDate: tripInfo?.document?.birthDate
      ? yup
          .date()
          .typeError("ارجوك ادخل تاريخ صحيح")
          .max(new Date(), "يجب أن يكون تاريخ الميلاد في الماضي")
          .required("تاريخ الميلاد مطلوب")
      : "",
    age: tripInfo?.document?.age
      ? yup
          .number()
          .typeError("يجب أن يكون العمر رقمًا")
          .positive("يجب أن يكون العمر رقمًا موجبًا")
          .integer("يجب أن يكون العمر عددًا صحيحًا")
      : "",

    email: tripInfo?.document?.email
      ? yup
          .string()
          .email("يرجى إدخال البريد الإلكتروني الصحيح")
          .required("البريد الالكتروني مطلوب")
      : "",
    healthIssues: tripInfo?.document?.healthIssues
      ? yup.string().required("يرجى كتابة القضايا الصحية الخاصة بك")
      : "",
    passport: tripInfo?.document?.passport
      ? yup.string().required("مطلوب جواز السفر")
      : "",
    id: tripInfo?.document?.id ? yup.string().required("الهوية مطلوبة") : "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();
  const [show, setShow] = useState(false);
  const [personalModalShow, SetpersonalModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseModal = () => SetpersonalModalShow(false);
  const handleShowModal = () => SetpersonalModalShow(true);
  const handleCloseConfirm = () => setConfirmModalShow(false);
  const handleShowConfirm = () => setConfirmModalShow(true);
  const [isLoading, setLoading] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);

  useEffect(() => {
    const role = cookie.get("role");
    if (role === "Organizer") {
      setIsOrganizer(true);
    }
  }, []);

  const [genderGot, setGenderGot] = useState("");
  const [tripRequest, setTripRequest] = useState({
    id: "",
    passport: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    healthIssues: "",
    birthDate: "",
    age: "",
  });
  useEffect(() => {
    setTripInfo(data?.data[0]);
  }, []);
  function commonFunction(data) {
    if (data) {
      const data1 = data.toString();
      const data2 = new Date(data);
      const dataFound = data2.toString().split(" ");
      let formatDate = `${dataFound[2]} ${dataFound[1]}`;

      return formatDate;
    }
  }
  const joinFunction = () => {
    const token = cookie.get("token");
    const role = cookie.get("role");
    if (token) {
      if (role === "User") {
        handleShow();
      } else {
        toast.error("لا يوجد إذن للانضمام بخلاف المستخدم");
      }
    } else {
      router.push("/admin/login");
    }
  };
  const termsCondition = () => {
    const token = cookie.get("token");
    const role = cookie.get("role");
    if (token) {
      if (role === "User") {
        handleClose();
        handleShowModal();
      } else {
        toast.error("لا يوجد إذن للانضمام بخلاف المستخدم");
      }
    } else {
      router.push("/admin/login");
    }
  };
  const confirmFunction = () => {
    let token = cookie.get("token");
    let role = cookie.get("role");
    if (token) {
      if (role !== "User") {
        toast.error("لا يوجد إذن للانضمام بخلاف المستخدم");
      } else {
        if (tripInfo?.document?.gender === true) {
          if (tripRequest?.gender) {
            userJoinRequest(
              token,
              tripRequest,
              router,
              setLoading,
              SetpersonalModalShow,
              setConfirmModalShow,
              tripInfo?._id,
              tripInfo?.user?._id
            );
          } else {
            toast.error("حدد الجنس");
          }
        } else {
          userJoinRequest(
            token,
            tripRequest,
            router,
            setLoading,
            SetpersonalModalShow,
            setConfirmModalShow,
            tripInfo?._id,
            tripInfo?.user?._id
          );
        }
      }
    } else {
      router.push("/admin/login");
    }
  };

  return (
    <>
      <div className="container-1920">
        {isOrganizer === true ? <Topbar /> : <Header />}
        <div className="breadcrumbs-txt-container-2 px-5 mt-5">
          {isLoading === true ? (
            <div className="loader-box">
              <div className="loader"></div>
            </div>
          ) : (
            ""
          )}
          <p
            onClick={() => {
              router.push("/");
            }}
            className="cursor-pointer"
          >
            الرئيسية
          </p>
          <MdKeyboardArrowLeft />
          <p
            onClick={() => {
              router.push("/search-trip");
            }}
            className="cursor-pointer"
          >
            {" "}
            بحث عن رحلات{" "}
          </p>
          <MdKeyboardArrowLeft />
          <p className="breadcrumbs-active-2">رحلة الصيد والمغامرة </p>
        </div>
        <div className="main-content-detail mt-5">
          <aside>
            <div className="side-2-container">
              <div className="aside-2-img ">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripImages/${
                    tripInfo?.mainTripImage ? tripInfo.mainTripImage : ""
                  }`}
                />
              </div>
              <p className="side2-title">
                {tripInfo?.tripName ? tripInfo?.tripName : ""}
              </p>
              <div className="side-2-options d-flex justify-content-around">
                <p>
                  الفئة:
                  {tripInfo?.groupType
                    ? tripInfo?.groupType === "Male"
                      ? "ذكر"
                      : tripInfo?.groupType === "Female"
                      ? "أنثى"
                      : "عائلات"
                    : ""}
                </p>
                <p>
                  المدة:
                  {tripInfo?.tripDuration
                    ? tripInfo?.tripDuration === "One week"
                      ? "إسبوعي"
                      : tripInfo?.tripDuration === "Two weeks"
                      ? "إسبوعين"
                      : tripInfo?.tripDuration === "Month"
                      ? "شهر"
                      : "أكثر من شهر"
                    : ""}
                </p>
              </div>
              <p>يشمل الاتي:</p>
              <ul className="hotels-list">
                {tripInfo?.tripIncludes
                  ? tripInfo?.tripIncludes?.split(",")?.map((trips, index) => {
                      return <li key={index}>{trips} </li>;
                    })
                  : ""}
              </ul>

              <div className="side-2-btnbox">
                <p className="">
                  {tripInfo?.tripPrice ? tripInfo?.tripPrice : ""} ر.س
                </p>
                <button
                  type="button"
                  onClick={() => {
                    joinFunction();
                  }}
                >
                  انضم
                </button>
              </div>
            </div>
          </aside>

          <div className="middle-content ">
            <div className="row gy-3 ">
              {tripInfo?.destination
                ? tripInfo?.destination?.map((images) => {
                    return images?.destinationImage?.map((image, index) => {
                      return (
                        <div
                          className="col-lg-6 col-md-12 col-sm-12 "
                          key={index}
                        >
                          <div
                            className="hover-box "
                            onClick={() => {
                              router.push(`/place-page?id=${tripInfo?._id}`);
                            }}
                          >
                            <div className="middle-content-imgbox cursor-pointer">
                              <img
                                src={`${process.env.NEXT_PUBLIC_IMAGES}/public/destinationImages/${image}`}
                                alt="img"
                              />
                            </div>
                            <div className="on-hover-content cursor-pointer">
                              <p>{images?.city ? images?.city : ""}</p>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })
                : ""}
            </div>
          </div>
          <aside className="side-bar-1 p-3 mt-3">
            <div className="side-bar-title">الرحلة</div>
            <div className="img-title-sidebox">
              <div className="side-titles m-auto">
                {tripInfo?.destination
                  ? tripInfo?.destination?.map((details) => {
                      return (
                        <div
                          className="d-flex gap-3 pb-side"
                          key={details?._id}
                        >
                          <div className="hover-effect">
                            <div className="text-center ps-2">
                              <div className="verticle-img-box">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_IMAGES}/public/destinationImages/${details?.destinationImage[0]}`}
                                />
                              </div>
                            </div>

                            <div className="text-center show-hover">
                              <p className="inner-txt mb-1">
                                {details?.city ? details?.city : ""}
                              </p>
                              <p>{formatDate(details?.destinationDate)}</p>
                            </div>
                          </div>
                          <div className="side-hover">
                            <ul>
                              {details?.agenda
                                ?.split(",")
                                ?.map((include, index) => {
                                  return <li key={index}> {include} </li>;
                                })}
                            </ul>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </aside>
        </div>
      </div>
      {/* modal for Terms and Condition */}
      <Modal show={show} onHide={handleClose} className="modal-box">
        <div className="modal-title p-3 d-flex justify-content-end modal-header--sticky">
          <div className="modal-title-txt">
            <h2>الشروط والأحكام</h2>
            <h2 onClick={handleClose} className="mb-0 cross-btn">
              X
            </h2>
          </div>
        </div>
        <div className="p-3 list-text-content">
          <ol>
            <li>
              الرجال فقط: هذه الرحلة مخصصة للرجال فقط. يرجى التأكد من أنك تستوفي
              هذا الشرط قبل
            </li>

            <li>
              المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين واللوائح
              المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة بالانقراض أو
              النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين الصادرة عن
            </li>
            <li>
              المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين واللوائح
              المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة بالانقراض أو
              النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين الصادرة عن
            </li>
            <li>
              المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين واللوائح
              المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة بالانقراض أو
              النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين الصادرة عن
            </li>
            <li>
              المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين واللوائح
              المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة بالانقراض أو
              النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين الصادرة عن
            </li>
            <li>
              المشاركة. الصيد القانوني: يجب أن يتم الصيد وفقًا للقوانين واللوائح
              المحلية والدولية. لا يُسمح بصيد الحيوانات المهددة بالانقراض أو
              النادرة. يتحمل المشاركون مسؤولية الامتثال للقوانين الصادرة عن
            </li>
            <li>
              التعويضات: لن يكون المنظمون مسؤولين عن أية خسائر مادية أو جسدية
              تتعلق بالرحلة.
            </li>
            <li>
              التغييرات والإلغاءات: قد يتم تعديل مواعيد الرحلة أو إلغاؤها بناءً
              على ظروف طارئة أو عوامل غير متوقعة. سيتم إبلاغ المشاركين بأي
              تغييرات في أقرب وقت ممكن.
            </li>
            <li>
              حقوق الصور: يحتفظ المنظمون بحق استخدام صور المشاركين الملتقطة
              أثناء الرحلة لأغراض التسويق والإعلان دون الحاجة للموافقة المسبقة.
            </li>
            <li>
              الامتثال للقوانين المحلية: يجب على المشاركين الامتثال لجميع
              القوانين واللوائح المحلية أثناء تنفيذ الأنشطة الخاصة بالرحلة.
            </li>
          </ol>
          <div className="modal-btn--1 mb-5 mt-4">
            <button
              type="button"
              onClick={() => {
                termsCondition();
              }}
            >
              البحث
            </button>
          </div>
        </div>
      </Modal>
      {/* personal-info modal */}
      <Modal
        show={personalModalShow}
        onHide={handleCloseModal}
        className="modal-box"
      >
        <div className="modal-title p-3 d-flex justify-content-end mb-3 modal-header--sticky">
          <div className="modal-title-txt">
            <h2>المعلومات الشخصية</h2>
            <h2 onClick={handleCloseModal} className="mb-0 cross-btn">
              X
            </h2>
          </div>
        </div>

        <div className="p-3 list-text-content">
          <Form onSubmit={handleSubmit(confirmFunction)}>
            <Row className="mb-5">
              {tripInfo?.document?.firstName
                ? tripInfo?.document?.firstName && (
                    <Col>
                      <Form.Label>الاسم الأول</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        {...register("firstName", {
                          onChange: (e) => {
                            setTripRequest({
                              ...tripRequest,
                              [e.target.name]: e.target.value,
                            });
                          },
                        })}
                      />
                      {errors && errors?.firstName && (
                        <p className="error-msg">
                          {errors?.firstName?.message}
                        </p>
                      )}
                    </Col>
                  )
                : ""}
              {tripInfo?.document?.lastName
                ? tripInfo?.document?.lastName && (
                    <Col>
                      <Form.Label>الاسم الثاني</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        {...register("lastName", {
                          onChange: (e) => {
                            setTripRequest({
                              ...tripRequest,
                              [e.target.name]: e.target.value,
                            });
                          },
                        })}
                      />

                      {errors && errors?.lastName && (
                        <p className="error-msg">{errors?.lastName?.message}</p>
                      )}
                    </Col>
                  )
                : ""}
            </Row>
            <Row className="mb-5">
              {tripInfo?.document?.phone
                ? tripInfo?.document?.phone && (
                    <Col>
                      <Form.Label>رقم الجوال</Form.Label>
                      <Form.Control
                        type="phone"
                        name="phone"
                        {...register("phone", {
                          onChange: (e) => {
                            setTripRequest({
                              ...tripRequest,
                              [e.target.name]: e.target.value,
                            });
                          },
                        })}
                      />
                    </Col>
                  )
                : ""}
              {tripInfo?.document?.gender
                ? tripInfo?.document?.gender && (
                    <Col>
                      <Form.Label>الجنس</Form.Label>

                      <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                          {/* {tripRequest?.gender ? tripRequest?.gender : "حدد نوع الجنس"} */}
                          {genderGot ? genderGot : "حدد نوع الجنس"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={(e) => {
                              setTripRequest({
                                ...tripRequest,
                                gender: "Male",
                              });
                              setGenderGot("ذكر");
                            }}
                          >
                            ذكر
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) => {
                              setTripRequest({
                                ...tripRequest,
                                gender: "Female",
                              });
                              setGenderGot("أنثى");
                            }}
                          >
                            أنثى
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      {errors && errors?.gender && (
                        <p className="error-msg">{errors?.gender?.message}</p>
                      )}
                    </Col>
                  )
                : ""}
            </Row>
            <Row className="pb-3 ">
              {tripInfo?.document?.email
                ? tripInfo?.document?.email && (
                    <Col>
                      <Form.Label>الايميل</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        {...register("email", {
                          onChange: (e) => {
                            setTripRequest({
                              ...tripRequest,
                              [e.target.name]: e.target.value,
                            });
                          },
                        })}
                      />
                      {errors && errors?.email && (
                        <p className="error-msg">{errors?.name?.email}</p>
                      )}
                    </Col>
                  )
                : ""}
              {tripInfo?.document?.birthDate
                ? tripInfo?.document?.birthDate && (
                    <Col>
                      <Form.Label>تاريخ الميلاد</Form.Label>
                      <Form.Control
                        name="birthDate"
                        type="date"
                        {...register("birthDate", {
                          onChange: (e) => {
                            setTripRequest({
                              ...tripRequest,
                              [e.target.name]: e.target.value,
                            });
                          },
                        })}
                      />
                      {errors && errors?.birthDate && (
                        <p className="error-msg">
                          {errors?.birthDate?.message}
                        </p>
                      )}
                    </Col>
                  )
                : ""}
            </Row>

            <Row className="pb-3 ">
              {tripInfo?.document?.healthIssues
                ? tripInfo?.document?.healthIssues && (
                    <Col>
                      <Form.Label> مشاكل صحية</Form.Label>
                      <Form.Control
                        type="text"
                        name="healthIssues"
                        {...register("healthIssues", {
                          onChange: (e) => {
                            setTripRequest({
                              ...tripRequest,
                              [e.target.name]: e.target.value,
                            });
                          },
                        })}
                      />
                      {errors && errors?.healthIssues && (
                        <p className="error-msg">
                          {errors?.healthIssues?.message}
                        </p>
                      )}
                    </Col>
                  )
                : ""}
              {tripInfo?.document?.id
                ? tripInfo?.document?.id && (
                    <Col>
                      <Form.Label>بطاقة تعريف</Form.Label>
                      <Form.Control
                        type="text"
                        name="id"
                        {...register("id", {
                          onChange: (e) => {
                            setTripRequest({
                              ...tripRequest,
                              [e.target.name]: e.target.value,
                            });
                          },
                        })}
                      />
                      {errors && errors?.id && (
                        <p className="error-msg">{errors?.id?.message}</p>
                      )}
                    </Col>
                  )
                : ""}
            </Row>
            <Row className="pb-3 ">
              {tripInfo?.document?.passport
                ? tripInfo?.document?.passport && (
                    <Col>
                      <Form.Label>جواز سفر</Form.Label>
                      <Form.Control
                        type="text"
                        name="passport"
                        {...register("passport", {
                          onChange: (e) => {
                            setTripRequest({
                              ...tripRequest,
                              [e.target.name]: e.target.value,
                            });
                          },
                        })}
                      />
                      {errors && errors?.passport && (
                        <p className="error-msg">{errors?.passport?.message}</p>
                      )}
                    </Col>
                  )
                : ""}
              {tripInfo?.document?.age
                ? tripInfo?.document?.age && (
                    <Col>
                      <Form.Label>عمر</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        {...register("age", {
                          onChange: (e) => {
                            setTripRequest({
                              ...tripRequest,
                              [e.target.name]: e.target.value,
                            });
                          },
                        })}
                      />
                      {errors && errors?.age && (
                        <p className="error-msg">{errors?.age?.message}</p>
                      )}
                    </Col>
                  )
                : ""}
            </Row>
            <Row>
              <Col>
                <div className="modal-btn--1 mt-4 mb-4">
                  <button type="submit">
                    {/* {isLoading && <span className="loader1 loader-img"></span>} */}
                    الدفع
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>

      {/* <Footer /> */}
      {/* confirmModalShow */}
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
              <span>تم طلب الانضمام بنجاح، شكرًا لاستخدام Gate 8</span>
            </h2>
            <h2>سيتم التواصل من قبل منظم الرحلة لتأكيد انضمامك للرحلة</h2>
          </div>
          <div className="confirm-img-box d-flex justify-content-center">
            <Image src={check} alt="" />
          </div>
          <div className="modal-btn--1 mb-5">
            <button
              type="button"
              onClick={() => {
                router.push("/my-trip");
              }}
            >
              تفاصيل رحلتي
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    if (context.query.id) {
      let singleTrip = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-single-trip/${context.query.id}`
      );
      return {
        props: {
          data: singleTrip?.data?.data,
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
    return { props: {} };
  }
}
export default index;

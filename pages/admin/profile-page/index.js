import Header from "@/components/HeaderSection/Header";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import profileimg from "../../../public/profile-img.svg";
import blankUser from "../../../public/blankUser.png";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { MyContext } from "../../../MyContext";
import {
  getProfileFunction,
  updateProfileFunction,
} from "@/ApiServices/apiService";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import Link from "next/link";
const validateSchema = yup.object().shape({
  name: yup.string().min(3, "يجب أن يكون 3 أحرف أو أكثر").required("مطلوب اسم"),
  phone: yup
    .string()
    .label("رقم الهاتف المحمول")
    .matches(/^\d{10}$/, "يجب أن يتكون رقم الهاتف من 10 أرقام بالضبط")
    .required(" رقم الهاتف مطلوب"),
  birthDate: yup
    .date()
    .typeError("ارجوك ادخل تاريخ صحيح")
    .max(new Date(), "يجب أن يكون تاريخ الميلاد في الماضي")
    .required("تاريخ الميلاد مطلوب"),
});
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
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const { editProfile, setEditProfile } = useContext(MyContext);

  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const [OverlayAcceptModalIsOpen, OverlayAcceptSetIsOpen] =
    React.useState(false);
  const [token, setToken] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedimageClick, setSelectedImageClick] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState();

  useEffect(() => {
    const token = cookie.get("token");
    if (token) {
      getProfileFunction(
        token,
        setValue,
        setLoading,
        router,

        selectedImageData,
        setSelectedImageData,
        setSelectedImage
      );
    } else {
      router.push("/admin/login");
    }
  }, []);

  function openModalOverlayAccept() {
    OverlayAcceptSetIsOpen(true);
  }

  function closeModalOverlayAccept() {
    OverlayAcceptSetIsOpen(false);
  }
  const handleFormSubmit = (data) => {
    const token = cookie.get("token");
    if (token) {
      if (user?.password || user?.confirmPassword) {
        if (user?.password === user?.confirmPassword) {
          updateProfileFunction(
            token,
            data,
            user,
            setUser,
            setLoading,
            router,
            setValue,
            OverlayAcceptSetIsOpen,
            selectedImageData,
            setSelectedImageData,
            setSelectedImage,
            setEditProfile,
            editProfile
          );
        } else {
          toast.error("يجب أن تكون كلمة المرور وتأكيد كلمة المرور متماثلتين");
        }
      } else {
        updateProfileFunction(
          token,
          data,
          user,
          setUser,
          setLoading,
          router,
          setValue,

          OverlayAcceptSetIsOpen,
          selectedImageData,
          setSelectedImageData,
          setSelectedImage,
          setEditProfile,
          editProfile
        );
      }
    } else {
      router.push("/admin/login");
    }
  };

  useEffect(() => {
    let token = cookie.get("token");
    if (token) {
    } else {
      router.push("/admin/login");
    }
  }, []);
  const myTripFunction = () => {
    let role = cookie.get("role");

    if (role === "Organizer") {
      router.push("/admin/my-trip");
    } else {
      router.push("/my-trip");
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleLogout = () => {
    cookie.remove("token");
    cookie.remove("role");
    router.push("/admin/login");
    closeModal();
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
                    className="active-txt-profile cursor-pointer"
                    onClick={() => {
                      router.push("/admin/profile-page");
                    }}
                  >
                    الملف الشخصي
                  </p>
                  <p
                    className="inactive-txt-profile cursor-pointer"
                    onClick={() => {
                      myTripFunction();
                    }}
                  >
                    رحلاتي
                  </p>
                  <p
                    className="inactive-txt-profile cursor-pointer"
                    onClick={openModal}
                  >
                    تسجيل الخروج
                  </p>
                </div>
                <div className="profile-form-container">
                  <div className="profile-name">
                    <div className="input--profile-img">
                      <input
                        type="file"
                        onClick={(e) => {
                          e.target.value = null;
                        }}
                        onChange={(event) => {
                          setSelectedImageData(event.target.files[0]);
                          setSelectedImage(null);
                        }}
                      />

                      <div className="p-img--box">
                        {selectedImageData && (
                          <div>
                            <Image
                              alt="not fount"
                              width={100}
                              height={100}
                              src={URL?.createObjectURL(selectedImageData)}
                            />
                          </div>
                        )}{" "}
                        {selectedImage && (
                          <div className="uploaded-img">
                            <img
                              alt="not fount"
                              width={100}
                              height={100}
                              src={`${process.env.NEXT_PUBLIC_IMAGES}/public/profileImages/${selectedImage}`}
                            />
                          </div>
                        )}
                        {!selectedImageData && !selectedImage && (
                          <Image
                            src={blankUser}
                            width={100}
                            height={100}
                            alt=""
                          />
                        )}
                      </div>
                    </div>

                    <p>{getValues("name") ? getValues("name") : ""}</p>
                  </div>
                  <hr />
                  <div className="profile-form-details p-3">
                    <Form onSubmit={handleSubmit(handleFormSubmit)}>
                      <Row>
                        <Col>
                          <Form.Label>الاسم</Form.Label>
                          <Form.Control {...register("name")} />
                          {errors && errors?.name && (
                            <p className="error-msg">{errors?.name?.message}</p>
                          )}
                        </Col>
                        <Col>
                          <Form.Label>الايميل</Form.Label>
                          <Form.Control {...register("email")} readOnly />
                          {errors && errors?.email && (
                            <p className="error-msg">
                              {errors?.email?.message}
                            </p>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>رقم الجوال</Form.Label>
                          <Form.Control {...register("phone")} />
                          {errors && errors?.phone && (
                            <p className="error-msg">
                              {errors?.phone?.message}
                            </p>
                          )}
                        </Col>
                        <Col>
                          <Form.Label>تاريخ الميلاد</Form.Label>

                          <Form.Control
                            type="date"
                            {...register("birthDate")}
                          />
                          {errors && errors?.birthDate && (
                            <p className="error-msg">
                              {errors?.birthDate?.message}
                            </p>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>كلمة المرور</Form.Label>
                          <Form.Control
                            type="password"
                            value={user?.password ? user?.password : ""}
                            onChange={(e) => {
                              setUser({ ...user, password: e.target.value });
                            }}
                          />
                        </Col>
                        <Col>
                          <Form.Label>تأكيد كلمة المرور</Form.Label>
                          <Form.Control
                            type="password"
                            value={user?.confirmPassword ? user?.confirmPassword : ""}
                            onChange={(e) => {
                              setUser({
                                ...user,
                                confirmPassword: e.target.value,
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <div className="form-btn-admin">
                        <button type="submit">حفظ التغييرات</button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <Link href="">
            <p onClick={handleLogout}>تسجيل الخروج</p>
          </Link>
          {/* <button type="button " onClick={handleLogout}>تسجيل الخروج</button> */}
        </div>
      </Modal>
      <Modal
        isOpen={OverlayAcceptModalIsOpen}
        onRequestClose={closeModalOverlayAccept}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="modal-title p-3  modal-header--sticky">
          <div className="modal-title-accepted">
            <h2 className="">تحديث الملف الشخصي</h2>
            <h2 onClick={closeModalOverlayAccept} className="mb-0 cross-btn">
              X
            </h2>
          </div>
        </div>
        <div className="px-5">
          <div className="mt-5 pb-5">
            <p className="text-center">تم حفظ تغييرات ملفك الشخصي بنجاح</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default index;

import React, { useEffect, useContext } from "react";
import Image from "next/image";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../public/new-trip-logo.png";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import profileImg from "../../public/profile-img.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import { MyContext } from "../../MyContext";
import { getRoles, getProfile } from "@/ApiServices/apiService";
import blankUser from "../../public/blankUser.png";
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
const Header = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState();
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    image: "",
  });

  const { editProfile, setEditProfile } = useContext(MyContext);

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
  useEffect(() => {
    let token = cookie.get("token");
    let role = cookie.get("role");
    if (token) {
      setAuthToken(token);
      setRole(role);
      getProfile(token, setProfile, setLoading, router);
    }
  }, [editProfile]);
  useEffect(() => {
    getRoles(setRole);
  }, []);
  const createTrip = () => {
    let token = cookie.get("token");
    let role = cookie.get("role");
    if (token) {
      if (role === "Organizer") {
        router.push("/admin/my-trip");
      } else {
        router.push("/admin/create-trip");
      }
    } else {
      router.push("/admin/create-trip");
    }
  };
  return (
    <>
      <div className="container-fluid p-0">
        <div className="bg-nav">
          <div className="container-custom">
            <Navbar
              collapseOnSelect
              expand="lg"
              className="nav-box"
              sticky="top"
            >
              <Navbar.Brand href="/">
                <div className="header-logo-box">
                  <Image src={Logo} alt="" />
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav">
                <FaBars className="bar-lines" />
              </Navbar.Toggle>

              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="">
                  <Nav.Link className="nav-links-custom" href="/">
                    الرئيسية
                  </Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    onClick={() => {
                      createTrip();
                    }}
                    className="nav-links-custom"
                  >
                    إنشاء رحلات
                  </Nav.Link>
                  <Nav.Link href="/search-trip" className="nav-links-custom">
                    البحث عن رحلات
                  </Nav.Link>
                </Nav>
                {authToken ? (
                  <Nav className="me-auto">
                    <div className="profile-section">
                      <Dropdown data-bs-theme="transparent">
                        <Dropdown.Toggle
                          className="btn dropdown-toggle btn-options"
                          style={{ border: "transparent" }}
                          id="dropdownMenuLink"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div className="profile-img">
                            {profile?.image ? (
                              <img
                                src={`${process.env.NEXT_PUBLIC_IMAGES}/public/profileImages/${profile?.image}`}
                              />
                            ) : (
                              <Image src={blankUser} alt="" />
                            )}
                          </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="menu-options">
                          <Dropdown.Item>
                            <p
                              onClick={() => {
                                router.push("/admin/profile-page");
                              }}
                            >
                              الملف الشخصي
                            </p>
                          </Dropdown.Item>

                          <Dropdown.Item>
                            {role ? (
                              role === "Organizer" ? (
                                <p
                                  onClick={() => {
                                    router.push("/admin/my-trip");
                                  }}
                                >
                                  رحلاتي
                                </p>
                              ) : (
                                <p
                                  onClick={() => {
                                    router.push("/my-trip");
                                  }}
                                >
                                  رحلاتي
                                </p>
                              )
                            ) : (
                              ""
                            )}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={openModal}
                            className="menu-select-profile"
                          >
                            تسجيل الخروج
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <div className="">
                        <p className="mb-0 p-name">{profile?.name}</p>
                      </div>
                    </div>
                  </Nav>
                ) : (
                  <Nav className="me-auto">
                    <button
                      className="nav-btn-1"
                      onClick={() => {
                        router.push(
                          `/admin/signup?id=${
                            role ? role?.data[2]?._id : ""
                          }&role="User"`
                        );
                      }}
                    >
                      إنشاء حساب
                    </button>

                    <div
                      className="login-btn"
                      onClick={() => {
                        router.push("/admin/login");
                      }}
                    >
                      <p className="login-btn-txt">تسجيل الدخول</p>
                    </div>
                  </Nav>
                )}
              </Navbar.Collapse>
            </Navbar>
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
            <button type="button" onClick={handleLogout} className="sign-out-button ">
              <p >تسجيل الخروج</p>
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Header;

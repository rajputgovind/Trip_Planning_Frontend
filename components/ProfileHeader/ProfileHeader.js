import React from "react";
import { useState } from "react";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../public/new-trip-logo.png";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/router";
import profile from "../../public/profile-img.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
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

const ProfileHeader = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const router = useRouter();
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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
              <Navbar.Brand href="#home">
                <div className="header-logo-box">
                  <Image src={Logo} alt="" />
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav">
                <FaBars className="bar-lines" />
              </Navbar.Toggle>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="">
                  <Nav.Link className="" href="/">
                    الرئيسية
                  </Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    href="/admin/create-trip"
                    className="nav-links-custom"
                  >
                    إنشاء رحلات
                  </Nav.Link>
                  <Nav.Link href="/search-trip" className="nav-links-custom">
                    البحث عن رحلات
                  </Nav.Link>
                </Nav>
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
                          <Image src={profile} alt="" />
                        </div>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="menu-options">
                        <Dropdown.Item>
                          <Link href="/admin/profile-page"> الملف الشخصي</Link>
                        </Dropdown.Item>

                        <Dropdown.Item>
                          <Link href="/admin/my-trip">رحلاتي</Link>
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
                      <p className="mb-0 p-name">Ibrahim</p>
                    </div>
                  </div>
                </Nav>
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
            <Link href="/">تسجيل الخروج</Link>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProfileHeader;

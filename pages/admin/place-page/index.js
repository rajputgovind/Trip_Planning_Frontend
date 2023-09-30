import React from "react";
import Image from "next/image";
import tImage1 from "../../../public/travelpic1.svg";
import tImage2 from "../../../public/travelpic2.svg";
import tImage3 from "../../../public/travelpic3.svg";
import tImage4 from "../../../public/travelpic4.svg";
import tImage5 from "../../../public/travelpic5.svg";
import tImage6 from "../../../public/travelpic6.svg";
import tImage7 from "../../../public/travelpic7.svg";
import tImage8 from "../../../public/travelpic8.svg";
import tImage9 from "../../../public/travelpic9.svg";
import Header from "@/components/HeaderSection/Header";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Topbar from "@/components/TopbarAdmin/Topbar";
import Footer from "@/components/Footersection/Footer";

const index = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <div className="breadcrumbs-txt-container mt-5">
          <p>الرئيسية </p>
          <MdKeyboardArrowLeft />
          <p> بحث عن رحلات</p>
          <MdKeyboardArrowLeft />
          <p>رحلة الصيد والمغامرة</p>
          <MdKeyboardArrowLeft />
          <p className="breadcrumbs-active">كيب تاون</p>
        </div>
        <p>الجدول الزمني</p>

        <div className="destination-date">
          <div className="destination-inner-box">
            <div className="top-box">
              <div className="top-box-txt-1">
                <p>الوجهه</p>
              </div>
              <div className="top-box-txt-2">
                <p>التاريخ</p>
              </div>
            </div>
            <div className="middle-box">
              <div className="middle-innerbox-1">
                <ul>
                  <li className="mt-3">مدينة الملاهي</li>
                  <li>مغامرة الزيب لاين</li>
                  <li>دخول منجم ذهب</li>
                  <li>زيارة جبل الطاولة</li>
                </ul>
              </div>
              <div className="middle-innerbox-2">
                <ul>
                  <li className="mt-3">١٢ يوليو</li>
                  <li>١٣ يوليو</li>
                  <li>١٤ يوليو</li>
                  <li>١٥ يوليو</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5">معرض الصور</p>

        <div className="travelimage-container">
          <div className="">
            <div className="row gx-4 gy-4">
              <div className="col-lg-4 col-md-6">
                <div className="place-page-imgbox">
                  <Image src={tImage3} alt="" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="place-page-imgbox">
                  <Image src={tImage2} alt="" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="place-page-imgbox">
                  <Image src={tImage1} alt="" />
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="place-page-imgbox">
                  <Image src={tImage6} alt="" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="place-page-imgbox">
                  <Image src={tImage5} alt="" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="place-page-imgbox">
                  <Image src={tImage4} alt="" />
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="place-page-imgbox">
                  <Image src={tImage9} alt="" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="place-page-imgbox">
                  <Image src={tImage8} alt="" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="place-page-imgbox">
                  <Image src={tImage7} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">{/* <Footer/> */}</div>
    </>
  );
};

export default index;

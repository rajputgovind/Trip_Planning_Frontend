
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Image from "next/image";
import sideimg1 from "../../../public/side-img-1.svg";
import sideimg2 from "../../../public/side-img-2.svg";
import sideimg3 from "../../../public/side-img-3.svg";
import sideimg4 from "../../../public/side-img-4.svg";
import middleimg1 from "../../../public/middleimg1.svg";
import middleimg2 from "../../../public/middleimg2.svg";
import middleimg3 from "../../../public/middleimg3.svg";
import shootimg from "../../../public/trip-pic.svg";
import Topbar from "@/components/TopbarAdmin/Topbar";

const index = () => {
  return (
    <>
      <div className="container-fluid p-0">
        <Topbar/>
        <div className="breadcrumbs-txt-container-2 px-5 mt-5">
          <p>الرئيسية</p>
          <MdKeyboardArrowLeft />
          <p> بحث عن رحلات </p>
          <MdKeyboardArrowLeft />
          <p className="breadcrumbs-active-2">رحلة الصيد والمغامرة </p>
        </div>

        <div className="main-content-detail mt-3">
          <aside>
           
            <div className="side-2-container">
            <div className="aside-2-img">
              <Image src={shootimg} alt="" />
            </div>
              <p className="side2-title">رحلة الصيد والمغامرة</p>
              <div className="side-2-options d-flex justify-content-around">
                <p>الفئة:رجال</p>
                <p>المدة:أسبوع</p>
              </div>
              <p>يشمل الاتي:</p>
              <ul>
                <li>الاقامة في الفنادق والمحمية</li>
                <li>جميع الوجبات في المحمية</li>
                <li>الافطار في الفنادق</li>
                <li>تذاكر العاب مدينة الملاهي</li>
                <li>جميع مواصلات الرحلة</li>
                <li>مغامرة الزيب لاين</li>
                <li>دخول منجم ذهب</li>
                <li>زيارة جبل الطاولة</li>
              </ul>

              <div className="side-2-btnbox">
                <p>5950 ر.س</p>
                <button>انضم</button>
              </div>
            </div>
          </aside>

          <div className="middle-content">
            <div className="row gy-3 gx-2">
              <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="middle-content-imgbox">
                <Image src={middleimg3} alt="" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
              <div className="middle-content-imgbox">
                <Image src={middleimg2} alt="" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
              <div className="middle-content-imgbox">
                <Image src={middleimg1} alt="" />
                </div>
              </div>
            </div>
          </div>
          <aside className="side-bar-1 p-3 mt-3">
            <div className="side-bar-title">الرحلة</div>
            <div className="img-title-sidebox">
              <div className="side-titles m-auto">
                <div className="d-flex gap-3 py-5">
                  <div className="text-center ps-2">
                  <div className="verticle-img-box">
                    <Image className="vertical-line" src={sideimg1} alt="" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="inner-txt mb-1">قاردن روت</p>
                    <p>12 JULY</p>
                  </div>
                </div>

                <div className="d-flex gap-3 py-5">
                  <div className="text-center ps-2">
                  <div className="verticle-img-box">
                    <Image className="vertical-line" src={sideimg2} alt="" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="inner-txt mb-1">قاردن روت</p>
                    <p>12 JULY</p>
                  </div>
                </div>
                <div className="d-flex gap-3 py-5">
                  <div className="text-center ps-2">
                  <div className="verticle-img-box">
                    <Image className="vertical-line" src={sideimg3} alt="" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="inner-txt mb-1">قاردن روت</p>
                    <p>12 JULY</p>
                  </div>
                </div>
                <div className="d-flex gap-3 py-5">
                  <div className="text-center ps-2">
                  <div className="verticle-img-box">
                    <Image className="vertical-line" src={sideimg4} alt="" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="inner-txt mb-1">قاردن روت</p>
                    <p>12 JULY</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default index;

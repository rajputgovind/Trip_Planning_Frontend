import React, { useEffect, useState } from "react";
import Image from "next/image";
import tImage1 from "../../public/travelpic1.svg";
import tImage2 from "../../public/travelpic2.svg";
import tImage3 from "../../public/travelpic3.svg";
import tImage4 from "../../public/travelpic4.svg";
import tImage5 from "../../public/travelpic5.svg";
import tImage6 from "../../public/travelpic6.svg";
import tImage7 from "../../public/travelpic7.svg";
import tImage8 from "../../public/travelpic8.svg";
import tImage9 from "../../public/travelpic9.svg";
import Header from "@/components/HeaderSection/Header";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getSingleTrip } from "@/ApiServices/apiService";
import { useRouter } from "next/router";
import Link from "next/link";
import { Cookie } from "next/font/google";
import cookie from "js-cookie";
import Topbar from "@/components/TopbarAdmin/Topbar";
import formatDate from "../../CommonFunctions/FormatDate";
const index = () => {
  const router = useRouter();
  const { id } = router?.query;
  const [getTrip, setGetTrip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);

  useEffect(() => {
    const role = cookie.get("role");
    if (role === "Organizer") {
      setIsOrganizer(true);
    }
  }, []);

  useEffect(() => {
    getSingleTrip(id, setGetTrip, setLoading, router);
  }, [id]);

  return (
    <>
      {isOrganizer === true ? <Topbar /> : <Header />}

      <div className="container">
        {loading === true ? (
          <div className="loader-box">
            <div className="loader"></div>
          </div>
        ) : (
          ""
        )}
        <div className="breadcrumbs-txt-container mt-5">
          <p className="cursor-pointer " onClick={() => router.push("/")}>
            الرئيسية{" "}
          </p>
          <MdKeyboardArrowLeft />
          <p
            onClick={() => router.push("/search-trip")}
            className="cursor-pointer"
          >
            {" "}
            بحث عن رحلات
          </p>
          <MdKeyboardArrowLeft />
          <p
            className="cursor-pointer"
            onClick={() => router.push(`/details-page?id=${id}`)}
          >
            رحلة الصيد والمغامرة
          </p>
          <MdKeyboardArrowLeft />
          <p className="breadcrumbs-active ">كيب تاون</p>
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
            {getTrip && getTrip[0]?.destination
              ? getTrip[0]?.destination.map((destination) => (
                <div className="middle-box" key={destination?._id}>
                  <div className="middle-innerbox-1">
                    <ul>
                      <li key={destination._id} className="mt-3">
                        {destination.city ? destination?.city : ""}
                      </li>
                    </ul>
                  </div>
                  <div className="middle-innerbox-2">
                    <ul>
                      <li>
                        {destination.destinationDate
                          ? formatDate(destination.destinationDate)
                          : ""}
                      </li>
                    </ul>
                  </div>
                </div>
              ))
              : ""}
          </div>
        </div>
        <p className="mt-5">معرض الصور</p>
        <div className="travelimage-container">
          <div className="">
            <div className="row gx-4 gy-4">
              {getTrip &&
                getTrip[0]?.destination?.map((images) => {
                  return images?.destinationImage?.map((image, index) => {
                    return (
                      <div className="col-lg-4 col-md-6" key={index}>
                        <div className="place-page-imgbox">
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGES}/public/destinationImages/${image}`}
                            alt="img"
                          />
                        </div>
                      </div>
                    );
                  });
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">{/* <Footer/> */}</div>
    </>
  );
};

export default index;

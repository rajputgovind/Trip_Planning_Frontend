import React, { useEffect, useState } from "react";
import Image from "next/image";
import card1 from "../../public/cardpic1.svg";
import card2 from "../../public/cardpic2.svg";
import card3 from "../../public/cardpic3.svg";
import Hero from "@/components/Hero";
import Header from "@/components/HeaderSection/Header";
import Dropdown from "react-bootstrap/Dropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { getAllTrips } from "@/ApiServices/apiService";
import chevronrighticon from "../../public/chevron-right-icon.svg";
import chevronlefticon from "../../public/chevron-left-icon.svg";
import doublearrowleft from "../../public/double-arrow-left.svg";
import doublearrowright from "../../public/double-arrow-right.svg";
import Pagination from "react-js-pagination";

const Index = (data) => {
  const router = useRouter();
  var { tripType, groupType, duration, price, trip, type, durations, prices } =
    router.query;
  const [selectedTripType, setSelectedTripType] = useState(
    tripType ? tripType : ""
  );

  const [selectedGroupType, setSelectedGroupType] = useState(
    groupType ? groupType : ""
  );
  const [selectedDuration, setSelectedDuration] = useState(
    duration ? duration : ""
  );
  const [selectedPrice, setSelectedPrice] = useState(price ? price : "");
  const [priceGot, setPriceGot] = useState(prices ? prices : "");
  const [durationGot, setDurationGot] = useState(durations ? durations : "");
  const [groupTypeGot, setGroupType] = useState(type ? type : "");
  const [tripTypeGot, setTripType] = useState(trip ? trip : "");
  const [currentPage, setCurrentPage] = useState(1);
  const [getTrips, setGetTrips] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalDocs, setTotalDocs] = useState();
  const [limit, setLimit] = useState();

  useEffect(() => {
    getAllTrips(
      setGetTrips,
      setTotalDocs,
      setLimit,
      setLoading,
      selectedPrice,
      selectedTripType,
      selectedDuration,
      selectedGroupType,
      currentPage,
      router
    );
  }, [currentPage]);

  const handleSearchTrip = () => {
    getAllTrips(
      setGetTrips,
      setTotalDocs,
      setLimit,
      setLoading,
      selectedPrice,
      selectedTripType,
      selectedDuration,
      selectedGroupType,
      currentPage,
      router
    );
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="section-search">
        <Header />
        <div className="hero-2">
          {isLoading === true ? (
            <div className="loader-box">
              <div className="loader"></div>
            </div>
          ) : (
            ""
          )}
          <div className="hero-container">
            <p className="title">رحلات جماعية، لحظات غامرة!</p>
            <div className="price-container">
              <div className="dropdown-container">
                {data?.data?.tripType === true && (
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      defaultValue={tripType}
                    >
                      {tripTypeGot ? tripTypeGot : "نوع الرحلة "}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedTripType("Adventure");
                          setTripType(" مطاردة");
                        }}
                      >
                        مفامرة
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedTripType("Hunt");
                          setTripType(" مطاردة");
                        }}
                      >
                        مطاردة
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedTripType("Historical");
                          setTripType(" تاريخي");
                        }}
                      >
                        تاريخي
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedTripType("Nature");
                          setTripType("طبيعة");
                        }}
                      >
                        طبيعة
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}

                {data?.data?.groupType === true && (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {groupTypeGot ? groupTypeGot : " الفئة"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedGroupType("Male");
                          setGroupType("ذكر");
                        }}
                      >
                        ذكر
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedGroupType("Female");
                          setGroupType("أنثى");
                        }}
                      >
                        أنثى
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedGroupType("Families");
                          setGroupType("عائلات");
                        }}
                      >
                        عائلات
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}

                {data?.data?.duration === true && (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {durationGot ? durationGot : "المدة"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedDuration("One week");
                          setDurationGot(" اسبوع واحد");
                        }}
                      >
                        اسبوع واحد
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedDuration("Two weeks");
                          setDurationGot("إسبوعين");
                        }}
                      >
                        إسبوعين
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedDuration("Month");
                          setDurationGot("شهر");
                        }}
                      >
                        شهر
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedDuration("More than a month");
                          setDurationGot("  أكثر من شهر");
                        }}
                      >
                        أكثر من شهر
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}

                {data?.data?.price === true && (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {priceGot ? priceGot : "السعر"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedPrice("5000-10000 SAR");
                          setPriceGot(" 5000-10000 ر.س");
                        }}
                      >
                        5000-10000 ر.س{" "}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedPrice("10000-15000 SAR");
                          setPriceGot(" 10000-15000 ر.س");
                        }}
                      >
                        10000-15000 ر.س
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedPrice("15000-20000 SAR");
                          setPriceGot("15000-20000 ر.س");
                        }}
                      >
                        15000-20000 ر.س
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedPrice("20000-25000 SAR");
                          setPriceGot("20000-25000 ر.س");
                        }}
                      >
                        20000-25000 ر.س
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
              <div className="search-btn mt-5 d-flex justify-content-center">
                <button onClick={handleSearchTrip}>البحث</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card-container ">
            <div className="row">
              {getTrips?.map((trip) => {
                return (
                  <div className="col-lg-4 col-md-6" key={trip?._id}>
                    <div className="relative-card">
                      <div className="search-trip-imgbox">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripImages/${trip?.mainTripImage}`}
                          alt="img"
                        />
                      </div>
                      <div className="card-txt-container">
                        <div className="p-3-cards">
                          <p className="p-txt-cards">{trip?.tripName}</p>
                          <div className="sub-txt">
                            <p>
                              المدة:{" "}
                              {trip?.tripDuration === "One week"
                                ? "إسبوعي"
                                : trip?.tripDuration === "Two weeks"
                                  ? "إسبوعين"
                                  : trip?.tripDuration === "Month"
                                    ? "شهر"
                                    : "أكثر من شهر"}
                            </p>
                            <p>
                              الفئة:
                              {trip?.groupType === "Male"
                                ? "ذكر"
                                : trip?.groupType === "Female"
                                  ? "أنثى"
                                  : "عائلات"}
                            </p>
                          </div>
                          <div className="btn-box">
                            <p> ر.س {trip?.tripPrice}</p>
                            <Link href={`/details-page?id=${trip?._id}`}>
                              <button>التفاصيل</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {getTrips?.length === 0 && (
                <span>
                  <h2>لم يتم العثور على رحلة</h2>
                </span>
              )}
            </div>
          </div>
          {totalDocs >= 6 && (
            <div className="pagination-buttons">
              <div className="table-pagination ">
                <span className="text-gray mb-3">
                  عرض {(currentPage - 1) * limit + 1} ل {currentPage * limit}ل{" "}
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
    </>
  );
};

export async function getServerSideProps() {
  try {
    let filterTrips = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/filters/get-all-filters`
    );

    return {
      props: {
        data: filterTrips?.data?.data,
      },
    };
  } catch (err) {
    return { props: {} };
  }
}

export default Index;

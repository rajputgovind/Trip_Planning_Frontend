import { useRouter } from "next/router";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
const Hero = ({ tripFilter }) => {
  const router = useRouter();
  const [tripType, setTripType] = useState(null);
  const [groupType, setGroupType] = useState(null);
  const [duration, setDuration] = useState(null);
  const [price, setPrice] = useState(null);
  const [trip, settrip] = useState(null);
  const [type, setType] = useState(null);
  const [durations, setDurations] = useState(null);
  const [prices, setPrices] = useState(null);
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="hero-container">
            <p className="title">
              اكتشف العالم، خوض التجارب، تعرف على الثقافات! سافر
            </p>
            <p className="title mt-104">رحلات جماعية، لحظات غامرة!</p>
            <div className="price-container">
              <div className="dropdown-container">
                {tripFilter && tripFilter?.tripType === true && (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {trip ? trip : "نوع الرحلة "}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setTripType("Adventure");
                          settrip("مفامرة");
                        }}
                      >
                        مفامرة
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setTripType("Hunt");
                          settrip("مطاردة");
                        }}
                      >
                        مطاردة
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setTripType("Historical");
                          settrip("تاريخي");
                        }}
                      >
                        تاريخي
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setTripType("Nature");
                          settrip("طبيعة");
                        }}
                      >
                        طبيعة
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                {tripFilter && tripFilter?.groupType === true && (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {type ? type : "الفئة"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setGroupType("Male");
                          setType("ذكر");
                        }}
                      >
                        ذكر
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setGroupType("Female");
                          setType("أنثى");
                        }}
                      >
                        أنثى
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setGroupType("Families");
                          setType("عائلات");
                        }}
                      >
                        عائلات
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                {tripFilter && tripFilter?.duration === true && (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {durations ? durations : "المدة"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setDuration("One week");
                          setDurations(" اسبوع واحد");
                        }}
                      >
                        اسبوع واحد
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setDuration("Two weeks");
                          setDurations("إسبوعين");
                        }}
                      >
                        إسبوعين
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setDuration("Month");
                          setDurations("شهر");
                        }}
                      >
                        شهر
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setDuration("More than a month");
                          setDurations("أكثر من شهر");
                        }}
                      >
                        أكثر من شهر
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                {tripFilter && tripFilter?.price === true && (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {prices ? prices : "السعر"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setPrice("5000-10000 SAR");
                          setPrices("5000-10000 ر.س");
                        }}
                      >
                        5000-10000 ر.س
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setPrice("10000-15000 SAR");
                          setPrices("10000-15000 ر.س");
                        }}
                      >
                        10000-15000 ر.س
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setPrice("15000-20000 SAR");
                          setPrices("15000-20000 ر.س");
                        }}
                      >
                        15000-20000 ر.س
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setPrice("20000-25000 SAR");
                          setPrices("20000-25000 ر.س");
                        }}
                      >
                        20000-25000 ر.س
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>

              <div className="search-btn mt-5 d-flex justify-content-center">
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/search-trip",
                      query: {
                        tripType,
                        groupType,
                        duration,
                        price,
                        trip,
                        type,
                        durations,
                        prices,
                      },
                    });
                  }}
                >
                  البحث
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import Header from "@/components/HeaderSection/Header";
import React, { useState, useEffect, useContext } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import add from "../../../public/addimg.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { MyContext } from "../../../MyContext";
import { addDestinationForm } from "../../../ApiServices/apiService";
import cookie from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dropdown from "react-bootstrap/Dropdown";

const validationSchema = yup.object().shape({
  country: yup.string().required("الدولة مطلوبة"),
  date: yup
    .date()
    .typeError("ارجوك ادخل تاريخ صحيح")
    .min(new Date(), "يجب أن يكون التاريخ في المستقبل")
    .required("التاريخ مطلوب"),
  tripIncludes: yup.string().required("تتضمن الرحلة مطلوبة"),

  price: yup
    .number()
    .typeError("يجب أن يكون السعر إيجابيا")
    .required("السعر مطلوب")
    .positive("يجب أن يكون السعر رقمًا موجبًا"),
  email: yup
    .string()
    .email("يرجى إدخال البريد الإلكتروني الصحيح")
    .required("البريد الالكتروني مطلوب"),
  name: yup.string().required("مطلوب اسم"),
  phone: yup
    .string()
    .label("رقم الهاتف المحمول")
    .matches(/^\d{10,}$/, "يجب أن يتكون رقم الهاتف من 10 أرقام على الأقل")
    .required("رقم الهاتف مطلوب"),
  tripName: yup.string().required("اسم الرحلة مطلوب"),
  image: yup.mixed().test("fileType", "الصور مسموحة فقط", (value) => {
    if (!value) return true;
    return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
  }),
  destinations: yup.array().of(
    yup.object().shape({
      city: yup.string().required("المدينة مطلوبة"),
      date: yup
        .date()
        .typeError("ارجوك ادخل تاريخ صحيح")
        .min(new Date(), "يجب أن يكون التاريخ في المستقبل")
        .required("التاريخ مطلوب"),
      duration: yup.string().required("المدة مطلوبة"),
      faceImage: yup.mixed().test("fileType", "الصور مسموحة فقط", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(
          value[0]?.type
        );
      }),
      agenda: yup.string().required("مطلوب جدول الأعمال"),
    })
  ),
});
const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    flightInformation,
    setFlightInformation,
    addDestination,
    setDestination,
  } = useContext(MyContext);

  const router = useRouter();
  const handleAddDestination = () => {
    setDestination([
      ...addDestination,
      {
        duration: "",
        date: "",
        city: "",
        agenda: "",
        faceImage: "",
      },
    ]);
  };
  const [selectedTripType, setSelectedTripType] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedGroupType, setSelectedGroupType] = useState("");

  const handleInputChange = (e, index) => {
    if (e.target.name.split(".")[1] !== "faceImage") {
      const name = e.target.name.split(".")[1];
      const { value } = e.target;
      const list = [...addDestination];

      list[index][name] = value;
      setDestination(list);
    } else {
      const fileList = e.target.files;
      const filesArray = Array.from(fileList);
      const name = e.target.name.split(".")[1];
      const list = [...addDestination];
      list[index][name] = filesArray;
      setDestination(list);
    }
  };
  const addTrip = () => {
    if (
      flightInformation?.duration &&
      flightInformation?.groupType &&
      flightInformation?.tripType
    ) {
      router.push("/admin/user-form-page");
    } else {
      toast.error("يرجى ملء النموذج الكامل");
    }
  };
  useEffect(() => {
    let token = cookie.get("token");
    if (token) {
      let role = cookie.get("role");
      if (role === "Organizer") {
        router.push("/admin/trip-info");
      } else {
        router.push("/");
      }
    } else {
      router.push("/admin/login");
    }
  }, []);

  return (
    <>
      <Header />
      {/* <ProfileHeader /> */}
      <div className="trip-info-bg-section">
        <div className="container">
          <div className="breadcrumbs-txt-container pt-5">
            <p
              className="cursor-pointer"
              onClick={() => {
                router.push("/admin/my-trip");
              }}
            >
              إنشاء رحلات
            </p>
            <MdKeyboardArrowLeft />
            <p
              className="breadcrumbs-active cursor-pointer"
              onClick={() => {
                router.push("/admin/trip-info");
              }}
            >
              ادخال معلومات الرحلة
            </p>
          </div>
          <div className="info-checkbox">
            <div className="infocheck">
              <div className="active-infocheck"></div>
              <p>معلومات الرحلة</p>
            </div>

            <div className="infocheck">
              <div className="inactive-infocheck"></div>
              <p>معلومات المسافر</p>
            </div>
          </div>

          <div className="trip-info-form mb-5">
            <p className="">معلومات الرحلة</p>
            <Form>
              <Row>
                <Col xs={12} md={4}>
                  <Form.Label>الدولة</Form.Label>
                  <Form.Control
                    name="country"
                    placeholder="الدولة"
                    {...register("country", {
                      onChange: (e) => {
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.value,
                        });
                      },
                    })}
                  />
                  {errors && errors?.country && (
                    <span className="error-msg">
                      {errors?.country?.message}
                    </span>
                  )}
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>التاريخ</Form.Label>

                  <Form.Control
                    name="date"
                    placeholder="التاريخ"
                    type="date"
                    {...register("date", {
                      onChange: (e) => {
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.value,
                        });
                      },
                    })}
                  />
                  {errors && errors?.date && (
                    <span className="error-msg">{errors?.date?.message}</span>
                  )}
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>المدة</Form.Label>
                  <Dropdown
                    name="duration"
                    placeholder="المدة"

                  >
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {selectedDuration ? selectedDuration : "المدة"}

                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            duration: "One week",
                          });
                          setSelectedDuration("اسبوع")

                        }}
                        value="One week"
                        name="duration"
                      >
                        اسبوع
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            duration: "Two weeks",
                          });
                          setSelectedDuration("اسبوعين")

                        }}
                        value="Two weeks"
                        name="duration"
                      >
                        اسبوعين
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            duration: "Month",
                          });
                          setSelectedDuration("شهر")

                        }}
                        value="Month"
                        name="duration"
                      >
                        شهر
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            duration: "More than a month",
                          });
                          setSelectedDuration("أكثر من شهر")
                        }}
                        value="More than a month"
                        name="duration"
                      >
                        أكثر من شهر
                      </Dropdown.Item>
                    </Dropdown.Menu>
                    {errors && errors?.duration && (
                      <span className="error-msg">
                        {errors?.duration?.message}
                      </span>
                    )}
                  </Dropdown>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={4}>
                  <Form.Label>السعر الاجمالي
                  </Form.Label>
                  <Form.Control
                    name="price"
                    placeholder="السعر الاجمالي"
                    {...register("price", {
                      onChange: (e) => {
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.value,
                        });
                      },
                    })}
                  />
                  {errors && errors?.price && (
                    <span className="error-msg">{errors?.price?.message}</span>
                  )}
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>صورة رئيسية للرحلة</Form.Label>

                  <Form.Control
                    type="file"
                    name="image"
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    {...register("image", {
                      onChange: (e) => {
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.files[0],
                        });
                      },
                    })}
                  />
                  {errors && errors?.image && (
                    <span className="error-msg">{errors?.image?.message}</span>
                  )}
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>ما تشمله الرحلة</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="tripIncludes"
                    placeholder="ما تشمله الرحلة"
                    {...register("tripIncludes", {
                      onChange: (e) => {
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.value,
                        });
                      },
                    })}
                    style={{ height: "134px" }}
                  />
                  {/* <textarea rows="4"/> */}
                  {errors && errors?.tripIncludes && (
                    <span className="error-msg">
                      {errors?.tripIncludes?.message}
                    </span>
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <Form.Label>اسم رحلة</Form.Label>
                  <Form.Control
                    type="text"
                    name="tripName"
                    placeholder="اسم رحلة"
                    {...register("tripName", {
                      onChange: (e) => {
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.value,
                        });
                      },
                    })}
                  />
                  {errors && errors?.tripName && (
                    <span className="error-msg">
                      {errors?.tripName?.message}
                    </span>
                  )}
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>نوع المجموعة</Form.Label>
                  <Dropdown name="groupType">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {selectedGroupType ? selectedGroupType : "نوع المجموعة"}

                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            groupType: "Male",
                          });
                          setSelectedGroupType("ذكر")
                        }}
                        value="Male"
                        name="groupType"
                      >
                        ذكر
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            groupType: "Female",
                          });
                          setSelectedGroupType("أنثى")
                        }}
                        value="Female"
                        name="groupType"
                      >
                        أنثى
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            groupType: "Families",
                          });
                          setSelectedGroupType("عائلات")
                        }}
                        value="Families"
                        name="groupType"
                      >
                        عائلات
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>نوع الرحلة</Form.Label>
                  <Dropdown name="tripType">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {selectedTripType ? selectedTripType : "نوع الرحلة"}

                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            tripType: "Adventure",
                          });
                          setSelectedTripType("مفامرة ");
                        }}
                        value="Adventure"
                        name="tripType"
                      >
                        مفامرة
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            tripType: "Hunt",
                          });
                          setSelectedTripType("مطاردة")
                        }}
                        value="Hunt"
                        name="tripType"
                      >
                        مطاردة
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            tripType: "Historical",
                          });
                          setSelectedTripType("تاريخي")
                        }}
                        value="Historical"
                        name="tripType"
                      >
                        تاريخي
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            tripType: "Nature",
                          });
                          setSelectedTripType("طبيعة")
                        }}
                        value="Nature"
                        name="tripType"
                      >
                        طبيعة
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="trip-info-form mb-5">
            <p>معلومات التواصل</p>
            <Form>
              <Row>
                <Col xs={12} md={4}>
                  <Form.Label>الاسم</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="الاسم"
                    {...register("name", {
                      onChange: (e) => {
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.value,
                        });
                      },
                    })}
                  />
                  {errors && errors?.name && (
                    <span className="error-msg">{errors?.name?.message}</span>
                  )}
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>الرقم</Form.Label>

                  <Form.Control
                    name="phone"
                    placeholder="الرقم"
                    {...register("phone", {
                      onChange: (e) => {
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.value,
                        });
                      },
                    })}
                  />
                  {errors && errors?.phone && (
                    <span className="error-msg">{errors?.phone?.message}</span>
                  )}
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>الايميل</Form.Label>
                  <Form.Control
                    name="email"
                    placeholder="الايميل"
                    {...register("email", {
                      onChange: (e) => {
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.value,
                        });
                      },
                    })}
                  />
                  {errors && errors?.email && (
                    <span className="error-msg">{errors?.email?.message}</span>
                  )}
                </Col>
              </Row>
            </Form>
          </div>

          <div className="trip-info-form">
            <p>الوجهه الاولى</p>
            {addDestination?.map((x, i) => {
              const destinationErrors = errors.destinations?.[i] || {};
              return (
                <Form key={i}>
                  <Row>
                  <Col xs={12} md={4}>
                      <Form.Label>المدينة</Form.Label>
                      <Form.Control
                        name={`destinations[${i}].city`}
                        placeholder="المدينة"
                        {...register(`destinations[${i}].city`, {
                          onChange: (e) => {
                            handleInputChange(e, i);
                          },
                        })}
                      />
                      {destinationErrors.city && (
                        <span className="error-msg">
                          {destinationErrors.city.message}
                        </span>
                      )}
                    </Col>
                    
                    <Col xs={12} md={4}>
                      <Form.Label>التاريخ</Form.Label>

                      <Form.Control
                        name={`destinations[${i}].date`}
                        type="date"
                        placeholder="التاريخ"
                        {...register(`destinations[${i}].date`, {
                          onChange: (e) => {
                            handleInputChange(e, i);
                          },
                        })}
                      />
                      {destinationErrors.date && (
                        <span className="error-msg">
                          {destinationErrors.date.message}
                        </span>
                      )}
                    </Col>
                   
                    <Col xs={12} md={4}>
                      <Form.Label>المدة</Form.Label>
                      <Form.Control
                        name={`destinations[${i}].duration`}
                        type="text"
                        placeholder="المدة"
                        {...register(`destinations[${i}].duration`, {
                          onChange: (e) => {
                            handleInputChange(e, i);
                          },
                        })}
                      />
                      {destinationErrors.duration && (
                        <span className="error-msg">
                          {destinationErrors.duration.message}
                        </span>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Label>صورة للوجهه</Form.Label>
                      <Form.Control
                        name={`destinations[${i}]?.faceImage`}
                        type="file"
                        {...register(`destinations[${i}].faceImage`, {
                          onChange: (e) => {
                            handleInputChange(e, i);
                          },
                        })}
                        onClick={(e) => {
                          e.target.value = null;
                        }}
                        accept="image/png, image/jpg, image/jpeg,.pdf"
                        multiple
                      />
                      {destinationErrors?.faceImage && (
                        <span className="error-msg">
                          {destinationErrors?.faceImage?.message}
                        </span>
                      )}
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Label>الاجندة</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="الاجندة"
                        name={`destinations[${i}].agenda`}
                        style={{ height: "134px" }}
                        {...register(`destinations[${i}].agenda`, {
                          onChange: (e) => {
                            handleInputChange(e, i);
                          },
                        })}
                      />
                      {destinationErrors?.agenda && (
                        <span className="error-msg">
                          {destinationErrors?.agenda?.message}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form>
              );
            })}
          </div>

          <div className="add-destination">
            <div className="add-destination-img">
              <Image
                src={add}
                alt=""
                onClick={() => {
                  handleAddDestination();
                }}
              />
              <p>اضافة وجهه جديدة</p>
            </div>
          </div>
          <div className="destination--btn pb-5">
            <button
              type="button"
              className="cursor-pointer"
              onClick={handleSubmit(addTrip)}
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

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
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import cookie from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dropdown from "react-bootstrap/Dropdown";
import { calculateSizeAdjustValues } from "next/dist/server/font-utils";
import axios from "axios";

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
    if (!value) return true; // Allow empty input
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
      faceImage: yup
        .mixed()
        .test("fileType", "الصور مسموحة فقط", (value) => {
          if (!value) return true;
          return ["image/jpeg", "image/png", "image/jpg"].includes(
            value[0]?.type
          );
        }),
      agenda: yup.string().required("مطلوب جدول الأعمال"),
    })
  ),
});

const index = (data) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },

  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {
    flightInformation,
    setFlightInformation,
    editDestination, setEditDestination
  } = useContext(MyContext);
  const router = useRouter();
  const [imageChange, setImageChange] = useState(false)
  const handleAddDestination = () => {

    setEditDestination([
      ...editDestination,
      {
        duration: "",
        date: "",
        city: "",
        agenda: "",
        faceImage: "",
      },
    ]);

  };

  const handleInputChange = (e, index) => {
    if (e.target.name !== "faceImage") {
      const { name, value } = e.target;
      const list = [...editDestination];

      list[index][name] = value;
      setDestination(list);
    } else {
      const fileList = e.target.files;

      const filesArray = Array.from(fileList);
      const { name } = e.target;

      const list = [...editDestination];
      list[index][name] = filesArray;
      setDestination(list);
    }
  };

  const addTrip = () => {
    router.push("/admin/user-form-page");
  };
  useEffect(() => {
    let token = cookie.get("token");
    if (token) {
      let role = cookie.get("role");
      if (role === "Organizer") {
      } else {
        router.push("/admin/login");
      }
    } else {
      router.push("/admin/login");
    }
  }, []);
  const settingAllInfo = () => {
    const formattedDate = new Date(data?.data?.data[0]?.tripDate)
      .toISOString()
      .split("T")[0];

    setFlightInformation({
      country: data?.data?.data[0]?.country,
      date: formattedDate,
      duration: data?.data?.data[0]?.tripDuration,
      tripIncludes: data?.data?.data[0]?.tripIncludes,
      price: data?.data?.data[0]?.tripPrice,
      email: data?.data?.data[0]?.user?.email,
      name: data?.data?.data[0]?.user?.name,
      phone: data?.data?.data[0]?.user?.phone,
      tripName: data?.data?.data[0]?.tripName,
      groupType: data?.data?.data[0]?.groupType,
      tripType: data?.data?.data[0]?.tripType,
      image: data?.data?.data[0]?.mainTripImage,
    });

    setValue("country", data?.data?.data[0]?.country);
    setValue("date", data?.data?.data[0]?.date);
    setValue("tripIncludes", data?.data?.data[0]?.tripIncludes);
    setValue("price", data?.data?.data[0]?.tripPrice);
    setValue("email", data?.data?.data[0]?.user?.email);
    setValue("name", data?.data?.data[0]?.user?.name);
    setValue("phone", data?.data?.data[0]?.user?.phone);
    setValue("tripName", data?.data?.data[0]?.tripName);



    for (let i = 0; i < data?.data?.data[0]?.destination?.length; i++) {


      const newObject = {
        duration: data?.data?.data[0]?.destination[i]?.duration,
        date: data?.data?.data[0]?.destination[i]?.destinationDate,
        city: data?.data?.data[0]?.destination[i]?.city,
        agenda: data?.data?.data[0]?.destination[i]?.agenda,
        image: data?.data?.data[0]?.destination[i]?.faceImage?.length,
        faceImage: [],
      }
      setEditDestination([...editDestination, newObject])


    }
  };
  useEffect(() => {
    settingAllInfo();
  }, []);

  return (
    <>
      <Header />
      {/* <ProfileHeader /> */}
      <div className="trip-info-bg-section">
        <div className="container">
          <div className="breadcrumbs-txt-container pt-5">
            <p>إنشاء رحلات</p>
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
                    type="date"
                    value={flightInformation?.date}
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
                  >
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {flightInformation?.duration
                        ? flightInformation?.duration
                        : "المدة"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            duration: "One week",
                          });

                        }}
                        value="One week"
                        name="duration"
                      >
                        One week
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            duration: "Two weeks",
                          });
                        }}
                        value="Two weeks"
                        name="duration"
                      >
                        Two weeks
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            duration: "Month",
                          });

                        }}
                        value="Month"
                        name="duration"
                      >
                        Month
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            duration: "More than a month",
                          });

                        }}
                        value="More than a month"
                        name="duration"
                      >
                        More than a month
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
                  <Form.Label>السعر الاجمالي</Form.Label>
                  <Form.Control
                    name="price"
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
                        setImageChange(true)
                        setFlightInformation({
                          ...flightInformation,
                          [e.target.name]: e.target.files[0],
                        });
                      },
                    })}
                  />
                  {imageChange === false ?
                    <span>{flightInformation?.image}</span> : ""}
                  {errors && errors?.image && (
                    <span className="error-msg">{errors?.image?.message}</span>
                  )}
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>ما تشمله الرحلة</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="tripIncludes"
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
                  <Form.Label>المدة</Form.Label>
                  <Dropdown name="groupType">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {flightInformation?.groupType
                        ? flightInformation?.groupType
                        : "نوع المجموعة"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            groupType: "Male",
                          });

                        }}
                        value="Male"
                        name="groupType"
                      >
                        Male
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            groupType: "Female",
                          });

                        }}
                        value="Female"
                        name="groupType"
                      >
                        Female
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            groupType: "Families",
                          });

                        }}
                        value="Families"
                        name="groupType"
                      >
                        Families
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>المدة</Form.Label>
                  <Dropdown name="tripType">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {flightInformation?.tripType
                        ? flightInformation?.tripType
                        : "نوع الرحلة"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            tripType: "Adventure",
                          });

                        }}
                        value="Adventure"
                        name="tripType"
                      >
                        Adventure
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            tripType: "Hunt",
                          });

                        }}
                        value="Hunt"
                        name="tripType"
                      >
                        Hunt
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="text"
                        onClick={(e) => {
                          setFlightInformation({
                            ...flightInformation,
                            tripType: "Nature",
                          });

                        }}
                        value="Nature"
                        name="tripType"
                      >
                        Nature
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
            {editDestination?.map((x, i) => {
              return (
                <Form key={i}>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Label>المدينة</Form.Label>
                      <Form.Control
                        name="duration"
                        value={x?.duration}
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Label>التاريخ</Form.Label>

                      <Form.Control
                        name="date"
                        type="date"
                        value={x.date}
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Label>المدة</Form.Label>
                      <Form.Control
                        name="city"
                        value={x.city}
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Label>صورة للوجهه</Form.Label>
                      <Form.Control
                        name="faceImage"
                        type="file"
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                        onClick={(e) => {
                          e.target.value = null;
                        }}
                        accept="image/png, image/jpg, image/jpeg,.pdf"
                        multiple
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Label>الاجندة</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="agenda"
                        value={x.agenda}
                        style={{ height: "134px" }}
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                      />
                      {/* <textarea rows="4"/> */}
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
export async function getServerSideProps(context) {


  const id = context.params.editInfo;
  try {
    if (id) {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-single-trip/${id}`
      );
      return {
        props: {
          data: data?.data,
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
    return {
      props: {},
    };
  }
}
export default index;

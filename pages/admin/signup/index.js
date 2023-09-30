import Header from "@/components/HeaderSection/Header";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { getRoles, registerFunction } from "../../../ApiServices/apiService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import cookie from "js-cookie";

const validateSchema = yup.object().shape({
  name: yup.string().min(3, "يجب أن يكون 3 أحرف أو أكثر").required("مطلوب اسم"),
  email: yup
    .string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الالكتروني مطلوب"),
  phone: yup
    .string()
    .label("رقم الهاتف المحمول")
    .matches(/^\d{10}$/, "يجب أن يتكون رقم الهاتف من 10 أرقام بالضبط")
    .required("رقم الهاتف مطلوب"),
  password: yup
    .string()
    .min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),

  birthDate: yup
    .date()
    .typeError("ارجوك ادخل تاريخ صحيح")
    .max(new Date(), "يجب أن يكون تاريخ الميلاد في الماضي")
    .required("تاريخ الميلاد مطلوب"),
});
const index = (data) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    role: data?.data ? data?.data : "",
    confirmPassword: "",
  });
  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleRegister = (data) => {
    if (user?.password === user?.confirmPassword) {
      registerFunction(data, user?.role, router, setLoading);
    } else {
      toast.error("يجب أن تكون كلمة المرور وتأكيد كلمة المرور متطابقتين");
    }
  };
  useEffect(() => {
    let token = cookie.get("token");
    if (token) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <Header />
      <div className="admin-signup-bg">
      {loading === true ? (
            <div className="loader-box">
              <div className="loader"></div>
            </div>
          ) : (
            ""
          )}
        <div className="container-fluid">
          <div className="signup-form">
            <p className="signup-title">انشاء حساب</p>
            <div className="signup-form-container">
              <Form onSubmit={handleSubmit(handleRegister)}>
                <Row>
                  <Col>
                    <Form.Label>الاسم</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="الاسم"
                      name="name"
                      value={user?.name ? user?.name : ""}
                      {...register("name", {
                        onChange: (e) => {
                          handleInputs(e);
                        },
                      })}
                    />
                    {errors && errors?.name && (
                      <p className="error-msg">{errors?.name?.message}</p>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>الايميل</Form.Label>
                    <Form.Control
                      {...register("email", {
                        onChange: (e) => {
                          handleInputs(e);
                        },
                      })}
                      type="email"
                      placeholder="الايميل"
                      name="email"
                      value={user?.email ? user?.email : ""}
                    />
                    {errors && errors?.email && (
                      <p className="error-msg">{errors?.email?.message}</p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>رقم الجوال</Form.Label>
                    <Form.Control
                      {...register("phone", {
                        onChange: (e) => {
                          handleInputs(e);
                        },
                      })}
                      type="phone"
                      placeholder="رقم الجوال"
                      name="phone"
                      value={user?.phone ? user?.phone : ""}
                    />
                    {errors && errors?.phone && (
                      <p className="error-msg">{errors?.phone?.message}</p>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>تاريخ الميلاد</Form.Label>
                    <Form.Control
                      {...register("birthDate", {
                        onChange: (e) => {
                          handleInputs(e);
                        },
                      })}
                      type="date"
                      placeholder="تاريخ الميلاد"
                      name="birthDate"
                      value={user?.birthDate ? user?.birthDate : ""}
                    />
                    {errors && errors?.birthDate && (
                      <p className="error-msg">{errors?.birthDate?.message}</p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>كلمة المرور</Form.Label>
                    <Form.Control
                      {...register("password", {
                        onChange: (e) => {
                          handleInputs(e);
                        },
                      })}
                      type="password"
                      placeholder="كلمة المرور"
                      name="password"
                      value={user?.password ? user?.password : ""}
                    />
                    {errors && errors?.password && (
                      <p className="error-msg">{errors?.password?.message}</p>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>تأكيد كلمة المرور</Form.Label>
                    <Form.Control
                      {...register("confirmPassword", {
                        onChange: (e) => {
                          handleInputs(e);
                        },
                      })}
                      type="password"
                      placeholder="تأكيد كلمة المرور"
                      name="confirmPassword"
                      onChange={(e) => {
                        handleInputs(e);
                      }}
                    />
                  </Col>
                </Row>

                <div className="form-btn-admin">
                  <button type="submit" className="flex items-center gap-2">
                    انشاء حساب
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  const id = context.query.id;

  try {
    if (id) {
      return {
        props: {
          data: id,
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

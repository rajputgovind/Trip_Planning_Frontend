import React, { useEffect, useState } from "react";
import Header from "@/components/HeaderSection/Header";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginFunction } from "../../../ApiServices/apiService";
import cookie from "js-cookie";
const validation = yup.object({
  email: yup
    .string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الالكتروني مطلوب"),
  password: yup
    .string()
    .min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
});

const index = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //login Function calling
  const loginFunctionCalling = () => {
    loginFunction(user, router, setLoading);
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
      {isLoading === true ? (
            <div className="loader-box">
              <div className="loader"></div>
            </div>
          ) : (
            ""
          )}
        <div className="container">
          <div className="login-from-container">
            <p className="login-from-title-admin mb-5">تسجيل الدخول</p>
            <div className="login-form--subcontainer">
              <Form onSubmit={handleSubmit(loginFunctionCalling)}>
                <Form.Group className="mb-3">
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
                    value={user.email}
                  />
                  {errors?.email && (
                    <p className="error-msg">{errors?.email?.message}</p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
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
                    value={user.password}
                  />
                  {errors?.password && (
                    <p className="error-msg">{errors?.password?.message}</p>
                  )}
                </Form.Group>
                <div className="login-form-btnbox mt-100">
                  <button type="submit">
                    تسجيل الدخول
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

export default index;

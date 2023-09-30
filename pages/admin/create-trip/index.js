import Header from "@/components/HeaderSection/Header";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { getRoles } from "@/ApiServices/apiService";
const index = () => {
  const [role, setRole] = useState("")
  const router = useRouter();
  const signUpFunction = () => {
    router.push(`/admin/signup?id=${role ? role?.data[1]?._id : ""}&role="Organizer"`)

  };
  const signInfunction = () => {
    router.push("/admin/login");
  };
  useEffect(() => {
    getRoles(setRole);
  }, [])
  return (
    <>
      <Header />
      {/* <ProfileHeader/> */}
      <div className="createtrip-section">
        <div className="container-fluid">
          <div className="admin-txt-content">
            <p className="admin-title-txt">نظّم الرحلات واستمتع بالرِّفقة!</p>
            <div className="mt-5 admin-account-box">
              <p>إنشئ حسابك كمنظم رحلات</p>
              <div className="admin-ac-btnbox">
                <button
                  className="btn-active"
                  onClick={() => {
                    signUpFunction();
                  }}
                >
                  إنشاء حساب
                </button>
                <button
                  className="btn-inactive"
                  onClick={() => {
                    signInfunction();
                  }}
                >
                  تسجيل الدخول
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

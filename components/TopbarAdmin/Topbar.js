import React from "react";
import Navbar from "react-bootstrap/Navbar";
import arrow from "../../public/navarrow.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const Topbar = () => {
  const router = useRouter();
  const routeFunction = () => {
    if (router.pathname === "/details-page") {
      router.push("/search-trip");
    } else {
      router.push(`/details-page?id=${router?.query?.id}`);
    }
  };
  return (
    <>
      <div className="container-fluid p-0">
        <div className="bg-nav">
          <Navbar expand="lg" className="">
            <Navbar.Brand >
              <div
                className="nav2-txt cursor-pointer"
                onClick={() => {
                  routeFunction();
                }}
              >
                <Image src={arrow} alt="" /> العودة{" "}
              </div>
            </Navbar.Brand>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default Topbar;

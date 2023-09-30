import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { MyContext } from "../MyContext";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
export default function App({ Component, pageProps }) {
  const [addDestination, setDestination] = useState([
    {
      duration: "",
      date: "",
      city: "",
      agenda: "",
      faceImage: [],
    },
  ]);
  const [editProfile, setEditProfile] = useState(false);
  const [editDestination, setEditDestination] = useState([]);
  const [flightInformation, setFlightInformation] = useState({
    country: "",
    date: "",
    duration: "",
    tripIncludes: "",
    price: "",
    email: "",
    name: "",
    phone: "",
    tripName: "",
    groupType: "",
    tripType: "",
    image: "",
  });

  return (
    <>

      <ToastContainer />
      <MyContext.Provider
        value={{
          flightInformation,
          setFlightInformation,
          addDestination,
          setDestination,
          editDestination,
          setEditDestination,
          editProfile,
          setEditProfile,

        }}
      >
        <Component
          {...pageProps}
          flightInformation={flightInformation}
          setFlightInformation={setFlightInformation}
          addDestination={addDestination}
          setDestination={setDestination}
          editDestination={editDestination}
          setEditDestination={setEditDestination}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
        />
      </MyContext.Provider>
    </>
  );
}

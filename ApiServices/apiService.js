import axios from "axios";
import { toast } from "react-toastify";
import cookies from "js-cookie";
import React from "react";
export const getRoles = async (setRole) => {
  try {
    let loginInfo = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/roles/get-role`
    );

    setRole(loginInfo?.data);
  } catch (err) {
    console.log("err", err);
  }
};

export const registerFunction = async (data, user, router, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        age: data.age,
        birthDate: data.birthDate,
        role: user,
      }
    );

    toast.success(response?.data?.message || "تم التسجيل بنجاح");
    router.push("/admin/login");
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const loginFunction = async (user, router, setLoading) => {
  try {
    setLoading(true);
    const loginResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
      {
        email: user.email,
        password: user.password,
      }
    );
    toast.success(loginResponse?.data?.message || "تم تسجيل الدخول بنجاح");
    router.push("/");
    cookies.set("token", loginResponse.data.token);
    cookies.set("role", loginResponse.data.data.role.roleName);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const getProfileFunction = async (
  token,
  setValue,
  setLoading,
  router,

  selectedImageData,
  setSelectedImageData,
  setSelectedImage
) => {
  try {
    setLoading(true);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/get-single-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { name, email, phone, birthDate, profileImage } =
      response?.data?.data;
    const formattedBirthDate = new Date(birthDate).toISOString().split("T")[0];

    setValue("name", name);
    setValue("email", email);
    setValue("phone", phone);
    setValue("birthDate", formattedBirthDate);
    setSelectedImage(profileImage);
    setSelectedImageData(null);
    setLoading(false);
    //  document.getElementById("profiledata").innerHTML=name;
  } catch (err) {
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message[0]);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const getProfile = async (token, setProfile, setLoading, router) => {
  try {
    setLoading(true);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/get-single-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { name, profileImage } = response?.data?.data;
    setLoading(false);
    setProfile({
      image: profileImage,
      name: name,
    });
  } catch (err) {
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const updateProfileFunction = async (
  token,
  value,
  user,
  setUser,
  setLoading,
  router,
  setValue,
  OverlayAcceptSetIsOpen,
  selectedImageData,
  setSelectedImageData,
  setSelectedImage,
  setEditProfile,
  editProfile
) => {
  
  try {
    setLoading(true);
    const obj = {};
    const formData = new FormData();
    if (user?.password) {
      formData.append("password", user?.password);
    }

    if (value?.phone) {
      formData.append("phone", value?.phone);
    }
    if (value?.name) {
      formData.append("name", value?.name);
    }
    if (value?.birthDate) {
      formData.append("birthDate", value?.birthDate);
    }
    if (selectedImageData) {
      formData.append("profileImage", selectedImageData);
    }
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(response?.data);

    getProfileFunction(
      token,
      setValue,
      setLoading,
      router,
      selectedImageData,
      setSelectedImageData,
      setSelectedImage
    );
    setEditProfile(!editProfile);
    OverlayAcceptSetIsOpen(true);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const getAllTrips = async (
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
) => {
  try {
    let min = "",
      max = "";
    if (
      !selectedPrice &&
      !selectedTripType &&
      !selectedDuration &&
      !selectedGroupType
    ) {
      setLoading(true);
    }
    if (selectedPrice) {
      min = selectedPrice?.split("-")[0];

      let data = selectedPrice?.split("-")[1];

      max = data?.split(" ")[0];
    }
    let allTrips = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-all-trips?page=${currentPage}&limit=6&maxPrice=${max}&minPrice=${min}&duration=${selectedDuration}&tripType=${selectedTripType}&groupType=${selectedGroupType}`
    );
    setGetTrips(allTrips?.data?.data?.docs);
    setTotalDocs(allTrips?.data?.data?.totalDocs);
    setLimit(allTrips?.data?.data?.limit);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log("error", error);
  }
};

export const getSingleTrip = async (id, setGetTrip, setLoading, router) => {
  try {
    setLoading(true);

    if (id) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-single-trip/${id}`
      );
      setGetTrip(data?.data);
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);

    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const addDestinationForm = async (
  token,
  addDestination,
  router,
  organizerInfo,
  documentInfo,
  setConfirmModalShow,
  confirmModalShow,
  setLoading
) => {
  let stateManage = false;
  const destinationDataDate = [];
  let i = 0;
  for (i = 0; i < addDestination?.length; i++) {
    try {
      const formData = new FormData();
      const dateObj = new Date(addDestination[i]?.date);
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);

      const day = ("0" + dateObj.getDate()).slice(-2);

      const year = dateObj.getFullYear();
      const shortDate = `${month}-${day}-${year}`;
      formData.append("city", addDestination[i]?.city);
      formData.append("duration", addDestination[i]?.duration);
      formData.append("agenda", addDestination[i]?.agenda);
      formData.append("destinationDate", shortDate);
      for (let j = 0; j < addDestination[i]?.faceImage?.length; j++) {
        formData.append("destinationImage", addDestination[i]?.faceImage[j]);
      }
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/destinations/add-destination`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const id = response.data.data._id;
      destinationDataDate?.push(id);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
      stateManage = true;
      if (err?.response?.data?.message === "unAuthorized") {
        cookies.remove("token");
        cookies.remove("role");
        router.push("/admin/login");
      } else if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
        toast.error("خطأ أثناء إنشاء الوجهةيرجى إضافة المزيد من الوقت ");
        router.push("/admin/trip-info");
      } else {
        toast.error("هناك خطأ ما!");
        router.push("/admin/trip-info");
      }
    }
  }

  if (i === addDestination?.length && stateManage === false) {
    createDocuments(
      token,
      documentInfo,
      organizerInfo,
      destinationDataDate,
      router,
      setConfirmModalShow,
      confirmModalShow,
      setLoading
    );
  }
};

export const createTrip = async (
  token,
  documentsInfo,
  organizerInfo,
  destinationInfo,
  router,
  setConfirmModalShow,
  confirmModalShow,
  setLoading
) => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("country", organizerInfo?.country);
    formData.append("document", documentsInfo);
    formData.append("tripDate", organizerInfo?.date);
    formData.append("tripDuration", organizerInfo?.duration);
    formData.append("tripIncludes", organizerInfo?.tripIncludes);
    formData.append("tripPrice", organizerInfo?.price);
    formData.append("contactName", organizerInfo?.name);
    formData.append("contactPhone", organizerInfo?.phone);
    formData.append("contactEmail", organizerInfo?.email);
    formData.append("mainTripImage", organizerInfo?.image);
    formData.append("tripName", organizerInfo?.tripName);
    formData.append("groupType", String(organizerInfo?.groupType));
    formData.append("tripType", organizerInfo?.tripType);
    for (let i = 0; i < destinationInfo?.length; i++) {
      formData.append(`destination[${i}]`, destinationInfo[i]);
    }
    const tripAdded = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/create-trip`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
    toast.success(tripAdded?.data?.message);
    setConfirmModalShow(true);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);

      router.push("/admin/trip-info");
    } else {
      toast.error("هناك خطأ ما!");
      router.push("/admin/trip-info");
    }
  }
};

export const createDocuments = async (
  token,
  documentInfo,
  organizerInfo,
  destinationDataDate,
  router,
  setConfirmModalShow,
  confirmModalShow,
  setLoading
) => {
  try {
    setLoading(true);
    const documentsInfo = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/documents/create-document`,
      documentInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createTrip(
      token,
      documentsInfo?.data?.data?._id,
      organizerInfo,
      destinationDataDate,
      router,
      setConfirmModalShow,
      confirmModalShow,
      setLoading
    );
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
      router.push("/admin/trip-info");
    } else {
      toast.error("هناك خطأ ما!");
      router.push("/admin/trip-info");
    }
  }
};

export const getTripInfo = async (
  setTripInfo,
  token,
  setLoading,
  router,
  setLimit,
  setTotalDocs,
  currentPage
) => {
  try {
    setLoading(true);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/organizers/get-organizer-trip?page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTripInfo(response?.data?.data?.docs);
    setTotalDocs(response?.data?.data?.totalDocs);
    setLimit(response?.data?.data?.limit);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const deleteTripData = async (
  id,
  setLoading,
  router,
  token,
  setTripInfo
) => {
  try {
    setLoading(true);
    const deletetrip = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/delete-trip/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(deletetrip?.data?.message);
    getTripInfo(setTripInfo, token, setLoading, router);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const updateDestination = async (
  token,
  addDestination,
  router,
  organizerInfo,
  tripId,
  documentInfo,
  setConfirmModalShow,
  confirmModalShow,
  setLoading
) => {
  let stateManage = false;
  const destinationDataDate = [];
  let i = 0;
  for (i = 0; i < addDestination?.length; i++) {
    try {
      const formData = new FormData();
      const dateObj = new Date(addDestination[i]?.date);
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);

      const day = ("0" + dateObj.getDate()).slice(-2);

      const year = dateObj.getFullYear();
      const shortDate = `${month}-${day}-${year}`;
      formData.append("city", addDestination[i]?.city);
      formData.append("duration", addDestination[i]?.duration);
      formData.append("agenda", addDestination[i]?.agenda);
      formData.append("destinationDate", shortDate);
      setLoading(true);
      for (let j = 0; j < addDestination[i]?.faceImage?.length; j++) {
        formData.append("destinationImage", addDestination[i]?.faceImage[j]);
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/destinations/update-destination/${tripId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const id = response.data.data._id;
      destinationDataDate?.push(id);
    } catch (err) {
      stateManage = true;
      setLoading(false);
      if (err?.response?.data?.message === "unAuthorized") {
        cookies.remove("token");
        cookies.remove("role");
        router.push("/admin/login");
      } else if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
        router.push(`/admin/edit-info/${tripId}`);
      } else {
        toast.error("هناك خطأ ما!");
        router.push("/admin/trip-info");
      }
    }
  }

  if (i === addDestination?.length && stateManage === false) {
    updateDocuments(
      token,
      documentInfo,
      organizerInfo,
      destinationDataDate,
      router,
      setConfirmModalShow,
      confirmModalShow,
      setLoading
    );
  }
};

export const updateTrip = async (
  token,
  documentsInfo,
  organizerInfo,
  destinationInfo,
  router,
  setConfirmModalShow,
  confirmModalShow
) => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("country", organizerInfo?.country);
    formData.append("document", documentsInfo);
    formData.append("tripDate", organizerInfo?.date);
    formData.append("tripDuration", organizerInfo?.duration);
    formData.append("tripIncludes", organizerInfo?.tripIncludes);
    formData.append("tripPrice", organizerInfo?.price);
    formData.append("contactName", organizerInfo?.name);
    formData.append("contactPhone", organizerInfo?.phone);
    formData.append("contactEmail", organizerInfo?.email);
    formData.append("mainTripImage", organizerInfo?.image);
    formData.append("tripName", organizerInfo?.tripName);
    formData.append("groupType", String(organizerInfo?.groupType));
    formData.append("tripType", organizerInfo?.tripType);
    for (let i = 0; i < destinationInfo?.length; i++) {
      formData.append(`destination[${i}]`, destinationInfo[i]);
    }
    const tripAdded = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/update-trip/${tripId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
    toast.success(tripAdded?.data?.message);
    setConfirmModalShow(true);
  } catch (err) {
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
      router.push("/admin/trip-info");
    } else {
      toast.error("هناك خطأ ما!");
      router.push("/admin/trip-info");
    }
  }
};

export const updateDocuments = async (
  token,
  documentInfo,
  organizerInfo,
  destinationDataDate,
  router,
  setConfirmModalShow,
  confirmModalShow,
  setLoading
) => {
  try {
    setLoading(true);
    const documentsInfo = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/documents/update-document/${tripId}`,
      documentInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    updateTrip(
      token,
      documentsInfo?.data?.data?._id,
      organizerInfo,
      destinationDataDate,
      router,
      setConfirmModalShow,
      confirmModalShow
    );
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
      router.push("/admin/trip-info");
    } else {
      toast.error("هناك خطأ ما!");
      router.push("/admin/trip-info");
    }
  }
};

export const getJoiningRequest = async (
  setTripDetails,
  setLoading,
  token,
  id
) => {
  try {
    setLoading(true);
    const singleTrip = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-single-trip/${id}`
    );
    setTripDetails(singleTrip?.data?.data[0]);

    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const userJoinRequest = async (
  token,
  tripRequest,
  router,
  setLoading,
  SetpersonalModalShow,
  setConfirmModalShow,
  organizerId,
  tripId
) => {
  try {
    setLoading(true);
    const obj = {};
    if (tripRequest?.id) {
      obj.id = tripRequest?.id;
    }
    if (tripRequest?.passport) {
      obj.passport = tripRequest?.passport;
    }
    if (tripRequest?.firstName) {
      obj.firstName = tripRequest?.firstName;
    }
    if (tripRequest?.lastName) {
      obj.lastName = tripRequest?.lastName;
    }
    if (tripRequest?.gender) {
      obj.gender = tripRequest?.gender;
    }
    if (tripRequest?.phone) {
      obj.phone = tripRequest?.phone;
    }
    if (tripRequest?.email) {
      obj.email = tripRequest?.email;
    }
    if (tripRequest?.healthIssues) {
      obj.healthIssues = tripRequest?.healthIssues;
    }
    if (tripRequest?.birthDate) {
      obj.birthDate = tripRequest?.birthDate;
    }
    if (tripRequest?.age) {
      obj.age = tripRequest?.age;
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/requests/create-joining-request`,
      {
        tripId: organizerId,

        fields: obj,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response?.data?.message);
    SetpersonalModalShow(false);
    setConfirmModalShow(true);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const getAllUserRequest = async (
  setAllUserRequest,
  setLoading,
  setLimit,
  setTotalDocs,
  currentPage,
  token
) => {
  try {
    setLoading(true);
    const userRequest = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/requests/get-all-joining-request?page=${currentPage}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAllUserRequest(userRequest?.data?.data?.docs);
    setTotalDocs(userRequest?.data?.data?.totalDocs);
    setLimit(userRequest?.data?.data?.limit);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const uploadUserInfo = async (
  token,
  file,
  setLoading,
  id,
  setIsOpen,
  setSelectedFile
) => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("uploadImage", file);
    const userRequest = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/requests/upload-image/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSelectedFile(null);
    toast.success(userRequest?.data?.message);
    setIsOpen(false);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    setSelectedFile(null);
    setIsOpen(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

export const updateStatusFunction = async (
  token,
  id,
  status,
  setLoading,

  setIsOpen,
  setTripDetails,
  idData,
  OverlayAcceptSetIsOpen,
  OverlayRejectSetIsOpen
) => {
  try {
    setLoading(true);

    const userRequest = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/organizers/update-joining-request/${id}`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(userRequest?.data?.message);
    getJoiningRequest(setTripDetails, setLoading, token, idData);
    if (status === "Accepted") {
      OverlayAcceptSetIsOpen(true);
    } else {
      OverlayRejectSetIsOpen(true);
    }
    setIsOpen(false);
    setLoading(false);
  } catch (err) {
    setLoading(false);

    setIsOpen(false);
    if (err?.response?.data?.message === "unAuthorized") {
      cookies.remove("token");
      cookies.remove("role");
      router.push("/admin/login");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};

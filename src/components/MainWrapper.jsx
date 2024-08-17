import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../redux/authentication/authenticationSlice";
import axios from "axios";
// import Login from "../pages/client/ClientLogin";
import { BASE_URL } from "../constants/constants";
import Layout from "./Layout";
import NotFoundPage from "./NotFoundPage";
import tokenValidate from "../utils/tokenValidate";
import Login from "../pages/vendor/Login";
import Home from "../pages/vendor/Home";
import Profile from "../pages/vendor/vendorDashboardPages/Profile";
import Register from "../pages/vendor/Register";
import CarouselComponent from "./subFeatureComponents/Carousel";
import { Bounce, ToastContainer } from 'react-toastify';
import DashboardLayout from "./DashboardLayout";
import MyServices from "../pages/vendor/vendorDashboardPages/MyServices";
import EventDetails from "../pages/events/EventDetails";

function MainWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector((state) => state.authentication_user);
  const checkTokenValidation = async () => {
    const isTokenValid = await tokenValidate();
    if (!isTokenValid) {
      dispatch(
        set_Authentication({
          name: null,
          isAuthenticated: false,
          profileImage: null,
          loading: true,
        })
      );
    }
    return isTokenValid;

  };

  const fetchUserData = async (baseURL, token) => {
    try {
      await axios.get(baseURL + "vendor/details/", {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          dispatch(
            set_Authentication({
              name: res.data.vendor.username,
              isAuthenticated: res.data.vendor.is_active,
              isVerified: res.data.is_verification_completed,
              profileImage: res.data.logo,
              loading: false
            })
          );
        });
    } catch (error) {
      localStorage.clear()
      dispatch(
        set_Authentication({
          name: null,
          isAuthenticated: false,
          profileImage: null,
          loading: true
        })
      );
    }
  };

  useEffect(() => {
    if (!authentication_user.isAuthenticated) {
      if (checkTokenValidation()) {
        const token = localStorage.getItem("access");
        fetchUserData(BASE_URL, token);
      }
    }
  }, []);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="car" element={<CarouselComponent />} />
        <Route path="register" element={<Register />}></Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="event/" element={<PrivateRoute> < EventDetails/> </PrivateRoute>} />
          <Route path="dashboard/" element={<PrivateRoute> <DashboardLayout /> </PrivateRoute>}>
            <Route index path="my-account" element={<Profile />} />
            <Route path="my-services" element={<MyServices />} />
          </Route>
        </Route>
        {/* Custom 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default MainWrapper;
// ===============================================================
// need to update on the status
// ===============================================================
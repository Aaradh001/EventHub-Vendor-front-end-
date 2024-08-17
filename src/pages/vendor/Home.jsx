import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import CarouselComponent from "../../components/subFeatureComponents/Carousel";
import FlowAnimation from "../../components/subFeatureComponents/FlowAnimation";
import SlickSlider from "../../components/subFeatureComponents/SlickSlider";
import { Card } from "flowbite-react";


import EventList from "../../components/subComponents/Home/EventList";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { TError } from "../../components/subFeatureComponents/Toastify";

function Home() {
  const authentication_user = useSelector((state) => state.authentication_user);
  console.log(authentication_user);
  // const slides = [
  //   bgLogin, homeBg, regBg
  // ]
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("access");
  const baseURL = BASE_URL;


  useEffect(() => {
    axios.get(baseURL + "event/events",{headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
        Accept: "application/json",

      },}).then((data) => {
        console.log(data);
        let response = data.data.results.results;
        setVendorList(response);
        setTempVendorList(response);
    }).catch((err) => {
        console.log(err);
        TError("Data fetching failer")
    })
}, [])
  return (
    <>
      <section className="h-fit w-full bg-gray-50">
        <div className="h-56 sm:h-64 md:h-96 w-full">
          <CarouselComponent />
        </div>
        <section className="overflow-hidden">
          <div className="w-full bg-black overflow-hidden h-16 2xl:border-x-2 py-4 border-black">
            <FlowAnimation />
          </div>
          {/* <div className="w-full p-6 bg-gray-300">
                <SlickSlider />
              </div> */}
          <div className="m-4 md:m-8 px-4 py-8 bg-slate-200 rounded-xl">

            <div className="max-w-md w-full md:max-w-6xl bg-transparent mx-auto flex justify-center items-center h-16 ">
              <div className="border-2  border-gray-100 h-16" style={{
                flex: "none",
                width: "0",
                borderTop: "32px solid transparent",
                borderBottom: "32px solid transparent",
                borderRight: "70px solid white",
                borderLeft: "0"
              }}></div>
              <div className="w-full text-lg flex justify-center items-center kotta-one-regular border-y-2 border-gray-100 bg-white grow h-full">
                <div className="w-full px-4">
                  <p className="text-center">Listen for New Events</p>
                  <hr className="border-black border-2" />

                </div>
              </div>
              <div className="border-2 border-gray-100 h-16" style={{
                flex: "none",
                width: "0",
                borderTop: "32px solid transparent",
                borderBottom: "32px solid transparent",
                borderLeft: "70px solid white",
                borderRight: "0"
              }}></div>
            </div>

            <EventList />
            <EventList />
          </div>

          <div className="m-4 md:m-8 px-4 py-8 bg-gray-100 rounded-xl">

            <div className="max-w-md w-full md:max-w-6xl bg-transparent mx-auto flex justify-center items-center h-16 ">
              <div className="border-2  border-gray-100 h-16" style={{
                flex: "none",
                width: "0",
                borderTop: "32px solid transparent",
                borderBottom: "32px solid transparent",
                borderRight: "70px solid white"
              }}></div>
              <div className="w-full text-lg flex justify-center items-center kotta-one-regular border-y-2 border-gray-100 bg-white grow h-full">
                <div className="w-full px-4">
                  <p className="text-center">Add a New Service</p>
                  <hr className="border-black border-2" />

                </div>
              </div>
              <div className="border-2 border-gray-100 h-16" style={{
                flex: "none",
                width: "0",
                borderTop: "32px solid transparent",
                borderBottom: "32px solid transparent",
                borderLeft: "70px solid white"
              }}></div>
            </div>

            <div className="flex justify-center md:w-full my-4">
              <Card className="hover:bg-white bg-gray-50 cursor-pointer max-w-md w-full md:max-w-5xl">
                <div className="flex h-full flex-col justify-center rounded-xl">
                  <div className="p-4">
                    <div className="w-full  p-8 bg-black bg-opacity-50 flex-col md:flex md:flex-row rounded-md justify-between md:items-center">
                      <div className="p-6 mb-4 md:mb-0 bg-gray-300 w-full md:w-3/5 rounded-md">
                        <label className="pb-4 font-bold" htmlFor="addService">Service Name</label>
                        <div className="bg-white mt-4 w-full md:w-2/3 rounded-md">
                          <input type="text" id="addService" placeholder="Enter the name of your service..." className="placeholder:text-slate-400 border-0 w-full placeholder-middle focus:ring-1 bg-transparent focus:outline-0 h-12 pl-4 flex-1 w-full cursor-text rounded-md" />
                        </div>

                      </div>
                        <button className="bg-white px-4 py-1 text-black hover:bg-black rounded-md font-bold hover:ring-4 hover:ring-gray-300 transition duration-150 hover:text-white">Add Service</button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </section>
      </section>
    </>
  );
}

export default Home;
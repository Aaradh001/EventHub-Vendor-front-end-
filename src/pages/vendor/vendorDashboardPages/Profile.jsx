import React, { useEffect, useState } from "react";
import axios from "axios";
import userImg from "../../../assets/images/user.png";
import { set_Authentication } from "../../../redux/authentication/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../components/subComponents/FormInput";
import { BASE_URL } from "../../../constants/constants";
import Loader from "../../common/Loader";
import { TSuccess } from "../../../components/subFeatureComponents/Toastify";
function Profile() {
  const [formError, setFormError] = useState([]);
  const [isloading, setIsLoading] = useState(true)
  const [image, setImage] = useState(null)


  const [userDetails, setUserDetails] = useState({
    username: "",
    company_name: "",
    website: "",
    email: "",
    phone_number: "",
    logo: null,
    isVerified: false
  });
  const [message, setMessage] = useState(null);
  const authentication_user = useSelector((state) => state.authentication_user);
  const dispatch = useDispatch();
  console.log("userDetails    :", userDetails);
  const inputs = [
    {
      keyId: 1,
      id: "username",
      label: "Username",
      placeholder: "Enter the username . . .",
      type: "text",
      name: "username",
      // value: userDetails.vendor?.username,
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300",
      error: "Allowed characters: A-Z, a-z, Numbers: 0-9. Must contain 4 characters!",
      required: true,
      pattern: "^[A-Za-z0-9]{4,}$",
    },
    {
      keyId: 2,
      id: "company_name",
      label: "Company Name",
      placeholder: "Enter the company name . . .",
      // value: userDetails.company_name,
      type: "text",
      name: "company_name",
      labelclass: "block text-sm font-medium text-gray-400",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      error: "First name should not be blank, contain atleast 2 letters and no white spaces allowed, allowed characters: A-Z, a-z, 0-9",
      required: true,
      pattern: "^[A-Za-z0-9]{2,}$",
    },
    {
      keyId: 3,
      id: "website",
      label: "Website",
      placeholder: "Enter your official website [optional] . . .",
      type: "text",
      // value: userDetails.website,
      name: "website",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      labelclass: "block text-sm font-medium text-gray-400",
      error: "Allowed characters: A-Z, a-z.",
      required: false,
      // pattern: "^[A-Za-z0-9]{0,}$",
    },
    {
      keyId: 4,
      id: "email",
      label: "Email ID",
      placeholder: "Enter the email id . . .",
      // value: userDetails.vendor?.email,
      type: "email",
      name: "email",
      error: "Email ID should be valid !",
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      labelclass: "block text-sm font-medium text-gray-400",
      required: true,
    },

    {
      keyId: 5,
      id: "phone_number",
      label: "Phone number",
      placeholder: "Enter the phone number . . .",
      type: "text",
      name: "phone_number",
      // value: userDetails.vendor?.phone_number,
      className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300",
      labelclass: "block text-sm font-medium text-gray-400",
      error: "Should contain only numbers, no white spaces, no alphabets, no special charecters except '+'.",
      pattern: "^[0-9+]{10,}$",
      required: true,
    },
  ];

  const baseURL = BASE_URL;
  const token = localStorage.getItem("access");
  const fetchUserData = async (url) => {
    try {
      await axios
        .get(url, {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // let tempo = {
          //   id: "kdgfk",
          //   kl: "sdffd"
          // }
          // console.log(tempo);
          console.log("1st fetch  :", res.data);
          setUserDetails({

            username: res.data.vendor.username,
            company_name: res.data.company_name,
            website: res.data.website,
            email: res.data.vendor.email,
            phone_number: res.data.vendor.phone_number,
            logo: res.data.logo,
            isVerified: res.data.is_verification_completed
          }

          )

          // setUserDetails(res.data)
          setTimeout(() => {
            setIsLoading(false)
          }, 1000)
        });
    } catch (error) {
      console.log("the error is  :", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // Update the state based on the input field

    if (type === "file") {
      const file = event.target.files[0];
      console.log("new updated pic222   :", file);
      console.log(file);
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      console.log("new updated pic   :", userDetails.profile_pic);
    } else {
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      vendor: {
        username: userDetails.username,
        email: userDetails.email,
        phone_number: userDetails.phone_number,
      },
      company_name: userDetails.company_name,
      website: userDetails.website,
      logo: userDetails.logo,
      // isVerified: res.data.is_verification_completed
    }
    const formData = new FormData();
    // formData.append('logo', e.target.files[0]);
    formData.append('data', data);
    // formData.append('logo', e.target.files[0]);

    let url = baseURL + "vendor/profile/update/";
    axios.put(url, JSON.stringify(data), {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("res", res);

        if (res.status === 200) {
          TSuccess("User updated successfully");
          dispatch(
            set_Authentication({
              name: res.data.company_name,
              isAuthenticated: true,
              profileImage: res.data.logo,
              isVerified: res.data.is_verification_completed,
            })
          );
        }
      })
      .catch((err) => {
        setFormError(err.res);
        console.log(err.response.data);
      });
  };
  async function handleImage(e) {
    console.log(token);
    const formData = new FormData();
    formData.append('logo', e.target.files[0]);
    try {
      await axios.put(baseURL + "vendor/profile/updateLogo/", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("from image  :", res);
          TSuccess("Image updated !!")

          setUserDetails((prev) => ({
            ...prev,
            logo: res.data.logo
          }))
        });
    } catch (error) {
      console.log("the error is  :", error);
    }
  }

  useEffect(() => {
    fetchUserData(BASE_URL + 'vendor/details/');
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isloading ? <Loader /> : (
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap  ">
            {/* Left Side */}
            <div className="w-full md:w-3/12 md:mr-2">
              {/* Profile Card */}
              <div className="h-full flex flex-col items-center p-3 bg-white p-3 border-t-4 border-green-400">
                <div className=" border h-40 w-40 border-gray-500 flex max-w-xs md:max-w-xs overflow-hidden sm:rounded-full">
                  <img className="h-auto w-full mx-auto"
                    src={userDetails.logo ? userDetails.logo : userImg}
                    alt="" />
                </div>
                <input className="mx-auto w-full my-2 bg-gray-200 rounded-lg" onChange={handleImage} type="file" name="fileInput" id="fileInput" />
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userDetails ? userDetails.company_name : '...'}</h1>
                {/* <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.
                  </h3>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                    consectetur adipisicing elit.
                    Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt
                  </p> */}
              </div>
            </div>
            {/* Right Side */}
            <div className="w-full md:w-9/12">
              {/* Profile tab */}
              {/* About Section */}
              <div className="h-full bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-10">
                  <span clas="text-green-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="flex justify-center text-gray-700">
                  <div className="w-full md:max-w-xl text-sm">
                    <form className="w-full" onSubmit={handleSubmit}>
                      {inputs.map((input) => {

                        return (
                          <FormInput
                            key={input.keyId}
                            {...input}
                            value={userDetails[input.name]}
                            onChange={handleInputChange}
                          />
                        );
                      })}
                      <div className="w-full flex">
                        <button role="submit" className="ml-auto p-1 px-3 bg-green-500 border-2 font-bold text-white hover:text-black hover:bg-white hover:border-2 hover:border-green-500 rounded-md ">Save</button>
                      </div>

                    </form>
                  </div>
                </div>

              </div>
              {/* End of about section */}
              <div className="my-4"></div>
            </div>
          </div>
          <ul className="bg-white text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Verification Status</span>
              <span className="ml-auto">
                <span className={`${userDetails?.isVerified ? "bg-green-500" : "bg-red-500"} py-1 px-2 rounded text-white text-sm`}>{userDetails?.isVerified ? "Completed " : "Pending"}</span>
              </span>
            </li>
            <li className="flex items-center py-3">
              <span>Member since</span>
              {/* <span className="ml-auto">{userDetails?.vendor.date_joined}</span> */}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Profile;
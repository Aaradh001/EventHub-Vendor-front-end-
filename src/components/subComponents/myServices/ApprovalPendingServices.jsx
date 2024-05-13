import React, { useEffect, useState } from "react"
import { TError, TInfo, TSuccess } from "../../subFeatureComponents/Toastify";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants/constants";
import { AiOutlineDelete } from "react-icons/ai";
import { FaThumbsUp } from "react-icons/fa6";


export default function ApprovalPendingServices(props) {
    const token = localStorage.getItem("access");
    const fetchOtherServiceList = async (url) => {

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
                    console.log("the res     :", res);

                    props.setOtherServices(res.data.results)

                    // setTimeout(() => {
                    //     setIsLoading(false)
                    // }, 1000)
                });
        } catch (error) {
            console.log("the error is  :", error);
            // Navigate("/")
            // TError("Data Fetching failed")
        }
    };

    async function deleteOtherService(id) {
        if (!id) {
            TError("Operation failed! try again...")
            return
        }
        const url = `${BASE_URL}vendor/my-services/other-service/${id}/`
        try {
            await axios.delete(url, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {cd 
                    console.log("the res     :", res);
                    if (res.status == '204') {
                        const updatedServices = props.otherServices.filter(service => service.id !== id);
                        props.setOtherServices(updatedServices)
                        TInfo("Service removed !!")
                    }

                    // setTimeout(() => {
                    //     setIsLoading(false)
                    // }, 1000)
                });
        } catch (error) {
            console.log("the error is  :", error);
            // Navigate("/")
            // TError("Data Fetching failed")
        }
    };




    useEffect(() => {
        fetchOtherServiceList(BASE_URL + 'vendor/my-services/other-services/');
    }, [])
    return (
        <>
            {/*<!-- Component: Simple Table --> */}
            <div className="w-full bg-transparent shadow-md rounded-md overflow-x-auto">
                <table className="w-full text-left rounded">
                    <tbody>
                        <tr className="bg-gray-300">
                            <th scope="col" className="h-12 px-6 text-sm text-semibold border-l first:border-l-0 stroke-transparent text-black">Sl. No</th>
                            <th scope="col" className="h-12 px-6 text-sm text-semibold border-l first:border-l-0 stroke-transparent text-black">Service Name</th>
                            <th scope="col" className="h-12 px-6 text-sm text-semibold border-l first:border-l-0 stroke-transparent text-black">Unit of Measurement</th>
                            <th scope="col" className="h-12 px-6 text-sm text-semibold border-l first:border-l-0 stroke-transparent text-black">Cost per Unit</th>
                            <th scope="col" className="h-12 px-6 text-sm text-semibold border-l first:border-l-0 stroke-transparent text-black"></th>
                            {/* <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-transparent text-slate-700 bg-white">Username</th> */}
                        </tr>

                        {props.otherServices?.map((service, index) => (

                            <tr className="hover:shadow hover:shadow-lg hover:bg-gray-100" key={index}>
                                <td className="h-10 px-6 my-2 text-sm transition duration-300 hover:bg-white bg-gray-100 rounded-lg hover:shadow-2xl hover:shadow-black border-t border-l first:border-l-0 border-slate-200 hover:border-transparent stroke-slate-500 text-slate-500 ">{index + 1}</td>
                                <td className="h-10 px-6 my-2 text-sm transition duration-300 hover:bg-white bg-gray-100 rounded-lg hover:shadow-2xl hover:shadow-black border-t border-l first:border-l-0 border-slate-200 hover:border-transparent stroke-slate-500 text-slate-500 ">{service.name}</td>
                                <td className="h-10 px-6 my-2 text-sm transition duration-300 hover:bg-white bg-gray-100 rounded-lg hover:shadow-2xl hover:shadow-black border-t border-l first:border-l-0 border-slate-200 hover:border-transparent stroke-slate-500 text-slate-500 ">{service.unit_of_measurement === "OTHER_UNIT" ? service.other_unit_of_measurement : service.unit_of_measurement}</td>
                                <td className="h-10 px-6 my-2 text-sm transition duration-300 hover:bg-white bg-gray-100 rounded-lg hover:shadow-2xl hover:shadow-black border-t border-l first:border-l-0 border-slate-200 hover:border-transparent stroke-slate-500 text-slate-500 ">{service.cost_per_unit}</td>
                                <td className="h-10 my-2 text-sm text-center transition duration-300 bg-gray-100 rounded-lg border-t border-l first:border-l-0 border-slate-200 hover:border-transparent stroke-slate-500 text-slate-500">
                                    <button onClick={() => deleteOtherService(service?.id ?? null)} className="text-md transition-transform duration-300 transform hover:scale-150 hover:text-red-500 hover:shadow-lg">
                                        <AiOutlineDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!props.otherServices?.length && (
                    <div className="p-6 text-center flex flex-col justify-center items-center">
                        <FaThumbsUp className="w-16 h-16 text-green-500 my-4" />
                        <h2 className="text-lg font-semibold text-slate-800">You're all caught up!</h2>
                        <h4 className="text-xl my-2 font-semibold font-mono text-green-800">No pendings !</h4>

                    </div>)}
            </div>
            {/*<!-- End Simple Table --> */}

        </>
    )
}
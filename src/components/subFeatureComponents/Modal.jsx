import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../constants/constants";
import { TError, TSuccess } from "./Toastify";
import Accordion from "./Accordian";
import AddServiceForm from "../subComponents/myServices/AddServiceForm";

export default function ServicesModal({ setOtherServices, ...props }) {
    const [showModal, setShowModal] = React.useState(false);
    const [selectedValues, setSelectedValues] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const token = localStorage.getItem('access');
    async function handleServiceSelectSubmit(e) {
        e.preventDefault()
        if (!selectedValues.length) {
            TError("Select atleast 1 service to add !")
            return
        }
        axios.put(BASE_URL + "vendor/my-services/add-or-remove-service/",
            {
                action: "add",
                service_slugs: selectedValues
            }, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                console.log('added', response);
                props.setParentState1(response.data.selected_services);
                props.setParentState2(response.data.all_available_services);
                setShowModal(false);
                TSuccess("Services added !!")
            })
            .catch(error => {
                // Handle error
                console.error('Error removing service:', error);
                setShowModal(false);
                TError("Error ")
            });
    }
    function handleServiceSelect(event) {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedValues(selectedOptions);
    }

    return (
        <>
            <button
                className={`bg-blue-500 text-white active:bg-pink-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 ${props?.className}`}
                type="button"
                onClick={() => setShowModal(true)}>
                {props.buttonTitle}
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {props.title}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-40 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:opacity-100"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}

                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={(e) => handleServiceSelectSubmit(e)}>

                                        <label className="block text-sm font-medium text-gray-700" htmlFor="services">Choose from the available service lists </label>
                                        <select
                                            multiple
                                            onChange={(event) => handleServiceSelect(event)}
                                            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-300"
                                            name="services"
                                            id="services"
                                            style={{
                                                background: "none",
                                                paddingRight: "10px"
                                            }}
                                        >
                                            {props.availableServices.length ? props.availableServices?.map((service, index) => (
                                                <option className="p-1 rounded-sm" defaultValue={selectedValues.includes(service.slug)} key={index} value={service.slug}>{service.name}</option>
                                            )) : (
                                                <option disabled className="p-1 bg-gray-100 rounded-sm" defaultValue={""} value="">No services left</option>
                                            )}
                                        </select>
                                        {console.log("the length", selectedValues.length)}
                                        <button className={`${!props.availableServices.length ? 'cursor-not-allowed pointer-events-none bg-emerald-200' : 'bg-emerald-500'}  text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-green-500 my-2 active:bg-emerald-600 font-semibold text-sm px-5 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150`} type="submit">Save</button>
                                    </form>

                                    <Accordion
                                        title={"Add a new service"}
                                        data={<AddServiceForm accordianControl={setIsOpen} modalControl={setShowModal} setOtherServices={setOtherServices} />}
                                        isOpen={isOpen}
                                        toggleAccordion={() => setIsOpen((prev) => !prev)}
                                    />


                                    { }
                                    {/* {props.component} */}
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    {/* <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
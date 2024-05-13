import React from 'react'
import { Card } from "flowbite-react";
import testimg from "../../../assets/images/user1.png"


function EventList() {
    return (
        <div className="flex justify-center md:w-full my-4">
            <Card className="hover:bg-white bg-gray-50 cursor-pointer max-w-md w-full md:max-w-4xl">
                <div className="flex h-full flex-col justify-center border border-gray-500 rounded-xl">
                    <div className="flex-col items-center p-4">
                        <div className="w-full h-16 bg-transparent flex justify-between items-center">
                            <div className="h-full flex justify-center gap-10 items-center">
                                <div className="text-wrap">
                                    <p className="text-md block text-gray-700 font-bold">Venue</p>
                                    <p>Kumarakom lake resort</p>
                                </div>
                                <div className="text-wrap">
                                    <p className="text-md block text-gray-700 font-bold">Event ID</p>
                                    <p>BH23UYFUY</p>
                                </div>
                            </div>
                            <div className="h-full flex justify-center gap-10 items-center">
                                <div className="text-wrap">
                                    <p className="text-md block text-gray-700 font-bold">Client Name</p>
                                    <p>Aaradh Mahendran</p>
                                </div>
                                <div className="text-wrap">
                                    <p className="text-md block text-gray-700 font-bold">Status</p>
                                    <p className="font-bold text-green-500">Not Assigned</p>
                                </div>
                            </div>



                        </div>
                    </div>
                    <div className="flex justify-start h-full items-center">
                        <div className="bg-slate-200 h-full w-28 h-24 p-4">
                            <img src={testimg} className="w-50 mx-auto block h-full object-contain" alt="" />
                        </div>
                        <div className="flex justify-between items-center h-full w-full">
                            <div className="px-4">
                                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Adams Wedding
                                </h5>
                                <p className="text-sm block text-gray-700 dark:text-gray-400">
                                    Venue :
                                    <span> Kumarakom lake resort</span>
                                </p>
                                <p className="text-sm block text-gray-700 dark:text-gray-400">
                                    Booking ID :
                                    <span> EH001TSD4</span>
                                </p>
                            </div>
                            <div className="px-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm block text-gray-700 dark:text-gray-400">
                                        From
                                    </p>
                                    <span className="font-bold text-sm ml-4"> 11-Apr-2024</span>

                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm block text-gray-700 dark:text-gray-400">
                                        To
                                    </p>
                                    <span className="font-bold text-sm ml-4"> 12-Apr-2024</span>
                                </div>
                            </div>
                            <div className="px-4">
                                <div className="flex justify-between items-center">
                                    <button className="bg-gray-800 px-4 py-2 text-white hover:bg-white rounded-lg font-bold hover:ring-4 hover:ring-sky-400 transition duration-150 hover:text-black">See Requirements</button>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="w-full flex justify-end item-center p-4">
                        <div className="flex justify-between item-center gap-8">
                            <div>
                                <p className="text-sm text-bold text-blue-700 px-2">Overall Budjet : Rs 10,00,000.00</p>
                            </div>
                            <div className="flex justify-between item-center gap-4">
                                <button className="bg-green-500 py-1 px-4  text-white hover:bg-white rounded-lg hover:ring-4 hover:ring-green-400 transition duration-150 hover:text-black">Quote</button>
                                <button className="bg-red-600 py-1 px-4  text-white hover:bg-white rounded-lg hover:ring-4 hover:ring-red-600 transition duration-150 hover:text-black">Reject</button>
                            </div>
                        </div>
                    </div>
                </div>

            </Card>

        </div>
    )
}

export default EventList

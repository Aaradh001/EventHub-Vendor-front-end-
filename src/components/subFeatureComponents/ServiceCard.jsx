import React from 'react'

const ServiceCard = ({name, icon, unit_of_measurement, removeService, serviceSlug}) => {
    return (
        <>
            <div className="w-full px-3 md:w-1/2 lg:w-1/3">
                <div className="relative mb-7 rounded-[20px] bg-white md:pt-6 md:pb-1 p-8 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
                    <div className="mb-3 flex h-[40px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                        <img src={icon} alt="" />
                    </div>
                    <h4 className="mb-2 text-2xl font-semibold text-dark dark:text-white">
                        {name}
                    </h4>
                    <p className="text-body-color dark:text-dark-6">Measured by {unit_of_measurement}</p>
                    <div className='w-full flex justify-end items-center my-4'>
                        {/* <button onClick={changeStatus} className="bg-gray-900 py-1 px-4  text-white hover:bg-white rounded-lg hover:ring-4 hover:ring-gray-900 font-semibold transition duration-150 hover:text-black">Change status</button> */}
                        <button onClick={()=>removeService(serviceSlug)} className="bg-red-600 py-1 px-4  text-white hover:bg-white rounded-lg hover:ring-4 hover:ring-red-600 font-semibold transition duration-150 hover:text-black">Remove</button>
                    </div>
                    {/* <div className={`absolute right-5  top-5 py-1 px-4 text-white rounded-lg ${status ? "bg-green-500" : "bg-red-500"}`}>{status ? "Serviceable" : "Not Serviceable"}</div> */}
                </div>
            </div>
        </>
    )
}

export default ServiceCard

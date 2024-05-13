import React, { useEffect, useState } from 'react'
import ServiceCard from '../../../components/subFeatureComponents/ServiceCard'
import { BASE_URL } from '../../../constants/constants';
import axios from 'axios';
import Loader from '../../common/Loader';
import { TError, TSuccess } from '../../../components/subFeatureComponents/Toastify';
import { useNavigate } from 'react-router-dom';
import ServicesModal from '../../../components/subFeatureComponents/Modal';
import AddServiceForm from '../../../components/subComponents/myServices/AddServiceForm';
import ApprovalPendingServices from '../../../components/subComponents/myServices/ApprovalPendingServices';

const MyServices = () => {
    const baseURL = BASE_URL;
    const token = localStorage.getItem("access");
    const [venues, setVenues] = useState([]);
    // const [availableServices , setAvailableServices] = useState([]);
    // const [otherServices, setOtherServices] = useState([])

    const navigate = useNavigate();

    const [isloading, setIsLoading] = useState(true)



    const fetchVenueList = async (url) => {
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
                    console.log(res);
                    setServices(res.data.selected_ )
                    setAvailableServices(res.data.all_available_services)

                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1000)
                });
        } catch (error) {
            console.log("the error is  :", error);
            navigate("/")
            TError("Data Fetching failed")
        }
    };

    function removeService(serviceSlug) {
        axios.put(BASE_URL + `vendor/my-services/add-or-remove-service/`, { action: "remove", service_slug: serviceSlug }, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                console.log(response);
                // Handle success
                setServices(response.data.selected_services)
                setAvailableServices(response.data.all_available_services)
                TSuccess("Service removed successfully !!")
            })
            .catch(error => {
                // Handle error
                console.error('Error removing service:', error);
                TError("Error ")
            });
    }

    useEffect(() => {
        fetchServiceList(baseURL + 'vendor/my-services/');
    }, [])
    return (
        <>
            {isloading ? <Loader /> : (
                <section className="pb-12 pt-10 dark:bg-dark lg:pb-[90px] lg:pt-10">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="mx-auto mb-4 max-w-[510px] text-center lg:mb-4">
                                    <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                                        My Services
                                    </h2>
                                    <span className="mb-2 block text-sm font-normal text-gray-500">
                                        These are the services provided by you. <br /> Add or remove services from the below lists
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex justify-center md:justify-end px-5 py-2">
                            <ServicesModal
                                buttonTitle={"Add a service"}
                                title={"Add a new service to your lists"}
                                availableServices={availableServices}
                                setParentState1={setServices}
                                setParentState2={setAvailableServices}
                                setOtherServices={setOtherServices}
                            />
                        </div>
                        <div className="flex flex-wrap p-2">
                            {services.map((service, index) => (
                                <ServiceCard key={index}
                                    name={service.name}
                                    unit_of_measurement={service.unit_of_measurement}
                                    serviceSlug={service.slug}
                                    icon={baseURL + service.thumbnail}
                                    status={service.is_active}
                                    removeService={removeService}
                                />
                            ))}
                        </div>
                        <div className="w-full px-5 py-2">

                            <div className="mb-8">
                                <h2 className="mb-3 text-xl font-bold leading-[1.2] text-dark dark:text-white sm:text-3xl">
                                    Services pending for approval
                                </h2>
                            </div>
                            <ApprovalPendingServices otherServices={otherServices} setOtherServices={setOtherServices} />
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default MyServices

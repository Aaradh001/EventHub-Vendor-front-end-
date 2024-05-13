import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BASE_URL } from '../../../constants/constants';
import axios from 'axios';
import { TError, TSuccess } from '../../subFeatureComponents/Toastify';
import FormInput from '../FormInput';

const AddServiceForm = (props) => {
    const [values, setValues] = useState({
        name: "",
        cost_per_unit: "",
        unit_of_measurement: "",
        other_unit_of_measurement: "",
    });
    const [disable, setDisable] = useState(false)
    const baseURL = BASE_URL;


    const inputs = [
        {
            keyId: 1,
            id: "name",
            label: "name",
            placeholder: "Enter the service name . . .",
            type: "text",
            name: "name",
            labelclass: "block text-sm font-medium text-gray-400",
            className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-blue-500 transition-colors duration-500",
            error: "Allowed characters: A-Z, a-z, 0-9!",
            required: true,
            pattern: "^[A-Za-z0-9][A-Za-z0-9\\s]*[A-Za-z0-9]$",
        },
        {
            keyId: 2,
            id: "cost_per_unit",
            label: "Cost Per Unit",
            placeholder: "Enter the cost per unit value . . .",
            type: "text",
            name: "cost_per_unit",
            labelclass: "block text-sm font-medium text-gray-400",
            className: "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-blue-500 transition-colors duration-500",
            error: "Enter a valid decimal number greater than zero",
            required: false,
            pattern: "^(?!0\\.00$)\\d+(\\.\\d{1,2})?$",
        },
        {
            keyId: 3,
            id: "other_unit_of_measurement",
            label: "Unit of measurement (if any other)",
            placeholder: "Enter unit of measurement . . .",
            type: "text",
            name: "other_unit_of_measurement",
            className: "mt-1 uppercase p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-blue-500 transition-colors duration-500",
            labelclass: "block text-sm font-medium text-gray-400",
            error: "Allowed characters: A-Z, a-z.",
            required: false,
            pattern: "^[A-Za-z]+$",
        },
    ];


    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", event.target.name.value);
        formData.append("cost_per_unit", event.target.cost_per_unit.value);
        event.target.unit_of_measurement.value ?? formData.append("unit_of_measurement", event.target.unit_of_measurement.value);
        formData.append("other_unit_of_measurement", event.target.other_unit_of_measurement.value.toUpperCase());
        const token = localStorage.getItem("access")

        try {


            const res = await axios.post(
                baseURL + "vendor/my-services/other-services/", formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
            );
            if (res.status === 201) {
                console.log("the response",res);
                props.accordianControl(false);
                props.modalControl(false);
                TSuccess("Service created successfully and will be added once verified by the administator!!");
                props.setOtherServices((prev) =>[...prev, res.data])


                return res;
            }
        } catch (error) {
            console.log(error);
            TError("Operation failed!!", error)
        }
    };

    const handleChange = (e) => {
        e.target.name === 'other_unit_of_measurement' && e.target.value ? setDisable(true) : setDisable(false)
        
        
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <form onSubmit={handleRegisterSubmit}>

                {inputs.map((input) => {
                    return (
                        <FormInput
                            key={input.keyId}
                            {...input}
                            value={values[input.name]}
                            onChange={handleChange}
                        />
                    );
                })}
                <div>
                    <label htmlFor="unit_of_measurement" className="block text-sm font-medium text-gray-400">Unit of measurement</label>
                    <select disabled={disable} name="unit_of_measurement" id="unit_of_measurement" className={`${disable?'cursor-not-allowed':'cursor-pointer'} mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-blue-500 transition-colors duration-500`}>
                        <option className='bg-gray-100' value="">Choose</option>
                        <option className='bg-gray-100' value="PERSON_COUNT">PERSON_COUNT</option>
                        <option className='bg-gray-100' value="COUNT">COUNT</option>
                        <option className='bg-gray-100' value="AREA(Sq_Ft)">{"AREA(Sq_Ft)"}</option>
                    </select>
                </div>

                <div className="w-full mt-10">
                    <button className="w-full text-white bg-indigo-400 rounded-md border-0 py-2 px-8 focus:outline-none hover:bg-indigo-700 text-lg">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddServiceForm

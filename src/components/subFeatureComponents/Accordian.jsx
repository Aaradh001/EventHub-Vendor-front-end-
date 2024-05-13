import React from "react";

export default function Accordion(props) { 
    return ( 
        <div className="mt-5 block text-sm font-medium text-gray-700"> 
            <button 
                className="text-left text-black align-middle hover:text-blue-600 transition duration-400"
                onClick={props.toggleAccordion} 
            >
                {props.title} 
                <span className={`ml-4 float-right transform ${props.isOpen ? 'rotate-90' : 'rotate-0'} transition-transform duration-300`}> 
                    &#11162; 
                </span> 
            </button> 
            {props.isOpen && ( 
                <div className="p-4 bg-white"> 
                    {props.data} 
                </div> 
            )} 
        </div> 
    ); 
}; 

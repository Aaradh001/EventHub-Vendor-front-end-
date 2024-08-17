import React, { useState } from 'react'

function CollapsView() {

    let [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card   p-5  w-full min-h-10 rounded-lg">
            <div className="collapseBox">
                <div type="button" className="bg-white flex justify-between p-4 rounded collapseQuestion" onClick={()=> setIsOpen(!isOpen)}>
                    <h2>Categering</h2>
                    <span className={`${isOpen && "rotate-180" }`}>↓ </span>
                </div>
                <div className={`${!isOpen && "hidden"}  bg-white w-100 p-5 min-h-10 mt-1`}>
                    <ul>
                        <li>
                            <div className='bg-white shadow p-3'>
                                <div className="flex justify-between items-center">
                                    <h4>Food Type</h4>
                                    <div className='max-h-36 overflow-scroll '>
                                        <ul type="button" className='max-h-36 flex flex-col items-end overflow-scroll'>
                                            <li>Non Veg</li>
                                            <li>Veg</li>
                                            <li>Non Veg</li>
                                            <li>Veg</li> <li>Non Veg</li>
                                            <li>Veg</li> <li>Non Veg</li>
                                            <li>Veg</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className='w-full ml-auto flex justify-end'>
                        <button className='bg-black text-white p-3 rounded mt-3'>Budget: 30,000</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollapsView
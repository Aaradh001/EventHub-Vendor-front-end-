import Slider from "slick-slider-react"
import React, { useState } from 'react'
import CustomCard from "./Card"

import imgHouseWarming from "../../assets/images/homePage/eventCategories/housewarming.jpg"
import imgOffMeet from "../../assets/images/homePage/eventCategories/officialmeet.jpg"
import imgWedding from "../../assets/images/homePage/eventCategories/wedding.jpg"



function SlickSlider() {
    const [index, setIndex] = useState(0)
    // const elements = []
    // for (let i = 0; i < 10; i++) {
    //     elements.push(<CustomCard key={i}  image={imgWedding} />);
    // }

    return (
        <Slider alignment="center" className="gap-5" index={index} onSlide={setIndex}>
            <CustomCard image={imgWedding}/>
            <CustomCard image={imgHouseWarming}/>
            <CustomCard image={imgOffMeet}/>
            <CustomCard image={imgHouseWarming}/>
            <CustomCard image={imgWedding}/>

            {/* {elements} */}
            {/* <div className="w-64 bg-red-500 h-[100px]">1</div>
            <div className="w-64 bg-green-500 h-[100px]">2</div>
            <div className="w-64 bg-blue-500 h-[100px]">3</div>
            <div className="w-64 bg-yellow-500 h-[100px]">4</div>
            <div className="w-64 bg-white h-[100px]">4</div>
            <div className="w-64 bg-red-500 h-[100px]">1</div>
            <div className="w-64 bg-green-500 h-[100px]">2</div>
            <div className="w-64 bg-blue-500 h-[100px]">3</div>
            <div className="w-64 bg-yellow-500 h-[100px]">4</div>
            <div className="w-64 bg-white h-[100px]">4</div> */}
        </Slider>
    )
}

export default SlickSlider

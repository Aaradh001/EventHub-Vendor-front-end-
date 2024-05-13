
import { Card } from "flowbite-react";

function CustomCard(props) {
    return (
        <Card
            className="relative object-contain w-64 h-72 max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={props.image} 
            >
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-10"></div>

            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-wrap text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
        </Card>
    );
}
export default CustomCard;

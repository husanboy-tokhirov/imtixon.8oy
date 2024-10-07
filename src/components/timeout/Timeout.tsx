import { useState, useEffect } from "react";
import parfume from "../../assets/images/parfume.jpg";
import parfum from "../../assets/images/parfum.webp";
import par from "../../assets/images/par.avif";
import parfumee from "../../assets/images/parfumeee.jpg";
import chanel from "../../assets/images/chanel.jpg";
import crid from "../../assets/images/creed.webp";

const Timeout = () => {
    const [currentImage, setCurrentImage] = useState(parfume);

    useEffect(() => {
        const images = [parfume, parfum, par, parfumee, chanel, crid];
        let index = 0;
        const imageInterval = setInterval(() => {
            index = (index + 1) % images.length;
            setCurrentImage(images[index]);
        }, 1500);

        return () => clearInterval(imageInterval);
    }, []);

    return (
        <div className="w-[1440px] mx-auto">
            <div>
                <img
                    src={currentImage}
                    alt="current"
                    className="w-full object-cover h-[500px] transition-opacity duration-500 ease-in-out"
                />
            </div>
        </div>
    );
};

export default Timeout;

import React, { useEffect, useState } from 'react'
import image1 from '../assets/banner/img1.webp';
import image2 from '../assets/banner/img2.webp';
import image3 from '../assets/banner/img3.jpg';
import image4 from '../assets/banner/img4.jpg';
import image5 from '../assets/banner/img5.webp';
import image1mobile from '../assets/banner/img1_mobile.jpg';
import image2mobile from '../assets/banner/img2_mobile.webp';
import image3mobile from '../assets/banner/img3_mobile.jpg';
import image4mobile from '../assets/banner/img4_mobile.jpg';
import image5mobile from '../assets/banner/img5_mobile.png';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const desktopImages = [
        image1, image2, image3, image4, image5
    ]
    const mobileImages = [
        image1mobile, image2mobile, image3mobile, image4mobile, image5mobile
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1);
        }
    }

    const prevImage = () => {
        if (currentImage != 0) {
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='bg-slate-200 h-60 md:h-72 w-full relative'>
                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-3xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'><GrPrevious /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><GrNext /></button>
                    </div>
                </div>
                {/* desktop and tablet */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        desktopImages.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full min-h-full min-w-full transition-all' key={imageUrl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageUrl} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>


                {/* Mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImages.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full min-h-full min-w-full transition-all' key={imageUrl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageUrl} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerProduct
import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />
            <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
            <HorizontalCardProduct category={"watches"} heading={"Popular Watche's"} />
            <VerticalCardProduct category={"earphones"} heading={"Earphones"} />
            <VerticalCardProduct category={"mobile"} heading={"Mobiles"} />
            <VerticalCardProduct category={"camera"} heading={"Camera"} />
            <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
            <VerticalCardProduct category={"printers"} heading={"Printers"} />
            <VerticalCardProduct category={"processor"} heading={"Processor"} />
            <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
            <VerticalCardProduct category={"speakers"} heading={"Speakers"} />
            <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
            <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
        </div>
    )
}

export default Home
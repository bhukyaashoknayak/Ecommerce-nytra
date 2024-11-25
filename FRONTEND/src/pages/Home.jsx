import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories';
import TrendingProducts from '../components/TrendingProducts';
import Deals from '../components/Deals';
import ReturnPolicy from '../components/ReturnPolicy';
import Blog from '../components/Blog';


const Home = () => {
    return (
        <>
            <Hero />
            <Categories />
            <TrendingProducts />
            <Deals />
            <ReturnPolicy />
            <Blog />
        </>

    )
}

export default Home;
import React from 'react';
import Banner from './Banner';
import ServicesSection from './ServicesSection';
import BrandsSection from './BrandsSection';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <BrandsSection></BrandsSection>
        </div>
    );
};

export default Home;
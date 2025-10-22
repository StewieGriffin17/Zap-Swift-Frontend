import React from 'react';
import Banner from './Banner';
import ServicesSection from './ServicesSection';
import BrandsSection from './BrandsSection';
import Benefits from './Benefits';
import MerchantPriority from './MerchantPriority';
import HowItWorks from './HowItWorks';
import Customers from './Customers';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <ServicesSection></ServicesSection>
            <BrandsSection></BrandsSection>
            <Benefits></Benefits>
            <MerchantPriority></MerchantPriority>
            <Customers></Customers>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;
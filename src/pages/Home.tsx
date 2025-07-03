import React from 'react'
import Hero from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';
import About from '../components/About';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedBooks />
        <About />
        <Contact />
        <Testimonials />
        <Statistics />
    </>
  )
}

export default Home;

import Hero from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';
import About from '../components/About';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <>
       <Helmet>
        <title>BookStore | Home</title>
       </Helmet>
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

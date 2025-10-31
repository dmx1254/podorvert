import React from 'react';
import Slider from '../components/Slider';
import About from '../components/About';
import ImpactCarousel from '../components/ImpactCarousel';
import KeyFigures from '../components/KeyFigures';
import Activities from '../components/Activities';
import News from '../components/News';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import AmbassadorPodium from '../components/AmbassadorPodium';
import Donation from '../components/Donation';
import PepinieresSlider from '../components/PepinieresSlider';
import NewsletterWhatsapp from '../components/NewsletterWhatsapp';

const HomePage: React.FC = () => {
  return (
    <>
      <Slider />
      <About />
      <ImpactCarousel />
      <KeyFigures />
      <Activities />
      <News />
      <Testimonials />
      <Partners />
      <AmbassadorPodium />
      <Donation />
      <PepinieresSlider />
      <NewsletterWhatsapp />
    </>
  );
};

export default HomePage;

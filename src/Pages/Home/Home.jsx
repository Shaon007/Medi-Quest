
import { Helmet } from 'react-helmet';
import Banner from '../../Component/Home/Banner';
import CategoryCard from '../../Component/Home/CategoryCard';
import OfferSlider from '../../Component/Home/OfferSlider';
import WhyChooseUs from '../../Component/Home/Meds';
import Testimonials from '../../Component/Home/Testimonials';

const Home = () => {

  return (
    <div className="">
      <Helmet>
        <title>MediQuest | Buy Essential Medicines</title>
      </Helmet>
      <Banner />
      <CategoryCard />
      <OfferSlider />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;
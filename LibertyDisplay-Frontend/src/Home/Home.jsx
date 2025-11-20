import Product360 from "../360 View/Product360";
import AirWheelerBagFeatures from "../Air Wheeler Bag Feature/AirWheelerBagFeatures";
import { Certificate } from "../Certificate/Certificate";
import CoreFeatures from "../Core Feature/CoreFeature";
import FeatureWithIntro from "../Introducing/FeatureWithIntro";
import ProductSlider from "../Product Slider/ProductSlider";
import { SliderBanner } from "../SliderBanner/SliderBanner";
import TestimonialsSlider from "../Testimonials/Testimonials";

export const Home = () => {
  return (
    <div>
      <div>
        <SliderBanner></SliderBanner>
      </div>
      <FeatureWithIntro></FeatureWithIntro>
      <CoreFeatures></CoreFeatures>
      <AirWheelerBagFeatures></AirWheelerBagFeatures>
      <ProductSlider></ProductSlider>
      {/* <Certificate></Certificate> */}
      {/* <Product360></Product360> */}
      <TestimonialsSlider></TestimonialsSlider>
    </div>
  );
};

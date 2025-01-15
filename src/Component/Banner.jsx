import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const Banner = () => {
  return (
    <div>
      <Carousel>
        <div className="object-cover ">
          <img className="max-h-[650px]" src="https://i.pinimg.com/736x/36/58/87/3658871ba8ed4225f1a7afbb58053c07.jpg" />
        </div>
        <div>
          <img className="max-h-[650px]" src="https://i.pinimg.com/736x/0d/4f/bb/0d4fbb15f3af11e41a8ac66908c96fcd.jpg" />
        </div>
        <div>
          <img className="max-h-[650px]" src="https://i.pinimg.com/736x/00/a4/fa/00a4fa0bd0567c78335f9fa46111da4b.jpg" />
        </div>
      </Carousel>

    </div>
  );
};

export default Banner;
import Carousel from 'react-bootstrap/Carousel';
//import ExampleCarouselImage from 'components/ExampleCarouselImage';
import './Carousel.css'
function HomeCarousel() {
  return (
    <Carousel className='Carousel'>

      <Carousel.Item>
        <img src='/image/nofurni.jpg' className='carouselImg'/>
      </Carousel.Item>

      <Carousel.Item className='carousel'>
        <img src='/image/nofurni2.jpg' className='carouselImg'/>
      </Carousel.Item>

      <Carousel.Item>
      <img src='/image/nofurni3.jpg' className='carouselImg'/>
      </Carousel.Item>

    </Carousel>
  );
}

export default HomeCarousel;
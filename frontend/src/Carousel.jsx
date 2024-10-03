// src/Carousel.jsx
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import ExampleCarouselImage from './ExampleCarouselImage'; // Ensure this path is correct
import one from '/assets/one.jpg'; // Importing images
import two from '/assets/two.jpg';
import three from '/assets/three.png';
import './Carousel.css'


function CarouselFadeExample() {
    return (
        <Carousel fade>
            <Carousel.Item>
                <ExampleCarouselImage
                    src={one} // Use the imported image
                />
                <Carousel.Caption>
                    <h3 className='first'>MacBook Pro</h3>
                    {/* <p>MacBook Pro blasts forward with the M3, M3 Pro and M3 Max chips. Built on 3‑nanometre technology and featuring an all-new GPU architecture, they’re the most advanced chips ever built for a personal computer. And each one brings more pro performance and capability.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <ExampleCarouselImage
                    src={two} // Use the imported image
                />
                <Carousel.Caption>
                    <h3 className='second'>Iphone<i className="fa-brands fa-apple"></i></h3>
                    {/* <p>Description for the second slide.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <ExampleCarouselImage
                    src={three} // Use the imported image
                />
                <Carousel.Caption>
                <b className="fa-brands fa-apple"></b>
                    {/* <h3 className='third'>Dynamic Island..!</h3> */}
                    {/* <p>Description for the third slide.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselFadeExample;

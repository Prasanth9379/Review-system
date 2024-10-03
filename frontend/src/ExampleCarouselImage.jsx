import React from 'react';

const ExampleCarouselImage = ({ text, src }) => {
    return (
        <div className="carousel-image-container">
            <img style ={{height: '95vh'}}
                className="d-block w-100"
                src={src} // Use the src prop for the image URL
                alt={text} // Use the text prop for the alt attribute
            />
            <div className="carousel-text">
                <h3>{text}</h3>
            </div>
        </div>
    );
};

export default ExampleCarouselImage;

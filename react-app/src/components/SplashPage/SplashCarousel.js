import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


function SplashCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item interval={6000}>
                <div className='carousel-slide'>
                    
                    <div className='welcome-about'>
                        <p>Discover the power of your subconscious with DreamyNote, a dream journaling app.</p>
                        
                        
                    </div>
                </div>
            </Carousel.Item >
            <Carousel.Item interval={6000}>
                <div className='carousel-slide'>
                    <p>Dive into a world of self-discovery as you explore your innermost thoughts, emotions, and desires.</p>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={6000}>
                <div className='carousel-slide'>
                    <p>Keeping track of your dreams has never been easier!</p>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}


export default SplashCarousel;
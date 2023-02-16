import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import sheep from '../../assets/sheep.png'

function SplashCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <div className='carousel-slide'>
                    <div className='sheep-splash'>
                        <img className='user-sheep-img' alt='sheep icon' src={sheep} />
                    </div>
                    <div className='welcome-about'>
                    Discover the power of your subconscious with DreamyNote, a dream journaling app.
                    Dive into a world of self-discovery as you explore your innermost thoughts, emotions, and desires.
                    Keeping track of your dreams has never been easier!
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='carousel-slide'>hello</div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='carousel-slide'>hello</div>
            </Carousel.Item>
        </Carousel>
    );
}


export default SplashCarousel;
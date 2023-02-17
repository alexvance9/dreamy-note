import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import newdream from "../../assets/new-dream.png"
import dashboard from "../../assets/dashboard.png"
import journals from "../../assets/journals.png"

function SplashCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            <Carousel.Item >
                <div className='carousel-slide-1'>
                    <div className='splash-image-container-1'>
                        <img src={dashboard} alt="dashboard" />
                    </div>
                    <div className='welcome-about'>
                        <p>Discover the power of your subconscious with DreamyNote, a dream journaling app.</p>
                        <p>Dive into a world of self-discovery as you explore your innermost thoughts, emotions, and desires.</p>
                    </div>
                </div>
            </Carousel.Item >
            <Carousel.Item >
                <div className='carousel-slide-1'>
                    <div className='splash-image-container-2'>
                        <img src={newdream} alt="new dream" />
                    </div>
                    <div className='welcome-about'>
                        <p> Your dreams are a window into your soul.</p>
                        <p>Use a rich text editor to write and format personalized Dream Journal entries.</p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item >
                <div className='carousel-slide-3'>
                    <div className='splash-image-container-3'>
                        <img src={journals} alt="journals" />
                    </div>
                    <div className='welcome-about-3'>
                    <p>Organize your Dreams in different Journals with particular meanings.
                    Keeping track of your dreams has never been easier!</p>
                    <p>Sign up today to get started on your journey into the depths of the mind.</p>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}


export default SplashCarousel;
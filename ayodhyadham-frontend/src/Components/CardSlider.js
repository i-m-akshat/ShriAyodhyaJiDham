import React, { useState, useEffect } from 'react';
import Card from './Card';
import 'bootstrap/dist/js/bootstrap.min.js';
import './CardSlider.css'; // Create and import a CSS file for custom styles
import { Link } from 'react-router-dom';

function CardSlider({ Spots, id }) {
    const dataLength = Spots.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(''); // Track slide direction

    useEffect(() => {
        const timer = setTimeout(() => {
            setSlideDirection('');
        }, 500);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setSlideDirection('next'); // Set direction for next
        const nextIndex = currentIndex + 4;
        if (nextIndex >= dataLength) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(nextIndex);
        }
    };

    const handlePrev = () => {
        setSlideDirection('prev'); // Set direction for prev
        const prevIndex = currentIndex - 4;
        if (prevIndex < 0) {
            const newIndex = dataLength - 4 >= 0 ? dataLength - 4 : 0;
            setCurrentIndex(newIndex);
        } else {
            setCurrentIndex(prevIndex);
        }
    };

    return (
        <>
            <div className="carousel carousel-dark slide my-4" id={id} data-ride="carousel">
                <div className="carousel-inner">
                    <div className='row'>
                        <div className='col'>
                            <div className="col-6 off my-3">
                                <a
                                    className="btn-Round2 mb-3 mx-1"
                                    onClick={handlePrev}
                                    role="button"
                                    data-bs-slide="prev"
                                >
                                    <i className="fa fa-arrow-left"></i>
                                </a>
                                <a
                                    className="btn-Round2 mb-3 mx-1"
                                    onClick={handleNext}
                                    role="button"
                                    data-bs-slide="next"
                                >
                                    <i className="fa fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>

                        <div className='col-auto'>
                            <Link className='btn-Round2 mb-3 mx-1' to='/SpotList'>
                                View More
                            </Link>
                        </div>
                    </div>

                    <div className={`carousel-item active ${slideDirection}`}>
                        <div className={`row card-container ${slideDirection === 'next' ? 'slide-next' : slideDirection === 'prev' ? 'slide-prev' : ''}`}>
                            {
                                Spots.slice(currentIndex, currentIndex + 4).map((res, index) => (
                                    <Card key={index} img={res.icon_image} id={res.spot_id} desc={res.short_description} title={res.spot_name} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardSlider;

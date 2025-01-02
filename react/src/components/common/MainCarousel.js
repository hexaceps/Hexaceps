import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeftShort, ArrowRightShort } from "react-bootstrap-icons";
import { Container, Button } from "react-bootstrap";
import "./MainCarousel.css";

const MainCarousel = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);

    const updateSlides = (newIndex) => {
      if (newIndex < 0) {
        newIndex = images.length - 1;
      } else if (newIndex >= images.length) {
        newIndex = 0;
      }
      setActiveIndex(newIndex);
    };
  
    const handleLeftArrowClick = () => {
      updateSlides(activeIndex - 1);
      resetAutoSlide();
    };
  
    const handleRightArrowClick = () => {
      updateSlides(activeIndex + 1);
      resetAutoSlide();
    };
  
    const handleDotClick = (index) => {
      setActiveIndex(index);
      resetAutoSlide();
    };
  
    // 자동 슬라이드 전환 시작
    const startAutoSlide = useCallback(() => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length); // 다음 슬라이드로 이동
      }, 10000); 
    }, [images.length]);
  
    // 자동 슬라이드 타이머 초기화
    const resetAutoSlide = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      startAutoSlide();
    };
  
    // 컴포넌트가 마운트되면 자동 슬라이드 시작
    useEffect(() => {
      startAutoSlide();
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [startAutoSlide]);

    const getClassName = (index) => {
      const diff = (index - activeIndex + images.length) % images.length;
      const classNames = ["prev-2", "prev-1", "active", "next-1", "next-2"];
      return classNames[diff] || "";
    };
  
    return (
      <div className="slider-container">
          <span className = "arrow-left-center" onClick={handleLeftArrowClick}/>
          <span className = "arrow-right-center" onClick={handleRightArrowClick}/>
          <span className="arrow-left" onClick={handleLeftArrowClick}>
            <ArrowLeftShort size={28} color="gray" />
          </span>
          <span className="arrow-right" onClick={handleRightArrowClick}>
            <ArrowRightShort size={28} color="gray" />
          </span>
          <div className="slider">
            {images.map((data, index) => 
              <div key={index} className={`slide ${getClassName(index)}`} >
                <img src={data.image} alt={`hexaceps_image_${index}`} />
              </div>
            )}
          </div>
          <div className="dots">
            {Array.from({ length: images.length }, (_, index) => (
              <span
                key={index}
                className={activeIndex === index ? "active" : ""}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
        </div>
        <Container className="text-center">
              <h5 id="GmarketSans">{images[activeIndex].title}</h5>
              <p id="GmarketSans" >{images[activeIndex].subtitle}</p>
          <Button className="m-3 rounded-pill custom-btn-1">알아보기</Button>
          <Button className="m-3 rounded-pill custom-btn-2">구매하기</Button>
      </Container>
      </div>
    );
};

export default MainCarousel
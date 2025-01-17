import "./MainCarousel.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeftShort, ArrowRightShort } from "react-bootstrap-icons";
import { Container, Button } from "react-bootstrap";
// import { API_SERVER_HOST } from "../../api/qnaApi";
import { API_SERVER_HOST } from '../../serverEnv'
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";

const MainCarousel = ({ images, setTextMargin }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const intervalRef = useRef(null);
    const textContainerRef = useRef(null); //텍스트랑 이미지슬라이더 마진값
    const host = API_SERVER_HOST

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
      const updateHeight = () => {
        if (textContainerRef.current) {
          const textHeight = textContainerRef.current.offsetHeight;
          setTextMargin(textHeight); 
        }
      };
      window.addEventListener("resize", updateHeight);
      updateHeight();

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [startAutoSlide, setTextMargin]);

    const getClassName = (index) => {
      const diff = (index - activeIndex + images.length) % images.length;
      console.log("index: ", index, "activeIndex: ", activeIndex, "diff: ", diff);
      const classNames = ["prev-2", "prev-1", "active", "next-1", "next-2"];
      return classNames[diff] || "";
    };

    // 사진인덱스와 active 인덱스가 일치가 되지않아서 원인을 찾지못하고..강제로 할당..
    const rearrangedImages = [
      images[0], 
      ...images.slice(0, 1),
      ...images.slice(0) 
    ];
  
    return (
      // <div className="slider-container">
      //     <span className = "arrow-left-center" onClick={handleLeftArrowClick}/>
      //     <span className = "arrow-right-center" onClick={handleRightArrowClick}/>
      //     <span className="arrow-left" onClick={handleLeftArrowClick}>
      //       <ArrowLeftShort size={28} color="gray" />
      //     </span>
      //     <span className="arrow-right" onClick={handleRightArrowClick}>
      //       <ArrowRightShort size={28} color="gray" />
      //     </span>
      //     <div className="slider">
      //       {images.map((data, index) => 
      //         <div key={index} className={`slide ${getClassName(index)}`} >
      //           <img src={data.image} alt={`hexaceps_image_${index}`} />
      //         </div>
      //       )}
      //     </div>
      //     <div className="dots">
      //       {Array.from({ length: images.length }, (_, index) => (
      //         <span
      //           key={index}
      //           className={activeIndex === index ? "active" : ""}
      //           onClick={() => handleDotClick(index)}
      //         ></span>
      //       ))}
      //   </div>
      <div className="slider-container">
        <span className="arrow-left-center" onClick={handleLeftArrowClick}/>
        <span className="arrow-right-center" onClick={handleRightArrowClick}/>
        <span className="arrow-left" onClick={handleLeftArrowClick}><ArrowLeftShort size={28} color="gray" /></span>
        <span className="arrow-right" onClick={handleRightArrowClick}><ArrowRightShort size={28} color="gray" /></span>
        <div className="slider">
          {rearrangedImages.map((data, index) => 
            <div key={index} className={`slide ${getClassName(index)}`} >
              {/*
              <img src={data.image}  style={{ width: 'auto', height: '95%' }}  alt={`hexaceps_image_${index}`} />
              */}
            <img src={`${host}/api/product/view/${data.image}`}  style={{ width: 'auto', height: '95%' }}  alt={`hexaceps_image_${index}`} 
            />
            </div>  
            )}
          </div>
        <div className="dots">
          {Array.from({ length: images.length }, (_, index) => (
            <span
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => handleDotClick(index)} ></span>
          ))}
        </div>
        {/* <Container className="text-center">
          <h5 id="GmarketSans">{images[activeIndex].title}</h5>
          <p id="GmarketSans" >{images[activeIndex].subtitle}</p>
          <Button className="m-3 rounded-pill custom-btn-1">알아보기</Button>
          <Button className="m-3 rounded-pill custom-btn-2">구매하기</Button>
        </Container> */}
        <Container className="text-center carousel-text-container ">
          <h5 id="GmarketSans" className="carousel-title">{images[activeIndex].title}</h5>
          <p id="GmarketSans" className="carousel-subtitle">{images[activeIndex].subtitle}</p>
          {/* 모바일일떄 m-1, 그이상이면 m-md-3으로 적용 */}
          <Button className="m-md-3 m-1 rounded-pill custom-btn-1" onClick={() => navigate(`/products/read/${images[activeIndex].productId}`)}>알아보기</Button>
        {/*  <Button className="m-md-3 m-1 rounded-pill custom-btn-2">구매하기</Button> */}
        </Container>
      </div>
    );
};

export default MainCarousel
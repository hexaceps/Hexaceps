import React, { useRef, useState } from 'react';
import './ImageSlider.css'

const MainImageSlider = ({items}) => {

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 5; // 조정 가능한 속도 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const speed = 3;
    scrollRef.current.scrollLeft += e.deltaY * speed; // 휠 이동에 따라 스크롤
  };

  return (
    <>
        <div ref={scrollRef} className="horizontal-scroll"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel} >
            {items.map((images, idx) => (
              <img key={idx} src={images} alt={`이미지_${idx}`} className='scroll-image' />
            ))}
        </div>
    </>
  )
}

export default MainImageSlider
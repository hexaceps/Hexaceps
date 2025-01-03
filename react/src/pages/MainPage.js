import React, { useState } from 'react'
import ProductCarousel from '../components/common/ProductCarousel'
import MainCarousel from '../components/common/MainCarousel'
import MainImageSlider from '../components/common/MainImageSlider'
import { Container, Row } from 'react-bootstrap'


const MainPage = () => {



  const items = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    "/images/raw1.jpg","/images/raw2.jpg","/images/raw3.jpg",
    "/images/raw4.jpg","/images/raw5.jpg","/images/raw6.jpg",
    "/images/raw1.jpg","/images/raw2.jpg","/images/raw3.jpg",
    "/images/raw4.jpg","/images/raw5.jpg","/images/raw6.jpg"]

  const images = [ // 캐러셀 쪽 데이터 샘플
    { title: "NIKE x Scott First Edition", subtitle: "나이키 x 스캇 1ST 에디션", image: "./images/raw1.jpg" },
    { title: "NIKE x Scott Second Level", subtitle: "나이키 x 스캇 2nd 레벨", image: "./images/raw2.jpg" },
    { title: "NIKE x Scott 3rd Ultimate", subtitle: "나이키 x 스캇 3rd 에디션", image: "./images/raw3.jpg" },
    { title: "NIKE x Scott 4th NEW ARRIVAL", subtitle: "나이키 x 스캇 4번쨰 신상", image: "./images/raw4.jpg" },
    { title: "NIKE x Scott Low-Level", subtitle: "나이키 x 스캇 미드로우 에디션", image: "./images/raw5.jpg" },
    { title: "NIKE x Scott Low-Level", subtitle: "나이키 x 스캇 미드로우 에디션", image: "./images/raw6.jpg" },
    { title: "NIKE x Scott Low-Level", subtitle: "나이키 x 스캇 미드로우 에디션", image: "./images/raw3.jpg" },
    { title: "NIKE x Scott Low-Level", subtitle: "나이키 x 스캇 미드로우 에디션", image: "./images/raw5.jpg" },
  ]
  return (
    <>
      <Container fluid style={{height : "450px"}}>
        <MainCarousel images = {images} />
      </Container>
      <Container style={{marginTop : "40px"}}>
        <Row className='mt-5'>
          <h4 className='mt-5'>신상</h4>
          <MainImageSlider items = {items} />
        </Row>
        <Row className='mt-5'>
          <h4>브랜드</h4>
          <MainImageSlider items = {items} />
        </Row>
        <Row className='mt-5'>
          <h4>럭셔리</h4>
          <MainImageSlider items = {items} />
        </Row>
        <Row className='mt-5'>
          <h4>컬렉션</h4>
          <MainImageSlider items = {items} />
        </Row>
        <Row className='mt-5'>
          <h4>사이즈</h4>
          <MainImageSlider items = {items} />
        </Row>
        <Row className='mt-5'>
          <h4>가격대</h4>
          <MainImageSlider items = {items} />
        </Row>
      </Container>      
    </>
  )
}

export default MainPage
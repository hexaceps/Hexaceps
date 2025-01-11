import React, { useState } from 'react'
import ProductCarousel from '../components/common/ProductCarousel'
import MainCarousel from '../components/common/MainCarousel'
import MainImageSlider from '../components/common/MainImageSlider'
import { Container, Row } from 'react-bootstrap'


const MainPage = () => {
  const [textMargin, setTextMargin] = useState(0);

  const items1 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    "product_81_1.jpg","product_82_1.jpg","product_83_1.jpg",
   "product_84_1.jpg","product_85_1.jpg","product_86_1.jpg",
    "product_87_1.jpg","product_88_1.jpg","product_81_1.jpg",
    "product_82_1.jpg","product_83_1.jpg","product_84_1.jpg"]

  const items2 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    "product_89_1.jpg","product_90_1.jpg","product_91_1.jpg",
    "product_92_1.jpg","product_93_1.jpg","product_94_1.jpg",
    "product_95_1.jpg","product_96_1.jpg","product_89_1.jpg",
    "product_90_1.jpg","product_91_1.jpg","product_92_1.jpg"]    

  const items3 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    "product_97_1.jpg","product_98_1.jpg","product_99_1.jpg",
    "product_100_1.jpg","product_101_1.jpg","product_102_1.jpg",
    "product_103_1.jpg","product_104_1.jpg","product_97_1.jpg",
    "product_98_1.jpg","product_99_1.jpg","product_100_1.jpg"] 

  const items4 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    "product_105_1.jpg","product_106_1.jpg","product_107_1.jpg",
    "product_108_1.jpg","product_109_1.jpg","product_110_1.jpg",
    "product_111_1.jpg","product_112_1.jpg","product_105_1.jpg",
    "product_106_1.jpg","product_107_1.jpg","product_108_1.jpg"]    

  const items5 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    "product_113_1.jpg","product_114_1.jpg","product_115_1.jpg",
    "product_116_1.jpg","product_117_1.jpg","product_118_1.jpg",
    "product_119_1.jpg","product_120_1.jpg","product_113_1.jpg",
    "product_114_1.jpg","product_115_1.jpg","product_116_1.jpg"]     

  const items6 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    "product_121_1.jpg","product_122_1.jpg","product_123_1.jpg",
    "product_124_1.jpg","product_125_1.jpg","product_126_1.jpg",
    "product_127_1.jpg","product_128_1.jpg","product_121_1.jpg",
    "product_122_1.jpg","product_123_1.jpg","product_124_1.jpg"]      


  const images = [ // 캐러셀 쪽 데이터 샘플
    { title: "(W) Adidas Bermuda Preloved Brown", subtitle: "(W) 아디다스 버뮤다 프리러브 브라운", image: "product_81_1.jpg" },
    { title: "(W) Adidas Spezial Handball Aluminium Core Black", subtitle: "(W) 아디다스 스페지알 핸드볼 알루미늄 코어 블랙", image: "product_82_1.jpg" },
    { title: "(W) Adidas Gazelle Indoor Cloud White Light Blue Gum", subtitle: "(W) 아디다스 가젤 인도어 클라우드 화이트 라이트 블루 검", image: "product_83_1.jpg" },
    { title: "(W) Adidas Spezial Handball Wonder Silver Off White", subtitle: "(W) 아디다스 스페지알 핸드볼 원더 실버 오프 화이트", image: "product_84_1.jpg" },
    { title: "(W) Adidas Spezial Handball Cream White Wonder Beige", subtitle: "(W) 아디다스 스페지알 핸드볼 크림 화이트 원더 베이지", image: "product_85_1.jpg" },
    { title: "(W) Adidas Gazelle Indoor Blue Fusion Cloud White", subtitle: "(W) 아디다스 가젤 인도어 블루 퓨전 클라우드 화이트", image: "product_86_1.jpg" },
    { title: "(W) Adidas Gazelle Bold Pink Glow Victory Blue", subtitle: "(W) 아디다스 가젤 볼드 핑크 글로우 빅토리 블루", image: "product_87_1.jpg" },
    { title: "(W) Adidas VL Court Base Core Black Cloud White", subtitle: "(W) 아디다스 VL 코트 베이스 코어 블랙 클라우드 화이트", image: "product_88_1.jpg" },
  ]
  return (
    <>
      <Container fluid style={{height : "450px"}}>
        <MainCarousel images = {images} setTextMargin = {setTextMargin} />
      </Container>
      <Container style={{ marginTop: textMargin + '10px' }}>
        <Row className='mt-5'>
          <h4 className='mt-5'>신상</h4>
          <MainImageSlider items = {items1} textMargin = {textMargin} />
        </Row>
        <Row className='mt-5'>
          <h4>브랜드</h4>
          <MainImageSlider items = {items2} />
        </Row>
        <Row className='mt-5'>
          <h4>럭셔리</h4>
          <MainImageSlider items = {items3} />
        </Row>
        <Row className='mt-5'>
          <h4>컬렉션</h4>
          <MainImageSlider items = {items4} />
        </Row>
        <Row className='mt-5'>
          <h4>사이즈</h4>
          <MainImageSlider items = {items5} />
        </Row>
        <Row className='mt-5'>
          <h4>가격대</h4>
          <MainImageSlider items = {items6} />
        </Row>
      </Container>      
    </>
  )
}

export default MainPage
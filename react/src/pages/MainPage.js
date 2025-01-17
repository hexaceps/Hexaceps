import React, { useState } from 'react'
import ProductCarousel from '../components/common/ProductCarousel'
import MainCarousel from '../components/common/MainCarousel'
import MainImageSlider from '../components/common/MainImageSlider'
import { Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const MainPage = () => {
  const [textMargin, setTextMargin] = useState(0);
    const navigate = useNavigate();



  const items2 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
   {image : "product_7_1.jpg" , productId : 7},{image : "product_65_1.jpg" , productId : 65},
   {image : "product_127_1.jpg" , productId : 127},{image : "product_185_1.jpg" , productId : 185},
   {image : "product_247_1.jpg" , productId : 247},{image : "product_35_1.jpg" , productId : 35},
   {image : "product_96_1.jpg" , productId : 96},{image : "product_149_1.jpg" , productId : 149},
   {image : "product_212_1.jpg" , productId : 212},{image : "product_271_1.jpg" , productId : 271}
    ]    

  const items3 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    {image : "product_419_1.jpg" , productId : 419},{image : "product_420_1.jpg" , productId : 420},
    {image : "product_360_1.jpg" , productId : 360},{image : "product_440_1.jpg" , productId : 440},
    {image : "product_370_1.jpg" , productId : 370},{image : "product_460_1.jpg" , productId : 460},
    {image : "product_380_1.jpg" , productId : 380},{image : "product_480_1.jpg" , productId : 480},
    {image : "product_400_1.jpg" , productId : 400},{image : "product_500_1.jpg" , productId : 500}] 

  const items4 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    {image : "product_302_1.jpg" , productId : 302},{image : "product_308_1.jpg" , productId : 308},
    {image : "product_312_1.jpg" , productId : 312},{image : "product_318_1.jpg" , productId : 318},
    {image : "product_322_1.jpg" , productId : 322},{image : "product_328_1.jpg" , productId : 328},
    {image : "product_332_1.jpg" , productId : 332},{image : "product_338_1.jpg" , productId : 338},
    {image : "product_342_1.jpg" , productId : 342},{image : "product_344_1.jpg" , productId : 344}]    

  const items5 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    {image : "product_27_1.jpg" , productId : 27},{image : "product_95_1.jpg" , productId : 95},
    {image : "product_174_1.jpg" , productId : 174},{image : "product_192_1.jpg" , productId : 194},
    {image : "product_277_1.jpg" , productId : 277},{image : "product_95_1.jpg" , productId : 95},
    {image : "product_76_1.jpg" , productId : 76},{image : "product_196_1.jpg" , productId : 196},
    {image : "product_272_1.jpg" , productId : 272},{image : "product_291_1.jpg" , productId : 291}]     

  const items6 = [ // 카테고리별 이미지 좌우 슬라이드 샘플
    {image : "product_7_1.jpg" , productId : 7},{image : "product_45_1.jpg" , productId : 45},
    {image : "product_137_1.jpg" , productId : 137},{image : "product_134_1.jpg" , productId : 134},
    {image : "product_237_1.jpg" , productId : 237},{image : "product_135_1.jpg" , productId : 135},
    {image : "product_196_1.jpg" , productId : 196},{image : "product_139_1.jpg" , productId : 139},
    {image : "product_232_1.jpg" , productId : 232},{image : "product_231_1.jpg" , productId : 231}]      


  const images = [ // 캐러셀 쪽 데이터 샘플
    { title: "Nike x Peaceminusone Air Force 1 Low Para-Noise 3.0 Black and Multicolor", subtitle: "나이키 x 피스마이너스원 에어포스 1 로우 파라노이즈 3.0 블랙 앤 멀티컬러", image: "product_4_1.jpg", productId: 4 },
    { title: "(W) Nike Zoom Vomero 5 Pale Ivory Sanddrift", subtitle: "(W) 나이키 줌 보메로 5 페일 아이보리 샌드드리프트", image: "product_61_1.jpg" , productId: 61 },
    { title: "Adidas Yeezy Foam RNNR Onyx", subtitle: "아디다스 이지 폼 러너 오닉스", image: "product_121_1.jpg" , productId: 121 },
    { title: "Jordan 1 x Travis Scott Retro Low OG SP Reverse Olive", subtitle: "조던 1 x 트래비스 스캇 레트로 로우 OG SP 리버스 올리브", image: "product_185_1.jpg", productId: 185 },
    { title: "(W) Jordan 1 Retro High Satin Red", subtitle: "(W) 조던 1 레트로 하이 사틴 레드", image: "product_241_1.jpg" , productId: 241},
    { title: "(W) New Balance 574 Light Pink Angora", subtitle: "(W) 뉴발란스 574 라이트 핑크 앙고라", image: "product_301_1.jpg" , productId: 301},
    { title: "Dior Sahara Chukka Boot Dior Oblique Embroidered Wool Felt Gray", subtitle: "디올 사하라 츄카 부츠 디올 오블리크 자수 울 펠트 그레이", image: "product_361_1.jpg" , productId: 361},
    { title: "(W) Hermes Bouncing Sneakers Chevron Denim Suede Goatskin & Bleu Clair Blanc", subtitle: "(W) 에르메스 바운싱 스니커즈 쉐브론 데님 스웨이드 고트스킨 & 블루 클레어 블랑", image: "product_421_1.jpg" , productId: 421},
  ]
  
  return (
    <>
      <Container fluid style={{height : "450px", fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244" }}>
        <MainCarousel images = {images} setTextMargin = {setTextMargin} />
      </Container>
      <Container style={{ marginTop: textMargin + '10px', fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244" }} >
        <Row className='mt-5'>
        <h4 onClick={() => navigate(`/products/brand`)} style={{ cursor: 'pointer' }}>BRAND</h4>
          <MainImageSlider items = {items2} textMargin = {textMargin} />
        </Row>
        <Row className='mt-5'>
        <h4 onClick={() => navigate(`/products/luxary`)} style={{ cursor: 'pointer' }}>LUXURY</h4>
          <MainImageSlider items = {items3} />
        </Row>
        <Row className='mt-5'>
        <h4 onClick={() => navigate(`/products/collection`)} style={{ cursor: 'pointer' }}>SEASON</h4>
          <MainImageSlider items = {items4} />
        </Row>
        <Row className='mt-5'>
        <h4 onClick={() => navigate(`/products/size`)} style={{ cursor: 'pointer' }}>SIZE</h4>
          <MainImageSlider items = {items5} />
        </Row>
        <Row className='mt-5'>
        <h4 onClick={() => navigate(`/products/price`)} style={{ cursor: 'pointer' }}>PRICE</h4>
          <MainImageSlider items = {items6} />
        </Row>
      </Container>      
    </>
  )
}

export default MainPage
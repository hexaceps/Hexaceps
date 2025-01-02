import React, { useState } from 'react'
import '../../App.css'
import { Button } from 'react-bootstrap'

const ProductCarousel = ({ items, initialActive=0 }) => {
  const [active, setActive] = useState(initialActive)
  const [direction, setDirection] = useState("")
  const moveLeft = () => {
    setActive((prevActive) => {
        const newActive = prevActive - 1
        return newActive < 0 ? items.length - 1 : newActive
    })
    setDirection("left")
  }

  const moveRight = () => {
    setActive((prevActive) => (prevActive + 1) % items.length)
    setDirection("right")
  }

  const generateItem = () => {
    const itemElements = []
    for (let i = active - 2; i < active + 3; i++) {
        const index = (i + items.length) % items.length // 순환 인덱스
        const level = active - i
        itemElements.push(<Item key = {index} id = {items[index]} level = {level} />)
    }
    return itemElements
  }
  return (
    <>
        <div className='d-flex justify-content-center'>
            <div id="carousel" className='noselect'>
                <div className='arrow arrow-left' onClick={ moveLeft }>
                    <i className='fl-arrow-left'></i>
                </div>
                <div className= {`transition-group ${direction}`}>
                    { generateItem() }
                </div>
                <div className='arrow arrow-right' onClick={ moveRight }>
                    <i className='fl-arrow-right'></i>
                </div>
            </div>
        </div>
        <div className='text-center mt-5'>
            <p><h4>타이틀</h4></p>
            <p><h5>부제</h5></p>
            <p><Button variant='secondary me-1'>상세보기</Button><Button variant='light ms-1'>구매하기</Button></p>
        </div>
    </>
  )
}

const Item = ({ id, level }) => {
    const className = `item level${level}`
    return (
        <div className={className}>
            <img src={id} alt='신상이미지' className='carousel-image'/>
        </div>)
}

export default ProductCarousel
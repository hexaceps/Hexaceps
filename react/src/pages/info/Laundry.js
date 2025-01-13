import React from 'react'
import styled from 'styled-components'

const Laundry = () => {
  return (
    <>
    <div>
        <h3 className="text-center">운동화 세탁</h3>
    </div>
    <Line></Line>
    </>
  )
}

const Line = styled.div`
 height: 4px; /* 선 두께 */
  background-color: black; /* 선 색상 */
  width: 100%; /* 선 길이 */
  margin: 25px 0; /* 위아래 여백 */
  `

export default Laundry
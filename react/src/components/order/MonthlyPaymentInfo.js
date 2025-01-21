import React from 'react'
import { Table, Image } from 'react-bootstrap';


const MonthlyPaymentInfo = () => {
  return (
    <>
        <Table borderless hover size="sm">
            <tbody>
                <tr>
                    <td ><Image src="/images/bank/sinhan.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3개월 (5만원 이상) <br />
                        7,8,9,10,11,12개월 (100만원 이상) <br />
                        </span>
                    </td>
                    <td className='ps-3' ><Image src="/images/bank/kbbank.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3개월 (5만원 이상) <br />
                        7,8,9,10,11,12개월 (100만원 이상) <br />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><Image src="/images/bank/suhyub.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3,4개월 (5만원 이상)
                        </span>
                    </td>
                    <td className='ps-3' ><Image src="/images/bank/woori.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3,4개월 (5만원 이상)
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><Image src="/images/bank/citi.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3개월 (1만원 이상)
                        </span>
                    </td>
                    <td className='ps-3' ><Image src="/images/bank/mgbank.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3개월 (5만원 이상) <br />
                        7,8,9,10,11,12개월 (100만원 이상) <br />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><Image src="/images/bank/hana.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3개월 (5만원 이상)
                        </span>
                    </td>
                    <td className='ps-3' ><Image src="/images/bank/ibk.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3개월 (5만원 이상)
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><Image src="/images/bank/bnk.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3,4,5개월 (5만원 이상) <br />
                        6,7,8,9,10,11,12개월 (100만원 이상) <br />
                        </span>
                    </td>
                    <td className='ps-3' ><Image src="/images/bank/kjbank.png" fluid rounded /></td>
                    <td className='ps-3' style={{fontSize : "0.8rem", width : "35%"}}>
                        <span>
                        2,3,4,5,6개월 (5만원 이상)
                        </span>
                    </td> 
                </tr>
            </tbody>
        </Table>
    
    </>
  )
}

export default MonthlyPaymentInfo
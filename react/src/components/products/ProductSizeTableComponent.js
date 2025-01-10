import React from 'react'
import { Table } from 'react-bootstrap'

const ProductSizeTable = () => {
  return (
    <Table striped bordered variant='light' className='text-center'>
      <thead>
        <tr>
          <td>KR</td>
          <td>230</td>
          <td>240</td>
          <td>250</td>
          <td>260</td>
          <td>270</td>
          <td>280</td>
          <td>290</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>US (M)</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
          <td>10</td>
          <td>11</td>
        </tr>
        <tr>
          <td>US (W)</td>
          <td>7.5</td>
          <td>8.5</td>
          <td>9.5</td>
          <td>10.5</td>
          <td>11.5</td>
          <td>12.5</td>
          <td>13.5</td>
        </tr>
        <tr>
          <td>UK</td>
          <td>5.5</td>
          <td>6.5</td>
          <td>7.5</td>
          <td>8.5</td>
          <td>9.5</td>
          <td>10.5</td>
          <td>11.5</td>
        </tr>
        <tr>
          <td>JP</td>
          <td>24</td>
          <td>25</td>
          <td>26</td>
          <td>27</td>
          <td>28</td>
          <td>29</td>
          <td>30</td>
        </tr>
        <tr>
          <td>EU</td>
          <td>38.5</td>
          <td>39.5</td>
          <td>40.5</td>
          <td>41.5</td>
          <td>42.5</td>
          <td>43.5</td>
          <td>44.5</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default ProductSizeTable
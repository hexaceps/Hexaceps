import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchApi } from '../../api/productsApi';
import { Card, Col, Row } from 'react-bootstrap';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import useCustomMove from '../../hooks/useCustomMove';
import { API_SERVER_HOST } from '../../serverEnv'


const Search = () => {
  const [searchResults, setSearchResults] = useState({ dtoList: [] });
  const {page, size, moveToList, refresh, moveToRead} = useCustomMove()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const defaultImage = "/images/default.png"

  

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchApi(query)
        .then((results) => {
          console.log("결과", results);
          setSearchResults(results); // 'results'에는 dtoList가 포함되어 있음
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <div>

        
        {searchResults.dtoList && searchResults.dtoList.length > 0 ? (
                 <Row>
            {searchResults.dtoList.map((product, index) => (
             <Col className='ms-5' md={3} key={index} >
             <Card className='mb-5 '>
               <div className='image-wrapper mx-auto my-3' onClick={() => moveToRead(product.productId)}>
                 <Card.Img variant="top " style={{ width: '100%' , height:'100%'}} 
                           src={`${API_SERVER_HOST}/api/product/view/${product.uploadFileNames[0]}`}  onError={(e) => e.target.src = defaultImage} />
                 <div className="caption">상품바로가기</div>
               </div>
               <Card.Body className='ms-3'>
                 <Row>
                   <Col>
                     <Card.Text className='fs-5 fw-bold'>{product.productBrand}</Card.Text>
                   </Col>
                   <Col>
                   
                   </Col>
                 </Row>
                 <Card.Title className='mt-2 fs-6'>{product.productName}</Card.Title>
                 {/* <Card.Text>No : {product.productId}</Card.Text> */}
                 {/* <Card.Text>카테고리 : {product.category}</Card.Text> */}
                 {/* <Card.Text>사이즈 : {product.productSize}</Card.Text> */}
                 <Card.Text>
                   <Row className='mt-3'>
                     <Col>
                       { product.productName.length % 2 === 1 ? 
                       <img style={{ width : "4rem"}} src='/images/quick.png' alt='빠른배송' /> : <></> }
                     </Col>
                     <Col className='me-3 text-end'>{product.price.toLocaleString()} 원<br/><span className='text-secondary' style={{fontSize : "0.8rem"}}>즉시구매가</span></Col>
                   </Row>  
                 </Card.Text>
                 {/* <Button variant="outline-info" onClick={() => moveToRead(product.productId)}>상품상세보기</Button> */}
               </Card.Body>
             </Card> 
           </Col>
         ))}
          </Row>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;

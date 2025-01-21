import React, { useEffect, useState } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { productGetOne } from '../../api/productsApi';
import { API_SERVER_HOST } from '../../serverEnv';

const initState = {
  productId: 0,
  pname: '',
  pdesc: '',
  price: 0,
  delFlag: false,
  uploadFileNames: []
};

const ProductSubdesc = ({ productId }) => {
  const [product, setProduct] = useState(initState);
  const host = API_SERVER_HOST;

  useEffect(() => {
    productGetOne(productId).then((data) => {
      console.log(data);
      setProduct(data);
    });
  }, [productId]);

  return (
    <>
      <Container fluid>
        <p>상세이미지보기</p>
        <Row className="flex-column">
          {product.uploadFileNames.map((ImgFile, i) => (
            <Col key={i}>
              <Image
                src={`${host}/api/product/view/${ImgFile}`}
                fluid
                alt={`Product Image ${i + 1}`}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductSubdesc;

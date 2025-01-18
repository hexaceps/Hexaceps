import axios from 'axios'
import jwtAxios from "../util/jwtUtil";
// import { API_SERVER_HOST } from './qnaApi'
import { API_SERVER_HOST } from '../serverEnv'

const host = `${API_SERVER_HOST}/api/product`

// 상품추가
export const productPostAdd = async(product) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await axios.post(`${host}/`, product, header)
    return res.data
}

//list
//http://localhost:8080/api/product/list?page=3
export const productGetList = async(pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${host}/list`, {params : {page:page, size:size}})
    return res.data
}

export const getListFilter = async ( pageParam, category, productBrand, productSize, minPrice, maxPrice, sortBy, sortOrder ) => {
    const { page, size: pageSize } = pageParam;  
    const params = {
      page,
      size: pageSize,
      category: category || null,   
      productBrand: productBrand || null,      
      productSize: productSize || null,      
      minPrice: minPrice || null,   
      maxPrice: maxPrice || null,
      sortBy : sortBy || null,
      sortOrder : sortOrder || null
    }
    const res = await axios.get(`${host}/list`, { params });
    return res.data; 
  };

//특정번호의 product조회
//http://localhost:8080/api/product/50
export const productGetOne = async(productId) => {
    const res = await axios.get(`${host}/${productId}`)
    return res.data
}

//수정 put  /pno
export const productPutOne = async(pno, product) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await axios.put(`${host}/${pno}`, product,header)
    return res.data
}

//삭제  delete  /product
export const productDeleteOne = async(pno) => {
    const res = await axios.delete(`${host}/${pno}`)
    return res.data
}


export const searchApi = async (pageParam, query,sortBy, sortOrder ) => {
  const { page, size: pageSize } = pageParam;  
  const params = {
    page,
    size: pageSize,
    keyword: query || null,   
    sortBy : sortBy || null,
    sortOrder : sortOrder || null
  }
    try {
      const res = await axios.get(`${host}/search`, {
        params
      });
      return res.data; 
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  };
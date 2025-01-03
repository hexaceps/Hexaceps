import axios from 'axios'
import { API_SERVER_HOST } from './qnaApi'

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

export const getListFilter = async(pageParam,category) => {
    const {page, size} = pageParam
    const res = await axios.get(`${host}/list/${category}`, {params : {page:page, size:size}})
    return res.data
}



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
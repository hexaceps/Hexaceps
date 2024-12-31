package com.example.hexaqna.service;

import com.example.hexaqna.domain.Product;
import com.example.hexaqna.domain.ProductImage;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.ProductDTO;
import com.example.hexaqna.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    @Override
    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {

//        페이지목록 만들기
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending()
        );

//        리포지터리에가서 목록가져온다(상품에 대표이미지하나 가져온다)
        Page<Object[]> result = productRepository.selectList(pageable);

        //0번째는 product이고 1번째는 productImage이다
        List<ProductDTO> dtoList = result.get().map(arr -> {
            Product product = (Product) arr[0];
            ProductImage productImage = (ProductImage) arr[1];
            ProductDTO productDTO = ProductDTO.builder()
                    .pno(product.getPno())
                    .product_name(product.getProduct_name())
                    .product_brand(product.getProduct_brand())
                    .product_desc(product.getProduct_desc())
                    .product_stock(product.isProduct_stock())
                    .product_date(product.getProduct_date())
                    .build();
            String imageFileName = productImage.getFileName();
            productDTO.setUploadFileNames(List.of(imageFileName));
            return productDTO;
        }).toList();
        long totalCount = result.getTotalElements();
        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }


    @Override
    public Long register(ProductDTO productDTO) {
        //추가하는 기능을 만든다
        Product product = dtoToEntity(productDTO);
        //저장하기전 확인
        log.info("새로운 상품 : {}", product);
        log.info("새로운 상품의 이미지이름 : {}", product.getImageList());
        Long pno = productRepository.save(product).getPno();
        return pno;
    }


    @Override
    public ProductDTO get(Long pno) {
        Optional<Product> result = productRepository.selectOne(pno);
        Product product = result.orElseThrow();
        ProductDTO productDTO = entityToDTO(product);
        return productDTO;
    }

    @Override
    public void modify(ProductDTO productDTO) {
        //1개의 상품을 찾아온다
        Optional<Product> result = productRepository.selectOne(productDTO.getPno());

        Product product = result.orElseThrow();

        //새로 들어온 내용으로 수정한다.
        product.setProduct_name(productDTO.getProduct_name());
        product.setProduct_brand(productDTO.getProduct_brand());
        product.setProduct_desc(productDTO.getProduct_desc());
        product.setProduct_stock(productDTO.isProduct_stock());

        //무조건 지운다(파일네임)
        product.clearList();

        //입력된 이미지파일 이름을 가져온다
        List<String> uploadFileNames = productDTO.getUploadFileNames();

        //파일이름 업로드
        if(uploadFileNames != null && !uploadFileNames.isEmpty()){
            uploadFileNames.stream().forEach(uploadName -> {
                product.addImageString(uploadName);
            });
        }
        //저장
        productRepository.save(product);
    }


    @Override
    public void remove(Long pno) {
        productRepository.deleteById(pno);
    }



    //dto를 받아서 entity로 변환하는 코드, dtoToEntity
    private Product dtoToEntity(ProductDTO productDTO){
        Product product = Product.builder()
                .pno(productDTO.getPno())
                .product_name(productDTO.getProduct_name())
                .product_brand(productDTO.getProduct_brand())
                .product_desc(productDTO.getProduct_desc())
                .product_stock(productDTO.isProduct_stock())
                .product_date(LocalDateTime.now())
                .build();

        //업로드 처리가 끝난 파일들의 이름 리스트
        List<String> uploadFileNames = productDTO.getUploadFileNames();

        if(uploadFileNames == null || uploadFileNames.isEmpty()) {
            return product;
        }

        uploadFileNames.stream().forEach(uploadName -> {
            product.addImageString(uploadName);
        });

        return product;
    }


    //엔티티를 DTO로 변환, entityToDTO
    private ProductDTO entityToDTO(Product product) {
        ProductDTO productDTO = ProductDTO.builder()
                .pno(product.getPno())
                .product_name(product.getProduct_name())
                .product_brand(product.getProduct_brand())
                .product_desc(product.getProduct_desc())
                .product_stock(product.isProduct_stock())
                .product_date(product.getProduct_date())
                .build();

        List<ProductImage> imageList = product.getImageList();

        if(imageList == null || imageList.isEmpty()) {
            return productDTO;
        }

        List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();

        productDTO.setUploadFileNames(fileNameList);

        return productDTO;
    }
}

package com.example.hexaqna.service;

import com.example.hexaqna.domain.Product;
import com.example.hexaqna.domain.ProductImage;
import com.example.hexaqna.domain.ProductSiteLink;
import com.example.hexaqna.domain.Qna;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.ProductDTO;
import com.example.hexaqna.dto.QnaDTO;
import com.example.hexaqna.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public PageResponseDTO<ProductDTO> getProductList(PageRequestDTO pageRequestDTO) {
        // 페이지목록 만들기
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("productId").descending()
        );
        log.info("getProductList() 페이지 목록 만들기 롸져 1111111111111111111111111");

        // 리포지터리에가서 목록가져온다(상품에 대표이미지하나 가져온다)
        Page<Object[]> result = productRepository.findBySelectImageAndSiteList(pageable); // selectList(pageable);
        log.info("getProductList() 대표 이미지랑 사이트 링크 가져와라 오바!!!!222222222222222");

        // 0번째는 product이고 1번째는 productImage이다
        List<ProductDTO> dtoList = result.get().map(arr -> {
            Product product = (Product) arr[0];
            ProductImage productImage = (ProductImage) arr[1];
            ProductSiteLink productSiteLink = (ProductSiteLink) arr[2];
            ProductDTO productDTO = ProductDTO.builder()
                    .productId(product.getProductId())
                    .category(product.getCategory())
                    .productName(product.getProductName())
                    .productBrand(product.getProductBrand())
                    .productDescription(product.getProductDescription())
                    .productStock(product.getProductStock())
                    .registeredAt(product.getRegisteredAt())
                    .size(product.getSize())
                    .price(product.getPrice())
                    .build();
            List<String> uploadFileNames = productImage != null ? List.of(productImage.getFileName()) : new ArrayList<>();
            productDTO.setUploadFileNames(uploadFileNames);
            List<String> productSiteNames = productSiteLink != null ? List.of(productSiteLink.getSiteLink()) : new ArrayList<>();
            productDTO.setProductSiteNames(productSiteNames);

            return productDTO;
        }).toList();
        log.info("getProductList()     맵돌려서 응답결과 만들었다 오바... 33333333");
        long totalCount = result.getTotalElements();
        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    @Override
    public PageResponseDTO<ProductDTO> getProductFiterList(PageRequestDTO pageRequestDTO, String category) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("productId").descending()
        );

        // 리포지터리에가서 목록가져온다(상품에 대표이미지하나 가져온다)
        Page<Object[]> result = productRepository.selectFilter(category,pageable);

        // 0번째는 product이고 1번째는 productImage이다
        List<ProductDTO> dtoList = result.get().map(arr -> {
            Product product = (Product) arr[0];
            ProductImage productImage = (ProductImage) arr[1];
            ProductDTO productDTO = ProductDTO.builder()
                    .productId(product.getProductId())
                    .category(product.getCategory())
                    .productName(product.getProductName())
                    .productBrand(product.getProductBrand())
                    .productDescription(product.getProductDescription())
                    .productStock(product.getProductStock())
                    .registeredAt(product.getRegisteredAt())
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
    public Long registerNewProduct(ProductDTO productDTO) {
        //추가하는 기능을 만든다
        Product product = dtoToEntity(productDTO);
        //저장하기전 확인
        log.info("새로운 상품 : {}", product);
        log.info("새로운 상품의 이미지이름 : {}", product.getImageList());
        Long pno = productRepository.save(product).getProductId();
        return pno;
    }

    @Override
    @Transactional
    public Long addNewProduct(ProductDTO productDTO) {
        Product product = mapToEntity(productDTO);
        product.setRegisteredAt(LocalDate.now()); // 현재 날짜 저장 추가
        log.info("서비스로직에서의 product(저장전) {}", product);
        Long productId = productRepository.save(product).getProductId();
        return productId;
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        Optional<Product> result = productRepository.selectOne(productId);
        Product product = result.orElseThrow();
        ProductDTO productDTO = entityToDTO(product);
        return productDTO;
    }

    @Override
    public void modify(ProductDTO productDTO) {
        //1개의 상품을 찾아온다
        Optional<Product> result = productRepository.selectOne(productDTO.getProductId());

        Product product = result.orElseThrow();

        //새로 들어온 내용으로 수정한다.
        product.setProductName(productDTO.getProductName());
        product.setProductBrand(productDTO.getProductBrand());
        product.setProductDescription(productDTO.getProductDescription());
        product.setProductStock(productDTO.getProductStock());

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
    public void remove(Long productId) {
        productRepository.deleteById(productId);
    }

    //dto를 받아서 entity로 변환하는 코드, dtoToEntity
    private Product dtoToEntity(ProductDTO productDTO){
        Product product = Product.builder()
                .productId(productDTO.getProductId())
                .productName(productDTO.getProductName())
                .productBrand(productDTO.getProductBrand())
                .productDescription(productDTO.getProductDescription())
                .productStock(productDTO.getProductStock())
                .price(productDTO.getPrice())
                .size(productDTO.getSize())
                // .registeredAt(LocalDate.now())
                // .updatedAt(productDTO.getUpdatedAt())
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
                .productId(product.getProductId())
                .productName(product.getProductName())
                .productBrand(product.getProductBrand())
                .category(product.getCategory())
                .productDescription(product.getProductDescription())
                .productStock(product.getProductStock())
                .registeredAt(product.getRegisteredAt())
                .price(product.getPrice())
                .build();

        List<ProductImage> imageList = product.getImageList();
        if(imageList == null || imageList.isEmpty()) {
            return productDTO;
        }
        List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
        productDTO.setUploadFileNames(fileNameList);

        List<ProductSiteLink> siteList = product.getSiteList();
        if (siteList == null || siteList.isEmpty()) {
            return productDTO;
        }
        List<String> siteNameList = siteList.stream().map(productSiteLink -> productSiteLink.getSiteLink()).toList();
        productDTO.setProductSiteNames(siteNameList);

        return productDTO;
    }

    // getProductById() 상품을 productId로 조회 시 Entity 정보를 DTO 로 변환
    private ProductDTO mapToDTO(Product product) {
        ProductDTO productDTO = ProductDTO.builder()
                .productId(product.getProductId())
                .productName(product.getProductName())
                .productDescription(product.getProductDescription())
                .productBrand(product.getProductBrand())
                .price(product.getPrice())
                .productStock(product.getProductStock())
                .category(product.getCategory())
                .size(product.getSize())
                .registeredAt(product.getRegisteredAt())
                .updatedAt(product.getUpdatedAt())
                .build();
        // Image 정보들을 uploadFileNames의 List로 가지고 와서 DTO에 SET
        List<ProductImage> productImagesList = product.getImageList();
        if (productImagesList != null) {
            List<String> imageFileNames = productImagesList.stream()
                    .map(ProductImage::getFileName)
                    .collect(Collectors.toList());
            productDTO.setUploadFileNames(imageFileNames);
        }
        // 판매 Site 정보들을 siteNameList의 List로 가지고 와서 DTO에 SET
        List<ProductSiteLink> siteList = product.getSiteList();
        if (siteList != null) {
            List<String> siteNameList = siteList.stream()
                    .map(ProductSiteLink::getSiteLink)
                    .collect(Collectors.toList());
            productDTO.setProductSiteNames(siteNameList);
        }
        return productDTO;
    }

    // addNewProduct() 상품 저장시에 DTO 정보를 Entity 로 변환
    private Product mapToEntity(ProductDTO productDTO) {
        Product product = Product.builder()
                .productId(productDTO.getProductId())
                .productName(productDTO.getProductName())
                .productDescription(productDTO.getProductDescription())
                .productBrand(productDTO.getProductBrand())
                .price(productDTO.getPrice())
                .productStock(productDTO.getProductStock())
                .category(productDTO.getCategory())
                .size(productDTO.getSize())
                // .registeredAt(LocalDate.now())
                // .updatedAt(LocalDate.now()) 수정할떄, set으로 처리
                .build();
        // 이미지 리스트 추가
        List<String> uploadFileNames = productDTO.getUploadFileNames();
        if (uploadFileNames != null && !uploadFileNames.isEmpty()) {
            for (String fileName : uploadFileNames) {
                product.addImageString(fileName);
            }
        }
        // 사이트 링크 리스트 추가
        List<String> productSiteNames = productDTO.getProductSiteNames();
        if (productSiteNames != null && !productSiteNames.isEmpty()) {
            for (int i = 0; i < productSiteNames.size(); i++) {
                product.addSiteLink(productSiteNames.get(i), i);
            }
        }
        return product;
    }
}

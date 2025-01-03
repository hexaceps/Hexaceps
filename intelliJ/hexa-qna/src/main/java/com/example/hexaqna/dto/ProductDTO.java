package com.example.hexaqna.dto;

import com.example.hexaqna.domain.ProductImage;
import com.example.hexaqna.domain.ProductImageURL;
import com.example.hexaqna.domain.ProductOption;
import jakarta.persistence.ElementCollection;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long productId;
    private String category;
    private String productName;
    private int price;
    private String productBrand;
    private int productStock;
    private String productDescription;
    private LocalDate registeredAt;
    private LocalDate updatedAt;
    private int size;

    // 실제 파일을 업로드할 MultipartFile 리스트
    private List<MultipartFile> files = new ArrayList<>();
    // 업로드된 파일들의 이름만 저장하는 String 리스트
    private List<String> uploadFileNames = new ArrayList<>();
    // ProductSite에 넣을 내용을 리스트 형태로 DTO에서 생성
    private List<String> productSiteNames = new ArrayList<>();
}

/*
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private  Long pno;

    private String product_name;

    private String product_brand;

    private boolean product_stock;

    private String product_desc;

    private LocalDateTime product_date;

    //데이터베이스에 실제로 보내지는 파일데이터, 실제업로드
    private List<MultipartFile> files = new ArrayList<>();

    //업로드가 완료된 파일의 이름만 문자열을 보관하는 리스트, 조회용
    private List<String> uploadFileNames = new ArrayList<>();

    private List<ProductOption> product_list = new ArrayList<>();

    private List<ProductImage> imageList = new ArrayList<>();

    private List<ProductImageURL> imageURLList = new ArrayList<>();
}
 */

package com.example.hexaqna.dto;

import com.example.hexaqna.domain.Product;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
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
    private int productSize;

    // 실제 파일을 업로드할 MultipartFile 리스트
    private List<MultipartFile> files = new ArrayList<>();
    // 업로드된 파일들의 이름만 저장하는 String 리스트
    private List<String> uploadFileNames = new ArrayList<>();
    // ProductSite에 넣을 내용을 리스트 형태로 DTO에서 생성
    private List<String> productSiteNames = new ArrayList<>();


    private List<ProductSiteDTO> productSiteDetails = new ArrayList<>();

}
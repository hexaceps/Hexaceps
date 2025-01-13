package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="productId")
    private Long productId;

    private String productName;

    private int price;

    private String productBrand;

    private String category; // 신상, 브랜드, 럭셔리, 컬렉션...

    private int productStock;

    @Column(columnDefinition = "TEXT")
    private String productDescription;

    private LocalDate registeredAt;

    private LocalDate updatedAt;

    private int productSize;

    // orphanRemoval : product 객체정보 삭제시 자식 테이블 내용도 삭제
    // CascadeType.ALL 모든 테이블 관계에 post, put, delete, get 가능한 JPA
    // @ElementCollection // 사용 변경
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default // ProductImage 테이블 생성
    @JsonManagedReference("product-image")
    private List<ProductImage> imageList = new ArrayList<>();

    // @ElementCollection // 사용 변경
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default // ProductSite 테이블 생성// Unique reference name
    @JsonManagedReference("product-site")
    private List<ProductSiteLink> siteList = new ArrayList<>();

    @OneToMany(mappedBy = "productId", cascade = CascadeType.ALL)
    @JsonManagedReference("product-qna")
    private List<Qna> qnaList = new ArrayList<>();

    /*
        1. addImage() : 상품의 이미지를 리스트 형태로 저장
        - 이미지 리스트에 갯수에 따라 추가 되는 이미지의 순번을 지정
        - 만일 리스트에 2개의 이미지가 있으면 size(2)를 반환
        2. addImageString() : 파일이름을 기준으로 상품에 이미지를 addImage()에 추가
        3. 파일이름 삭제 (상품 이미지 name)
     */
    public void addImage(ProductImage image) {
        image.setOrd(this.imageList.size());
        image.setProduct(this);
        this.imageList.add(image);
    }
    public void addImageString(String fileName) {
        ProductImage image = ProductImage.builder()
                .fileName(fileName)
                .build();
        addImage(image);
    }
    public void clearImageList() {
        this.imageList.clear();
    }

    /*
        1. addImportSite() : 중계 사이트 이름, URL을 리스트에 추가
        2. addImportLink() : 각 중계 사이트의 상품 링크를 addImportSite()에 추가
        3. 내용 삭제 (importList 클리어)
     */
    public void addProductSite(ProductSiteLink productSite) {
        productSite.setSiteOrd(this.siteList.size());
        productSite.setProduct(this);
        this.siteList.add(productSite);
    }
    public void addSiteLink(String siteLink, int orderNum) {
        ProductSiteLink productSite = ProductSiteLink.builder()
                .siteLink(siteLink)
                .siteOrd(orderNum)
                .build();
        addProductSite(productSite);
    }

    public void addSiteLinkTest(String siteLink, int orderNum,int sitePrice) {
        ProductSiteLink productSite = ProductSiteLink.builder()
                .siteLink(siteLink)
                .siteOrd(orderNum)
                .sitePrice(sitePrice)
                .build();
        addProductSite(productSite);
    }


    //상품삭제
    public void clearList(){
        this.imageList.clear();
    }
    public void clearSiteList() {
        this.siteList.clear();
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setProductBrand(String productBrand) {
        this.productBrand = productBrand;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setProductStock(int productStock) {
        this.productStock = productStock;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public void setRegisteredAt(LocalDate registeredAt) {
        this.registeredAt = registeredAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setProductSize(int productSize) {
        this.productSize = productSize;
    }
}
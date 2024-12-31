package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.mapping.Array;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@ToString (exclude = {"imageList", "siteList"})
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

    private String category;

    private int productStock;

    @Column(columnDefinition = "TEXT")
    private String productDescription;

    private LocalDate registeredAt;

    private LocalDate updatedAt;

    private String size;

    @OneToMany(mappedBy = "productId", cascade = CascadeType.ALL)
    @JsonManagedReference("productReference") // Unique reference name
    private List<Qna> qnaList;


    @ElementCollection
    @Builder.Default // ProductImage 테이블 생성
    private List<ProductImage> imageList = new ArrayList<>();

    @ElementCollection
    @Builder.Default // ProductSite 테이블 생성
    private List<ProductSiteLink> siteList = new ArrayList<>();

    @OneToMany(mappedBy = "productId", cascade = CascadeType.ALL)
    @JsonManagedReference("productReference") // Unique reference name
    private List<Qna> qnaList;

    /*
        1. addImage() : 상품의 이미지를 리스트 형태로 저장
        - 이미지 리스트에 갯수에 따라 추가 되는 이미지의 순번을 지정
        - 만일 리스트에 2개의 이미지가 있으면 size(2)를 반환
        2. addImageString() : 파일이름을 기준으로 상품에 이미지를 addImage()에 추가
        3. 파일이름 삭제 (상품 이미지 name)
     */
    public void addImage(ProductImage image) {
        image.setOrd(this.imageList.size());
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
        this.siteList.add(productSite);
    }
    public void addSiteLink(String siteLink, int orderNum) {
        ProductSiteLink productSite = ProductSiteLink.builder()
                .siteLink(siteLink)
                .siteOrd(orderNum)
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

    public void setSize(String size) {
        this.size = size;
    }
}

/*
@Entity
@Table(name="tbl_product")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private  Long pno;

    private String product_name;

    @OneToMany(mappedBy = "product_id", cascade = CascadeType.ALL)
    @JsonManagedReference("productReference") // Unique reference name
    private List<Qna> qnaList;

    private String product_brand;

    private boolean product_stock;

    private String product_desc;

    private LocalDateTime product_date;

    @ElementCollection
    @Builder.Default
    private List<ProductOption> product_list = new ArrayList<>();


    @ElementCollection
    @Builder.Default
    private List<ProductImage> imageList = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<ProductImageURL> imageURLList = new ArrayList<>();


    //    상품에 이미지 추가
    public void addImage(ProductImage image){
        //이미지 리스트에 개수에 따라 새로 추가되는 이미지의 순번을 지정
        //만약 리스트에 2개의 이미지가 있으면 2를 반환 => 추가되는 이미지의 번호는 2로 추가된다.
        image.setOrd(this.imageList.size());
        imageList.add(image);  //이미지리스트에 새로 추가된 이미지 삽입
    }

    public void addImageURL(ProductImageURL imageURL){
        //이미지 리스트에 개수에 따라 새로 추가되는 이미지의 순번을 지정
        //만약 리스트에 2개의 이미지가 있으면 2를 반환 => 추가되는 이미지의 번호는 2로 추가된다.
        imageURL.setOrd1(this.imageURLList.size());
        imageURLList.add(imageURL);  //이미지리스트에 새로 추가된 이미지 삽입
    }

    //파일 이름을 기반으로 상품에 이미지를 추가
    //이미지 파일의 이름을 문자열(fileName)로 전달 => 추가한 이미지를  imageList 배열에 저장
    public void addImageString(String fileName){
        ProductImage productImage = ProductImage.builder()
                .fileName(fileName)
                .build();
        addImage(productImage);
    }

    //상품삭제
    public void clearList(){
        this.imageList.clear();
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public void setProduct_brand(String product_brand) {
        this.product_brand = product_brand;
    }

    public void setProduct_stock(boolean product_stock) {
        this.product_stock = product_stock;
    }

    public void setProduct_desc(String product_desc) {
        this.product_desc = product_desc;
    }

    public void setProduct_date(LocalDateTime product_date) {
        this.product_date = product_date;
    }
}
 */

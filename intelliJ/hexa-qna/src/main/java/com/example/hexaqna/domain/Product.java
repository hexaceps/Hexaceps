package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.mapping.Array;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

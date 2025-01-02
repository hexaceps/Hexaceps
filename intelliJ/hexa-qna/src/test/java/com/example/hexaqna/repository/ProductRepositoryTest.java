package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Product;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class ProductRepositoryTest {
    @Autowired ProductRepository productRepository;

    @Test
    void 상품추가() {
        for (int i = 0; i < 131; i++) {
            Product product = Product.builder()
                    .productName("Nike x Travis Scott Air Force" + i + "Low Cactus Jack version. " + (0.01*i))
                    .productBrand("NIKE")
                    .productStock(2)
                    .productDescription("나이키 x 트래비스 스캇 에어포스" + i + "로우 캑터스 잭")
                    .size("260")
                    .price(425000*i)
                    .category("BRANDNEW")
                    .registeredAt(LocalDate.now())
                    .build();
            product.addImageString(i*1000 + "_" + UUID.randomUUID().toString() + "_" + i + ".png");
            product.addImageString(i*1000 + "_" +UUID.randomUUID().toString() + "_" + i+50 + ".png");
            product.addSiteLink("http://localhost:8080/api/products/"+i, 0);
            product.addSiteLink("https://kream.co.kr/products/37466", 1);
            product.addSiteLink("https://stockx.com/air-jordan-6-retro-low-golf-white-infrared", 2);
            productRepository.save(product);
        }
        log.info("상품레포테스트 (상품추가) 완료");
    }

@Test
void 상품추가1() {
    for (int i = 0; i < 13; i++) {
        Product product = Product.builder()
                .productName("Nike x Travis Scott Air Force" + i + "Low Cactus Jack version. " + (0.01*i))
                .productBrand("NIKE")
                .productStock(2)
                .productDescription("나이키 x 트래비스 스캇 에어포스" + i + "로우 캑터스 잭")
                .size("260")
                .price(425000*i)
                .category("collection")
                .registeredAt(LocalDate.now())
                .build();
        product.addImageString(i*1000 + "_" + UUID.randomUUID().toString() + "_" + i + ".png");
        product.addImageString(i*1000 + "_" +UUID.randomUUID().toString() + "_" + i+50 + ".png");
        product.addSiteLink("http://localhost:8080/api/products/"+i, 0);
        product.addSiteLink("https://kream.co.kr/products/37466", 1);
        product.addSiteLink("https://stockx.com/air-jordan-6-retro-low-golf-white-infrared", 2);
        productRepository.save(product);
    }
    log.info("상품레포테스트 (상품추가) 완료");
}
}
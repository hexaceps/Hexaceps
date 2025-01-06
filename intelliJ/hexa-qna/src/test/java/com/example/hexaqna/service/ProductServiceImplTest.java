package com.example.hexaqna.service;

import com.example.hexaqna.domain.Product;
import com.example.hexaqna.domain.ProductImage;
import com.example.hexaqna.domain.ProductSiteLink;
import com.example.hexaqna.dto.ProductDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

@SpringBootTest
@Slf4j
class ProductServiceImplTest {

    @Autowired private ProductServiceImpl productService;
    @Test
    void 상품160개추가() {
        String[] productBrands = {"BALENCIAGA", "GUCCI", "HERMES", "DIOR", "NIKE", "ADIDAS", "SUPREME", "ASICS", "JORDAN", "NEWBALANCE", "UGG"};
        int[] sizes = {230, 240, 250, 260, 270, 280, 290};
        String[] categories = {"LUXURY", "BRAND", "SEASON"};

        for (int i = 1; i < 161; i++) {
            String productBrand = productBrands[(i - 1) % productBrands.length];
            int size = sizes[(i - 1) % sizes.length];
            String category = (productBrand.equals("BALENCIAGA") ||
                    productBrand.equals("GUCCI") ||
                    productBrand.equals("HERMES") ||
                    productBrand.equals("DIOR"))
                    ? categories[0]
                    : (i % 2 == 0 ? categories[1] : categories[2]);

            Product product = Product.builder()
                    .productName(productBrand + " x Donad Trump New Clear Edition_" + i*10 + "_I LOVE KJE ver_" + (1981+i))
                    .productBrand(productBrand)
                    .productStock(10)
                    .productDescription(productBrand + " x 도널트 트럼프 핵미사일 에디션_" + i*10 + "_나만큼 김정은이랑 친하면 니가 짱먹어 에디션_" + (1981+i))
                    .productSize(size)
                    .price(99000*i)
                    .category(category)
                    .registeredAt(LocalDate.now())
                    .build();
            // product.addImageString(i*1000 + "_" + UUID.randomUUID().toString() + "_" + i + ".png");
            // product.addImageString(i*1000 + "_" +UUID.randomUUID().toString() + "_" + i+50 + ".png");
            product.addImageString("test_image_"+"left_1_"+i+".jpg");
            product.addImageString("test_image_"+"rear_2_"+i+".jpg");
            product.addImageString("test_image_"+"right_3_"+i+".jpg");
            product.addImageString("test_image_"+"top_4_"+i+".jpg");
            product.addSiteLink("http://localhost:8080/api/products/"+i, 0);
            product.addSiteLink("https://kream.co.kr/products/37466", 1);
            product.addSiteLink("https://stockx.com/air-jordan-6-retro-low-golf-white-infrared", 2);
            ProductDTO productDTO = ProductDTO.builder()
                    .productName(product.getProductName())
                    .productBrand(product.getProductBrand())
                    .category(product.getCategory())
                    .productDescription(product.getProductDescription())
                    .productStock(product.getProductStock())
                    .registeredAt(product.getRegisteredAt())
                    .price(product.getPrice())
                    .productSize(product.getProductSize())
                    .build();
            List<ProductImage> imageList = product.getImageList();
            if(imageList == null || imageList.isEmpty()) {
            }
            List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
            productDTO.setUploadFileNames(fileNameList);

            List<ProductSiteLink> siteList = product.getSiteList();
            if (siteList == null || siteList.isEmpty()) {
            }
            List<String> siteNameList = siteList.stream().map(productSiteLink -> productSiteLink.getSiteLink()).toList();
            productDTO.setProductSiteNames(siteNameList);

            productService.registerNewProduct(productDTO);
        }
        log.info("Product Service Test (상품추가) 완료");
    }
}
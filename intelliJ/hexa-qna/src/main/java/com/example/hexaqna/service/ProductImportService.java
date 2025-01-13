package com.example.hexaqna.service;

import com.example.hexaqna.domain.Product;
import com.example.hexaqna.repository.ProductRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductImportService {
    /*
        RPA에서 스크래핑한 csv 파일을 아래의 로직으로 product를 list 형태로 만들어 주입
        - 사전에 gradle에서 opencsv 의존성 주입 할것
        - /upload/rawdata.csv 샘플파일 있음 (참고)
        - 상황에 따라 메서드를 추가 하거나 커스터 마이징
        - ProductImportService.java(신규생성), ProductController.java(메서드추가)
     */

    private final ProductRepository productRepository;

    // OPENCSV 의존성 주입 : https://mvnrepository.com/artifact/com.opencsv/opencsv/5.7.1
    @Transactional
    public void importProductsByCSV(MultipartFile file) throws IOException, CsvValidationException {
        log.info("importProductsByCSV() 저장할 서비스 로직 진입");
        try (CSVReader csvReader = new CSVReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String[] header = csvReader.readNext(); // 헤더행 읽기
            if (header == null || header.length != 10) {
                throw new IllegalArgumentException("CSV 형식이 올바르지 않거나 필드가 부족합니다. 헤더 필드 수: " + (header == null ? 0 : header.length));
            }
            // 헤더 값이 정확한지 확인
            for (int i = 0; i < header.length; i++) {
                header[i] = header[i].trim();
            }
            List<Product> products = new ArrayList<>();
            String[] line;
            while ((line = csvReader.readNext()) != null) {
                log.info("while 문으로 훑으면서 데이터 저장");
                /*
                // 필요한 필드가 부족하면 건너뛰는 로직인데 동작 안됨 ㅜㅜ
                if (line.length < 11 || isEmptyRow(line) {
                    continue;
                }
                 */
                Product product = new Product();
                product.setCategory(line[1]);
                product.setProductName(line[2]);
                try {
                    product.setPrice(Integer.parseInt(line[3]));
                } catch (NumberFormatException e) {
                    log.warn("잘못된 가격 형식: {}", line[3]);
                    continue;
                }
                product.setProductBrand(line[4]);
                // PRODUCT_IMAGE FK 테이블
                for (int i = 5; i < 9; i++) {
                    if (line[i] != null && !line[i].trim().isEmpty()) {
                        product.addImageString(line[i]);
                    }
                }
                // PRODUCT_SITE_LINK FK 테이블
                if (line[9] != null && !line[9].trim().isEmpty()) {
                    product.addSiteLink(line[9], 0);
                }
                log.info("product 를 담았습니다.");
                if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
                    log.error("저장된 product list data가 없습니다");
                } else {
                    products.add(product);
                }
                log.info("리스트로 n 개째 저장 완료");
            }
            // products 리스트가 비어 있지 않으면 저장
            if (!products.isEmpty()) {
                productRepository.saveAll(products);
            }
        }
    }

    // function create 설재훈 25.1.9
    @Transactional
    public void importProductsByCSVTest(MultipartFile file) throws IOException, CsvValidationException {
        log.info("importProductsByCSVTest() 저장할 서비스 로직 진입");
        try (CSVReader csvReader = new CSVReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String[] header = csvReader.readNext(); // 헤더행 읽기
            if (header == null || header.length !=16) {
                throw new IllegalArgumentException("CSV 형식이 올바르지 않거나 필드가 부족합니다. 헤더 필드 수: " + (header == null ? 0 : header.length));
            }
            // 헤더 값이 정확한지 확인
            for (int i = 0; i < header.length; i++) {
                header[i] = header[i].trim();
            }
            List<Product> products = new ArrayList<>();
            String[] line;
            while ((line = csvReader.readNext()) != null) {
                log.info("while 문으로 훑으면서 데이터 저장");

                Product product = new Product();
                product.setCategory(line[1]);
                product.setProductBrand(line[2]);
                try {
                    product.setProductSize(Integer.parseInt(line[3]));
                } catch (NumberFormatException e) {
                    log.warn("잘못된 사이즈 형식: {}", line[3]);
                    continue;
                }
                product.setProductName(line[4]);
                for (int i = 5; i < 8; i++) {
                    if (line[i] != null && !line[i].trim().isEmpty()) {
                        int priceIndex = i + 3;
                        int ord = i-5;
                        if (priceIndex < line.length && line[priceIndex] != null && !line[priceIndex].trim().isEmpty()) {
                            try {
                                int sitePrice = Integer.parseInt(line[priceIndex]);
                                product.addSiteLinkTest(line[i], ord, sitePrice);
                                log.info("ord값 가격: {}, sitePrice: {}", ord, sitePrice);

                            } catch (NumberFormatException e) {
                                log.warn("잘못된 가격 형식: {}", line[priceIndex]);
                            }
                        } else {
                            log.warn("유효하지 않은 사이트 링크나 가격 데이터: {}, {}", line[i], line[priceIndex]);
                        }
                    }
                }
                for (int i = 11; i < 15; i++) {
                    if (line[i] != null && !line[i].trim().isEmpty()) {
                        product.addImageString(line[i]);
                    }
                }
                try {
                    product.setPrice(Integer.parseInt(line[15]));
                } catch (NumberFormatException e) {
                    log.warn("잘못된 가격 형식: {}", line[15]);
                    continue;
                }
                log.info("product 를 담았습니다.");
                if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
                    log.error("저장된 product list data가 없습니다");
                } else {
                    products.add(product);
                }
                log.info("리스트로 n 개째 저장 완료");
            }
            // products 리스트가 비어 있지 않으면 저장
            if (!products.isEmpty()) {
                productRepository.saveAll(products);
            }
        }
    }

    private boolean isEmptyRow(String[] row) { // 빈 행 여부 체크하는 메서드
        for (String field : row) {
            if (field != null && !field.trim().isEmpty()) {
                return false; // 하나라도 비어 있지 않으면 유효한 데이터로 판단
            }
        }
        return true; // 모든 필드가 비어 있으면 빈 행으로 판단
    }
}

package com.example.hexaqna.controller;

import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.ProductDTO;
import com.example.hexaqna.dto.QnaDTO;
import com.example.hexaqna.service.ProductImportService;
import com.example.hexaqna.service.ProductService;
import com.example.hexaqna.util.CustomFileUtil;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;
    private final CustomFileUtil customFileUtil;
    private final ProductImportService productImportService;

    // RPA에서 가져온 csv 데이터를 db로 저장 (신규 추가)
    @PostMapping("/import")
    public Map<String, String> importProductsByCSV(@RequestParam("file") MultipartFile file) {
        log.info("importProductsByCSV() 컨트롤러 시작");
        try {
            productImportService.importProductsByCSV(file);
            return Map.of("result", "success");
        } catch (IOException e) {
            log.error("파일 처리 중 오류 발생", e);
            throw new RuntimeException("파일 처리 중 오류가 발생했습니다.", e);
        } catch (IllegalArgumentException | CsvValidationException e) {
            log.error("CSV 형식 오류", e);
            throw new RuntimeException("잘못된 CSV 형식입니다.", e);
        }
    }

    // csv 데이터 삽입 (신규 추가 설재훈 25.01.09)
    @PostMapping("/importtest")
    public Map<String, String> importProductsByCSVTest(@RequestParam("file") MultipartFile file) {
        log.info("importProductsByCSVTest() 컨트롤러 시작");
        try {
            productImportService.importProductsByCSVTest(file);
            return Map.of("result", "success");
        } catch (IOException e) {
            log.error("파일 처리 중 오류 발생", e);
            throw new RuntimeException("파일 처리 중 오류가 발생했습니다.", e);
        } catch (IllegalArgumentException | CsvValidationException e) {
            log.error("CSV 형식 오류", e);
            throw new RuntimeException("잘못된 CSV 형식입니다.", e);
        }
    }

    // 상품 저장 (사진파일 => 저장포함, 사용중 25.1.4)
    @PostMapping("/")
    public Map<String, Long> addNewProduct(ProductDTO productDTO) {
        log.info("addNewProduct() 컨트롤러 시작");
        List<MultipartFile> files = productDTO.getFiles();
        List<String> uploadFileNames = customFileUtil.saveFiles(files); // 이미지 저장
        productDTO.setUploadFileNames(uploadFileNames); // 이미지파일 이름 담기
        Long productId = productService.registerNewProduct(productDTO); // product db 저장
        return Map.of("result", productId);
    }

    //업로드 파일 조회
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable("fileName") String fileName) {
        log.info("viewFileGET() 컨트롤러 시작");
        return customFileUtil.getFile(fileName);
    }

    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO,
                                            @RequestParam(value = "category", required = false) String category,
                                            @RequestParam(value = "productBrand", required = false) String productBrand,
                                            @RequestParam(value = "productSize", required = false) Integer productSize,
                                            @RequestParam(value = "minPrice", required = false) String minPrice,
                                            @RequestParam(value = "maxPrice", required = false) Integer maxPrice,
                                            @RequestParam(value = "sortBy", required = false) String sortBy,
                                            @RequestParam(value = "sortOrder", required = false) String sortOrder) {
        log.info("list with category: {}, brand: {}, productSize : {}, min : {}, max: {}, sortBy: {}, sortOrder: {}",
                category, productBrand, productSize, minPrice, maxPrice, sortBy, sortOrder);

        return productService.getProductList(pageRequestDTO, category, productBrand, productSize, minPrice, maxPrice, sortBy, sortOrder);
    }

    // 하나의 상품 조회
    @GetMapping("/{productId}")
    public ProductDTO read(@PathVariable("productId") Long productId){
        return productService.getProductById(productId);
    }

    //상품수정 (프론트에서 사용 하지 말것)
    @PutMapping("/{productId}")
    public Map<String, String> modify(@PathVariable("productId") Long productId, ProductDTO productDTO) {
        productDTO.setProductId(productId);
        ProductDTO oldProductDTO = productService.getProductById(productId);
        //기존파일이름
        List<String> oldFileNames = oldProductDTO.getUploadFileNames();
        //새로 업로드 해야하는 파일
        List<MultipartFile> files = productDTO.getFiles();
        //새로 업로드해야하는 파일의 이름
        List<String> currentUploadFileNames = customFileUtil.saveFiles(files);
        //유지되는 파일
        List<String> uploadedFileNames = productDTO.getUploadFileNames();
        //유지되는파일 + 새로 업로드된 파일 => 파일목록을 만든다
        if(currentUploadFileNames != null && !currentUploadFileNames.isEmpty()) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }
        //수정한다.
        //A,B,C 파일이 있었음, C는 삭제했음, D는 새로 들어왔음 => A,B,D의 처리가 끝남
        productService.modify(productDTO);
        //c를 삭제하여야 한다.
        if(oldFileNames != null && !oldFileNames.isEmpty()){
            List<String> removeFiles = oldFileNames.stream().filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
            //실제로 파일 삭제
            customFileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT","SUCCESS");
    }

    //상품삭제 (프론트에서 사용 하지 말것)
    @DeleteMapping("{productId}")
    public Map<String,String> remove(@PathVariable("productId") Long productId){
        //삭제할 파일 알아내기
        List<String> oldFileNames = productService.getProductById(productId).getUploadFileNames();
        productService.remove(productId);
        customFileUtil.deleteFiles(oldFileNames);
        return Map.of("RESULT","DELETE STCCESS");
    }


    @GetMapping("/search")
    public ResponseEntity<PageResponseDTO<ProductDTO>> searchProducts(
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false) String sortBy,
            @RequestParam(value = "sortOrder", required = false) String sortOrder) {

        log.info("키워드 {}",keyword);
        // 요청 DTO 객체 생성
        String trimmedKeyword = keyword.trim();

        PageRequestDTO pageRequestDTO = new PageRequestDTO(page, size);

        // 상품 검색 서비스 호출

        PageResponseDTO<ProductDTO> response = productService.searchProducts(pageRequestDTO, trimmedKeyword, sortBy,sortOrder);

        return ResponseEntity.ok(response);
    }

}
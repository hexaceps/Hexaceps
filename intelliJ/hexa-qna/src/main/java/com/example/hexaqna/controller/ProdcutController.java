package com.example.hexaqna.controller;

import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.ProductDTO;
import com.example.hexaqna.service.ProductService;
import com.example.hexaqna.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProdcutController {

    private final ProductService productService;
    private final CustomFileUtil customFileUtil;


    //파일 업로드 =>저장
    @PostMapping("/")
    public Map<String, Long> register(ProductDTO productDTO) {
        log.info("register : ", productDTO);

        List<MultipartFile> files = productDTO.getFiles();

        List<String> uploadFileNames = customFileUtil.saveFiles(files);

        //저장
        productDTO.setUploadFileNames(uploadFileNames);

        //서비스호출
        Long pno = productService.register(productDTO);
        return Map.of("result", pno);
    }

    //업로드 파일 조회
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable("fileName") String fileName) {
        return customFileUtil.getFile(fileName);
    }

    //  http://localhost:8080/api/products/view/s_15b1f209-5a96-4b13-a04d-967867c8da88_dress0.PNG

    //    상품목록 조회
    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {

        return productService.getList(pageRequestDTO);
    }

    //하나의 상품 조회
    @GetMapping("/{pno}")
    public ProductDTO read(@PathVariable("pno") Long pno){
        return productService.get(pno);
    }

    //상품수정
    @PutMapping("/{pno}")
    public Map<String, String> modify(@PathVariable("pno") Long pno, ProductDTO productDTO) {
        productDTO.setPno(pno);

        ProductDTO oldProductDTO = productService.get(pno);
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

    //상품삭제
    @DeleteMapping("{pno}")
    public Map<String,String> remove(@PathVariable("pno") Long pno){
        //삭제할 파일 알아내기
        List<String> oldFileNames = productService.get(pno).getUploadFileNames();
        productService.remove(pno);

        customFileUtil.deleteFiles(oldFileNames);

        return Map.of("RESULT","DELETE STCCESS");
    }


}

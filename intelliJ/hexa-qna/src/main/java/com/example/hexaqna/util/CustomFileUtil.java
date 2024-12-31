package com.example.hexaqna.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
public class CustomFileUtil {

    //upload폴더 만들기
    // application.yml에 설정된 값을 가져옴
    @Value("${org.zerock.upload.path}")
    private String uploadPath;

    //Spring 빈이 생성되고 의존성 주입이 완료된 후, 해당 메서드가 자동으로 호출된다.
    @PostConstruct
    public void init(){
        File tempFolder = new File(uploadPath);

        if(!tempFolder.exists()){
            tempFolder.mkdirs();
        }

        //tempFolder의 경로값
        String uploadPath = tempFolder.getAbsolutePath();

        //경로값 찍음
        log.info("uploadPath경로값 : {}", uploadPath);
    }

    //썸네일 만들기
    public List<String> saveFiles(List<MultipartFile> files){

        if(files == null || files.size() == 0) {
            return null;
        }
        //uploadNames 업로드된 파일이름
        List<String> uploadNames = new ArrayList<>();

        //업로드시 같은 이름이 존재할 수 있으므로..
        for(MultipartFile multipartFile : files) {
            String savedName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
            //경로표현 Paths.get(기본경로, 추가경로)
            Path savePath = Paths.get(uploadPath, savedName);

            try {
                Files.copy(multipartFile.getInputStream(), savePath);

                //Mine Type
                String contentType = multipartFile.getContentType();

                //이미지파일인 경우 썸네일 만들기
                if(contentType != null && contentType.startsWith("image")) {
                    Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);

                    Thumbnails.of(savePath.toFile())
                            .size(200,200)
                            .toFile(thumbnailPath.toFile());
                }
                uploadNames.add(savedName);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return uploadNames;
    }

    //업로드 파일 보여주기,Resource => springframework.core.io.Resource;
    //      /api/products/view/파일이름
    public ResponseEntity<Resource> getFile(String fileName) {
       Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);
        log.info("resource {}", resource);
        if(!resource.exists()){
            //파일이 없으면 기본 이미지
              resource = new FileSystemResource(uploadPath + File.separator + "default.PNG");
        }

        HttpHeaders headers = new HttpHeaders();

        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    //업로드한 파일 삭제하기
    public void deleteFiles(List<String> filenames) {
        if(filenames == null && filenames.isEmpty() ) {
            return;
        }
        filenames.forEach(filename -> {
            //썸네일 있는지 확인하고 삭제하기
            String thumbnailFileName = "s_" + filename;
            Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
            Path filePath = Paths.get(uploadPath, filename);

            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }



}

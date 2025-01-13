package com.example.hexaqna.controller.advice;

import com.example.hexaqna.util.CustomJWTException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class CustomControllerAdvice {

    //없는번호조회 NoSuchElementException
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> notExist(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("msg",e.getMessage()));
    }

    //http://localhost:8080/api/todo/list?page=AAA
    //MethodArgumentNotValidException
    //페이징처리시 list로 호출할때 페이지 번호가 잘못되었을 때
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> notExist(MethodArgumentNotValidException e) {
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("msg", e.getMessage()));
    }


    //APIPRefreshController 에서 에러가 발생하면 CustomJWTException 을 반환한다.
    @ExceptionHandler(CustomJWTException.class)
    public ResponseEntity<?> handleJWTException(CustomJWTException e){
        String msg = e.getMessage();
        return ResponseEntity.ok().body(Map.of("error",msg));
    }


}

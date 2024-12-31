package com.example.hexaqna.config;


import com.example.hexaqna.controller.formatter.LocalDateFormatter;
import com.example.hexaqna.controller.formatter.LocalDateTimeFormatter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Slf4j
public class CustomServletConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        log.info("addFormatters 작동하니?");
        registry.addFormatter(new LocalDateFormatter());
        registry.addFormatter(new LocalDateTimeFormatter());
    }


/*
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //모든경로에 설정
                .maxAge(500) //연결이 안될때, 서버에 문제가 있다고 생각하고 빨리 끊어준다
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS") //어떤 방식의 호출을 허용할건지, options는 되는지 한번 해보는것
                .allowedOrigins("*"); //모든경로에서 들어오는 것 허용
    }

 */
}

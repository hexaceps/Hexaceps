package com.example.hexaqna.dto;

import com.example.hexaqna.domain.Product;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponseDTO<E> {

    //DTO목록
    private List<E> dtoList;

    //pageNumList
    private List<Integer> pageNumList;

    //현재페이지정보
    private PageRequestDTO pageRequestDTO;

    //이전 다음 화살표
    private boolean prev, next;

    //총데이터, 이전페이지, 다음페이지, 총페이지, 현재페이지
    private int totalCount, prevPage, nextPage, totalPage, current;

   // <= 1,2,3,.....10 =>
    //<= 11, 12, 13.... 20 =>

    //현재페이지3 시작값1, 끝값10
    // (3/10 = 0.3 => 올림 => 1 * 10 = 10 끝값, 시작값=> 끝값-9 = 1
    //현재페이지 15 시작값 11 긑값 20
    // 15/10=1.5=> 2 * 10 = 20 끝값, 시작값 20-9=11
    //현재페이지 19

    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long totalCount){
        this.dtoList = dtoList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int)totalCount;



        //끝값
        int end = (int)(Math.ceil(pageRequestDTO.getPage() / 10.0) * 10);

        //시작값
        int start = end - 9;

        //마지막페이지
        //285개 => 285 / 10 => 28.5 => 올림 29
        int last = (int)(Math.ceil(totalCount / (double) pageRequestDTO.getSize()));

        //마지막페이지이면 last
        end = end > last ? last : end;

        //이전, 1보다 크면 true
        this.prev = start > 1;

        //다음, 만약 끝값이 39이고 한페이지당 10씩이면 39*10=390 => totalCount가 더크면
        this.next = totalCount > end * pageRequestDTO.getSize();

        //숫자번호 만들기
        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        //prev와 next는 있을수도 있고 없을수도 있다.
        this.prevPage = prev ? start-1 : 0;
        this.nextPage = next ? end + 1 : 0;

        this.totalPage = this.pageNumList.size();
        this.current = pageRequestDTO.getPage();

    }


}

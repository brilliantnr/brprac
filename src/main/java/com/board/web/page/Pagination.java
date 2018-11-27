package com.board.web.page;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.board.web.board.BoardMapper;

import lombok.Data;

@Component @Data @Lazy
public class Pagination {
	private static final Logger logger = LoggerFactory.getLogger(Pagination.class);
	
	@Autowired BoardMapper mapper;

public Map<?, ?> excute(Map<?, ?> p) {
	Map<String, Object> pg = (Map<String, Object>) p;
	logger.info("페이지네이션 진입");
	
	int pageNum = Integer.parseInt((String) pg.get("pageNo"));
	logger.info("pageNum : "+pageNum);
	int rowCount =mapper.count(); //총 게시물의 수
	int blockSize = 5; // 1~5, 6~10
	
	int pageCount = (int) Math.ceil(rowCount / blockSize); // 총페이지수
	int beginPage = (int) (Math.floor((pageNum - 1) / blockSize) * blockSize + 1); //시작페이지 숫자
	int blockNum = (int) Math.floor(beginPage / blockSize + 1); // 1~5->blockNum:1
	int endPage = (pageCount > blockNum * blockSize) ? blockNum * blockSize : pageCount; //마지막 페이지 숫자
	int preBlock = endPage - blockSize;
	int nextBlock = beginPage + blockSize;
	int beginRow = (pageNum - 1) * blockSize + 1;
	int endRow = pageNum * blockSize;
	boolean existPrev = (beginPage!=1);
	boolean existNext = (!(endPage<pageCount));
	
	System.out.println("총 게시글 수 - rowCount : "+rowCount);
	System.out.println("총 페이지 수  - pageCount : "+pageCount);
	System.out.println("시작페이지 숫자: beginPage : "+beginPage);
	System.out.println("블록 단위  - blockNum : "+blockNum);
	System.out.println("마지막 페이지 숫자 - endPage : "+endPage);
	System.out.println("preBlock : "+preBlock);
	System.out.println("nextBlock : "+nextBlock);
	System.out.println("beginRow : "+beginRow);
	System.out.println("endRow : "+endRow);
	System.out.println("existPrev : "+existPrev);
	System.out.println("existNext : "+existNext);
	
	pg.put("rowCount", rowCount);
	pg.put("beginPage", beginPage);
	pg.put("endPage", endPage);
	pg.put("beginRow", beginRow);
	pg.put("endRow", endRow);
	
	pg.put("preBlock", preBlock);
	pg.put("nextBlock", nextBlock);
	
	pg.put("existPrev", existPrev);
	pg.put("existNext", existNext);
	
	return pg;
}

}

package com.board.web.board;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.board.web.page.Pagination;

@RestController
@RequestMapping("/board")
public class BoardController {
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	@Autowired BoardMapper mapper;
	@Autowired Pagination pagination;
	
	@GetMapping("/list/{pageNo}")
	public Map<String,Object> list(@PathVariable String pageNo) {
		logger.info(" list() 진입 ");
		Map<String,Object> map = new HashMap<>();
		
		map.put("pageNo", pageNo);
		logger.info(" pageNo: "+map.get("pageNo"));
		
		//페이지네이션
		logger.info("페이지네이션");
		pagination.excute(map);
		
		map.put("list", mapper.list(map));
		logger.info(" list : "+map.get("list"));
		
		System.out.println("rs : "+map);
		System.out.println("map : "+map);
		return map;
	}
	
	@PostMapping("/add")
	public Map<String, Object> add() {
		logger.info(" add() : ");
		Map<String,Object> map = new HashMap<>();
		
		return map;
	};
	
}

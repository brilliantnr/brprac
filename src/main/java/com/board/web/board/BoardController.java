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
	
	@GetMapping("/list/{pageNo}/{keyword}")
	public Map<String,Object> listBoard(@PathVariable String pageNo,
			@PathVariable String keyword) {
		logger.info(" list() 진입 ");
		Map<String,Object> map = new HashMap<>();
		
		map.put("pageNo", pageNo);
		map.put("keyword", keyword);
		
		//페이지네이션
		pagination.excute(map);
		map.put("list", mapper.listBoard(map));
		return map;
	}
	
	@PostMapping("/add")
	public Map<String, Object> add() {
		logger.info(" add() : ");
		Map<String,Object> map = new HashMap<>();
		
		return map;
	};
		
}

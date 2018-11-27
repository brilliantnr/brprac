package com.board.web.board;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface BoardMapper {
	public void insertBoard(Map<?, ?> p);
	public Board detailBoard(Map<?, ?> p);
	public List<?> selectSome(Map<?, ?> p);
	public List<?> list(Map<?, ?> p);
	public int count();
	public void updateBoard(Board p);
	public void deleteBoard(Board p);
}
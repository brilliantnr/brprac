<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ page session="false" %> --%>
<!DOCTYPE html>
<html>
<head>
	<title>게시판 메인 </title>
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<script src="${context}/resources/app.js"></script>
</head>
<body>
	<!-- header -->
	<div id="pt_header" style="height: 118px; background: #32373b; width: 100%;"></div>

	<!-- contents -->
	<div id="wrapper" style="margin-top: 50px;"></div>
	
	
	
	
	
	
	<!-- 
	
	<div class="btm_mn clear">
	
		<div class="fl">
		<a class="btn_img fl" href="https://www.dmitory.com/index.php?mid=specup&amp;page=1">목록</a>		
		<form action="https://www.dmitory.com/" method="get" onsubmit="return procFilter(this, search)" class="bd_srch_btm on"><input type="hidden" name="_filter" value="search"><input type="hidden" name="act" value="">
			<input type="hidden" name="vid" value="">
			<input type="hidden" name="mid" value="specup">
			<input type="hidden" name="category" value="">
			<span class="btn_img itx_wrp" style="width: 140px;">
				<input type="submit" onclick="jQuery(this).parents('form.bd_srch_btm').submit();return false;" class="searchBtn" value="검색">
				<label for="bd_srch_btm_itx_19034" style="visibility: visible;">검색</label>
				<input type="text" name="search_keyword" id="bd_srch_btm_itx_19034" class="bd_srch_btm_itx srch_itx" value="">
			</span>
			<span class="btn_img select">
				<select name="search_target">
					<option value="title">제목</option><option value="title_content">제목+내용</option><option value="content">내용</option><option value="group_title">말머리</option>				</select>
			</span>
					</form>	</div>
	<div class="fr">
				<a class="btn_img" href="https://www.dmitory.com/index.php?mid=specup&amp;act=dispBoardWrite">쓰기</a>			</div>
</div>
 -->



	
	<script>
	console.log("0. home.jsp 진입");
	app.init('${context}');
	</script>
</body>
</html>

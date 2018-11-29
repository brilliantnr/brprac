<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ page session="false" %> --%>
<!DOCTYPE html>
<html>
<head>
	<title>게시판 메인 </title>
	
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
	<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
	<!------ Include the above in your HEAD tag ---------->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>
	<script src="${context}/resources/app.js"></script>
	
</head>
<body>
	<!-- header -->
	<div id="pt_header" style="
		    height: 118px;
		    background: #32373b;
		    width: 100%;
		"></div>

	<!-- contents -->
	<div id="wrapper">
	<div class="container">
	<div class="row">
	<div id="board_div" class="col-md-12">
	<h4>게시판</h4>
	<div class="table-responsive">
	<table id="board_table" class="table table-bordred table-striped">
	<thead>
	<tr><th>NO</th>
	<th>제목</th>
	<th>작성자</th>
	<th>작성일자</th></tr>
	</thead><tbody>
	<tr><td>17</td><td>KT, 이동전화 96% 인터넷 99% 복구...소상공인 밀착지원</td><td>이설영</td><td>2018-11-27 14:04:42</td></tr>
	<tr><td>16</td><td>국내 일반화장품 中시장 진입 최대 3개월 단축</td><td>백영미</td><td>2018-11-27 13:55:31</td></tr><tr><td>15</td>
	<td>반도체 호황에도 일자리 안늘었다…금융위기 이후 "최악"</td><td>이훈철</td><td>2018-11-27 13:54:59</td></tr><tr><td>14</td>
	<td>세입결손 4兆 논란에"예산열차" 급제동…정상화는 언제</td><td>최종무</td><td>2018-11-27 13:53:28</td></tr><tr><td>13</td>
	<td>같은 리콜 기기…미국 "사망할 수도" VS 한국 "부작용 거의 없어"</td><td>정지성</td><td>2018-11-27 13:52:27</td></tr>
	</tbody>
	</table>               
	
	<!-- 페이지네이션 -->
	<div class="col-md-12">
	<!-- 글쓰기 버튼 -->
	<button type="button" class="btn btn-default">글쓰기</button></div>        
	
	<!-- search -->
	<div class="col-xs-8 col-xs-offset-2">
	<div class="input-group">
	<div class="input-group-btn search-panel">
	<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
	<span id="search_concept">제목</span> <span class="caret"></span></button>
	<ul class="dropdown-menu" role="menu">
	
	<!--  <li><a href="#contains">Contains</a></li><li><a href="#its_equal">Its equal</a></li><li><a href="#greather_than">Greather than ></a></li><li><a href="#less_than">Less than < </a></li><li class="divider"></li><li><a href="#all">Anything</a></li> -->
	</ul></div>
	<input type="hidden" name="search_param" value="all" id="search_param">
	
	         <input type="text" class="form-control" name="x" placeholder="Search term...">
	         <span class="input-group-btn"><button class="btn btn-default" type="button">
	         <span class="glyphicon glyphicon-search"></span></button></span></div></div>
	         <!-- search끝 -->        
	         </div>
	         
	         <div class="clearfix"></div>
	         <ul class="pagination pull-right" id="pg_ul"><li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#"><span class="glyphicon glyphicon-chevron-right"></span></a></li></ul></div><!-- container --></div></div></div>
	
	
	
	
	
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

"use strict"
var app = app || {};

app=(()=>{
	var init =x=>{
		console.log('step1 : app.init 진입');
		$.extend((()=>{
			sessionStorage.setItem('context',x);
			return{ 
			ctx : ()=>{return sessionStorage.getItem('context');}
			}
		})());
		$('#wrapper').html(app.page.listBrd());
		
		app.service.init();
			
	};
	return {init : init};
})();

app.service=(()=>{
	var init=()=>{
		console.log('step2 : app.service.init 진입'); 
		list(1);
	};
	var list=x=>{
		console.log('step3: app.service.list 진입');
		$('#board_div').empty();
		$.getJSON($.ctx()+'/board/list/'+x,d=>{
			$.each(d.list,(i,j)=>{
				
				let transTime=x=>{	
					let year=new Date(x).getFullYear();
					let month=new Date(x).getMonth()+1;
					let day=new Date(x).getDate();
					let hour=new Date(x).getHours();
					let min=new Date(x).getMinutes();
					let sec=new Date(x).getSeconds();
					
					let result=year+"-"+
								(month<10?"0"+month:month)+"-"+
								(day<10?"0"+day:day)+" "+
								+ (hour < 10 ? "0" + hour : hour) + ":"
		                        + (min < 10 ? "0" + min : min) + ":" 
		                        + (sec < 10 ? "0" + sec : sec);
					return result; 
				};
				
				$('<tr/>').append(
						$('<td/>').html(j.num),
						$('<td/>').html(j.title),
						$('<td/>').html(j.writer),
						$('<td/>').html(transTime(j.regidate))
				).appendTo($('tbody'));
			});
			
			//페이지네이션
			$('<div/>').addClass("clearfix").appendTo("#board_div");
			$('<ul/>').addClass("pagination pull-right").attr({id:'pg_ul'}).appendTo("#board_div");
			if(d.existPrev==true){
				$('<li/>').append(
						$('<a href="#"/>').append(
								$('<span/>').addClass("glyphicon glyphicon-chevron-left"))).click(e=>{
									alert(' 이전 페이지 !!');
									e.preventDefault();
									list(d.preBlock);
								}).appendTo('#pg_ul');
			};
			for(let i=d.beginPage; i<=d.endPage;i++){
				$('<li/>').append($('<a href="#"/>').html(i))
				.click(e=>{
					//페이지 클릭이벤트
					e.preventDefault();
					app.service.list(i);
				})
				.appendTo('#pg_ul');
			};
			
			
			
			if(d.existNext==true){
				$('<li/>').append(
						$('<a href="#"/>').append(
								$('<span/>').addClass("glyphicon glyphicon-chevron-right"))).appendTo('#pg_ul');
			};
		
			
		});
	};

	
	
	
	
	
	return{init:init,
			list:list};
})();

app.page=(()=>{
	/*var wrapper=()=>{
		$('<div/>').attr({id:'w'});
	};*/
	var listBrd=()=>{
		return'<div class="container">'
        +'<div class="row">'
            +'<div id="board_div" class="col-md-12">'
            +'<h4>게시판</h4>'
            +'<div class="table-responsive">'
                  +'<table id="board_table" class="table table-bordred table-striped">'
                    +'<thead>'
                      +'<th>NO</th>'
                        +'<th>제목</th>'
                        +'<th>작성자</th>'
                        +'<th>작성일자</th>'
                       +'</thead>'
                +'<tbody>'
                +'</tbody>'
            +'</table>'
    +'               '
            +'<!-- 페이지네이션 -->'
            
           +'<div class="col-md-12">'
              +'<!-- 글쓰기 버튼 -->'
                +'<button type="button" class="btn btn-default">글쓰기</button>'
           +'</div>'
    +'        '
      +'<!-- search -->'
      +'<div class="col-xs-8 col-xs-offset-2">'
            +'<div class="input-group">'
                    +'<div class="input-group-btn search-panel">'
                        +'<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'
                          +'<span id="search_concept">제목</span> <span class="caret"></span>'
                        +'</button>'
                        +'<ul class="dropdown-menu" role="menu">'
                         +'<!--  '
                          +'<li><a href="#contains">Contains</a></li>'
                          +'<li><a href="#its_equal">Its equal</a></li>'
                          +'<li><a href="#greather_than">Greather than ></a></li>'
                          +'<li><a href="#less_than">Less than < </a></li>'
                          +'<li class="divider"></li>'
                          +'<li><a href="#all">Anything</a></li> '
                          +'-->'
                        +'</ul>'
                    +'</div>'
                    +'<input type="hidden" name="search_param" value="all" id="search_param">         '
                    +'<input type="text" class="form-control" name="x" placeholder="Search term...">'
                    +'<span class="input-group-btn">'
                        +'<button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>'
                    +'</span>'
                +'</div>'
            +'</div><!-- search끝 -->'
    +'        '
      +'</div>'
    +'</div><!-- container -->';
	};
	var addBrd=()=>{
		'<div class="container">'
		  '<div class="row">'
		    '<div class="col-md-12">'
		        '<table class="table table-striped" style="text-align:center; border:1px solid #dddddd;">'
		          '<thead>'
		            '<tr>'
		              '<th colspan="1" style="background-color:#eeeeee; text-align: center;">게시글 작성</th>'
		            '</tr>       '
		          '</thead>'
		'          '
		          '<tbody>'
		            '<tr>'
		              '<td><input type="text" class="form-control" placeholder="글제목" id="title" maxlength="50"></td>'
		            '</tr>'
		            '<tr>'
		              '<td><input type="text" class="form-control" placeholder="작성자" maxlength="50"></td>'
		            '</tr>'
		            '<tr>'
		              '<td><input type="text" class="form-control" placeholder="비밀번호" maxlength="20"></td>'
		            '</tr>'
		            '<tr>  '
		              '<td><textarea class="form-control" placeholder="글 내용" id="content" maxlength="2048" style="height:350px"></textarea> </td>'
		            '</tr> '
		          '</tbody>'
		'          '
		        '</table>'
		          '<!-- soap방식: <input type="submit" class="btn btn-primary pull-right" value="글쓰기"> -->'
		          '<button class="btn btn-primary pull-left">목록가기</button>'
		          '<button class="btn btn-primary pull-right">글쓰기 완료</button>'
		      '</div>'
		     '</div>'
		  '</div>'
	};
	var detailBrd=()=>{};
	return{listBrd:listBrd,
		addBrd:addBrd,
		detailBrd,detailBrd};
})();


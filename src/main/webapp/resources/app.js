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
		
		$('#wrapper').empty();
		$('#wrapper').append($('<div/>').attr({id : 'contents'}));
	    
		app.page.listBrd();
		app.service.init();
	};
	return {init : init};
})();

app.service=(()=>{
	var init=()=>{
		console.log('step2 : app.service.init 진입'); 
		list({pageNum:1});
	};
	var list=x=>{
		$('tbody').empty();
		$('#pagination').remove();
		console.log('step3: app.service.list 진입');
		console.log('x.pageNum : '+x.pageNum);
		console.log('x.keyword : '+x.keyword);
		$.getJSON($.ctx()+'/board/list/'+x.pageNum+'/'+x.keyword,d=>{
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
			$('<div/>').attr({id:"pagination"}).addClass("clearfix").appendTo("#contents");
			$('<ul/>').addClass("pagination pull-right").attr({id:'pg_ul'}).appendTo("#pagination");
			if(d.existPrev==true){
				$('<li/>').append(
						$('<a href="#"/>').append(
								$('<span/>').addClass("glyphicon glyphicon-chevron-left"))).click(e=>{
									alert(' 이전 페이지 !!');
									e.preventDefault();
									alert("d.preBlock : "+d.preBlock);
									list(d.preBlock);
								}).appendTo('#pg_ul');
			};
			//페이지 숫자
			for(let i=d.beginPage; i<=d.endPage;i++){
				$('<li/>').append($('<a href="#"/>').html(i))
				.click(e=>{
					//페이지 클릭이벤트
					app.service.list({pageNum:i});
				})
				.appendTo('#pg_ul');
			};
			
			
			
			if(d.existNext==true){
				$('<li/>').append(
						$('<a href="#"/>').append(
								$('<span/>').addClass("glyphicon glyphicon-chevron-right"))).click(e=>{
									alert(' 다음 페이지 !!');
									e.preventDefault();
									alert("d.nextBlock : "+d.nextBlock);
									list(d.nextBlock);
								}).appendTo('#pg_ul');
			};
		
			
		});
	};

	
	
	
	
	
	return{init:init,
			list:list};
})();

app.page=(()=>{
	var listBrd=()=>{
		/*  */
		let list_compo = $('<div/>').attr({id:"container"}).addClass("container").appendTo('#contents');
		$('<div/>').attr({id:"list_row"}).addClass("row").appendTo("#container");
		
		/* 리스트   */
		$('<div/>').attr({id:"list_col"}).addClass("col-md-12").appendTo($('#list_row'));
		$('<div/>').attr({id:"list_tbl"}).addClass("table-responsive").appendTo($('#list_col'));
		$('<table/>').attr({id:"board_table"}).addClass("table table-bordred table-striped").appendTo('#list_tbl');
		$('<thead/>').attr({id:"board_thead"}).appendTo('#board_table');
		$('<th/>').append($('<span/>').html("NO")).appendTo('#board_thead');
		$('<th/>').append($('<span/>').html("제목")).appendTo('#board_thead');
		$('<th/>').append($('<span/>').html("작성자")).appendTo('#board_thead');
		$('<th/>').append($('<span/>').html("작성일자")).appendTo('#board_thead');
		$('<tbody>').appendTo('#board_table');
		
		/* 검색 및 글쓰기 버튼  */
		$('<div/>').attr({id:"btn_col"}).addClass("col-md-12").appendTo($('#list_row'));
		
		//검색set
		$('<div/>').addClass("col-xs-8 col-xs-offset-2").append(
				$('<div/>').attr({id:"in_gr"}).addClass("input-group")
				).appendTo('#btn_col');
		$('<div/>').attr({id:"search_bt_div"}).addClass("input-group-btn search-panel").appendTo("#in_gr");
		$('<button>').attr({ id:"drop_btn", 'type':"button", 'data-toggle':"dropdown"}).addClass("btn btn-default dropdown-toggle").appendTo("#search_bt_div");
		$('<span/>').attr({id:"search_concept"}).html("제목").appendTo("#drop_btn");
		$('<span/>').addClass("caret").appendTo("#drop_btn");
		$('<ul/>').addClass("dropdown-menu").attr({'role':"menu",id:"drop_ul"}).appendTo("#search_bt_div");
		$('<li/>').append($('<a/>').attr({href:"#"}).html("제목")).appendTo("#drop_ul");
		$('<li/>').append($('<a/>').attr({href:"#"}).html("내용")).appendTo("#drop_ul");
		$('<input/>').attr({type:"hidden",id:"search_param", name:"search_param", value:"all"}).appendTo("#in_gr");
		$('<input/>').attr({type:"text",id:"input_keyword", name:"x", placeholder:"Search.."}).addClass("form-control").appendTo("#in_gr");
		$('<span/>').addClass("input-group-btn").attr({id:"in_gr_bt"}).appendTo("#in_gr");
		$('<button>').addClass("btn btn-default").attr({id:"search_btn",type:"button"}).click(e=>{
			alert("서치 버튼 눌림");
			list({pageNum:1, keyword:$('#input_keyword').val()});
		}
				/*
				 * click 내에서 널값 삼항 시도, but 안됨
				 * ($('#input_keyword').val()==null?
				function(){console.log("없ㅇ므"); alert("없ㅇ므");}:
				function(e){$.getJSON($.ctx()+'/board/search/'+$('#input_keyword').val(),d=>{
						alert(" 키워드 입력 받음 : "+$('#input_keyword').val());
						// 다시 리스트 구성
					});	
					})
				*/
				
		).appendTo("#in_gr_bt");
		$('<span/>').addClass("glyphicon glyphicon-search").appendTo("#search_btn");
		
		//글쓰기
		$('<button/>').attr({id:"write_btn"}).html("글쓰기").addClass("btn btn-default").appendTo('#btn_col');
		
		return list_compo;
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
		        '</table>'
		          '<!-- soap방식: <input type="submit" class="btn btn-primary pull-right" value="글쓰기"> -->'
		          '<button class="btn btn-primary pull-left">목록가기</button>'
		          '<button class="btn btn-primary pull-right">글쓰기 완료</button>'
		      '</div>'
		     '</div>'
		  '</div>'
	};
	var detailBrd=()=>{
		
		
	};
	return{listBrd:listBrd,
		addBrd:addBrd,
		detailBrd,detailBrd};
})();


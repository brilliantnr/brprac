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
		
		app.service.init();
	};
	return {init : init};
})();

app.service=(()=>{
	
	var init=()=>{
		console.log('step2 : app.service.init 진입'); 
		//add();
		
		app.page.listBrd();
		list({pageNum:1});
		
		
		/* 버튼 모음 */

		$('#list_btn').click(e=>{
			alert('버튼 클릭');
			app.service.init();
		});
		/*$('#write_btn').click(e=>{
			alert('글쓰기 버튼 클릭');
			add();
		});*/
		$('#complete_btn').click(e=>{
			alert('버튼 클릭');
			app.service.init();
		});
		$('#update_btn').click(e=>{
			alert('버튼 클릭');
			//비밀번호 확인 과정 필요
			app.page.detailBrd();
		});
		$('#delete_btn').click(e=>{
			alert('버튼 클릭');
			//비밀번호 확인 과정 필요
			app.page.detailBrd();
		});
		

		
		
		
	};
	var list=x=>{
		$('tbody').empty();
		$('#pagination').remove();
		//$('#wrapper').append(app.page.listBrd());
		
		
		//button();
		console.log('step3: app.service.list 진입');
		console.log('x.pageNum : '+x.pageNum);
		console.log('x.keyword : '+x.keyword);
		//getJSON START========================================================================================================
		$.getJSON($.ctx()+'/board/list/'+x.pageNum+'/'+x.keyword,d=>{
			console.log("getJSON 시작");
			
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
						$('<td/>').attr({id:"num_"+j.num ,style:"text-align: center;"}).html(j.num),
						$('<td/>').append($('<a href="#"/>').attr({id:"title_"+j.num}).html(j.title)
								.click(e=>{
									let $num = $('#num_'+j.num).html();
									console.log("클릭 후 : "+$('#num_'+j.num).html());
									$.getJSON($.ctx()+"/board/detail/"+$('#num_'+j.num).html(),d=>{
										alert($num);
										detail($num);
									});
						})
						),
						$('<td/>').attr({style:"text-align: center;"}).html(j.writer),
						$('<td/>').attr({style:"text-align: center;"}).html(transTime(j.regidate))
				).appendTo($('#tbody_list'));
				
				
				/* 게시글클릭을 빼보자 */
				/*$('#title_'+j.num)
				.click(e=>{
						//제목 클릭 이벤트
					console.log("$('#title_'+j.num).val() : "+$('#title_'+j.num).val());
						$.getJSON($.ctx()+"/board/detail/"+$('#title_'+j.num).val(),d=>{
							alert($('#title_'+j.num).val());
						});
						
				});*/
				
				
			});

			 //페이지네이션  구성 시작
			$('<div/>').attr({id:"pagination", style:"text-align: center;"}).addClass("clearfix").appendTo("#list_row");
			$('<ul/>').addClass("pagination").attr({id:'pg_ul', style:"margin-left: auto;margin-right: auto;"}).appendTo("#pagination");
			
			let prev = (d.existPrev)? '': 'disabled';
			let next = (d.existNext)? '':'disabled';
			
			//이전버튼
			$('<li/>').addClass(prev).append(
					$('<a href="#"/>').append(
							$('<span/>').addClass("glyphicon glyphicon-chevron-left "))).click(e=>{
								if(prev==''){
									e.preventDefault();
									alert("d.preBlock : "+d.preBlock);
									list({pageNum: d.preBlock, keyword:d.keyword});
								};
							}).appendTo('#pg_ul');
	
			//페이지 숫자
			for(let i=d.beginPage; i<=d.endPage;i++){
				$('<li/>').append($('<a href="#"/>').html(i))
				.click(e=>{
					//페이지 클릭이벤트
					app.service.list({pageNum:i, keyword:d.keyword});
				})
				.appendTo('#pg_ul');
			};
			
			//다음버튼
			$('<li/>').addClass(next).append(
					$('<a href="#"/>').append(
							$('<span/>').addClass("glyphicon glyphicon-chevron-right "))).click(e=>{
								if(next==''){
									e.preventDefault();
									alert("d.nextBlock : "+d.nextBlock);
									app.service.list({pageNum: d.nextBlock, keyword:d.keyword});
								};
							}).appendTo('#pg_ul');
			
		});
		//getJSON END========================================================================================================
		/*$('#write_btn').click(e=>{
			alert('글쓰기 버튼 클릭');
			add();
		});*/
	};
	var add=()=>{
		$('#wrapper').html(app.page.addBrd());
		let $title = $('#input_title');
		
		
		$('#complete_btn').click(e=>{
			alert('완료 버튼 클릭');
			alert($title);
			 $.ajax({
	             url : $.ctx()+'/board/add',
	             method : 'post',
	             contentType : 'application/json',
	             data : JSON.stringify({
	            	 title : $title.val(),
	            	 content :$('#input_content').val(),
	            	 writer :$('#input_writer').val(), 
	            	 pw : $('#input_pw').val(),
	             }),
	             success : d=>{
	            	 //app.service.list({pageNum:1});
	            	 alert('게시글 입력 완료 ');
	            	$('#wrapper').empty();
	         		$('#wrapper').append($('<div/>').attr({id : 'contents'}));
	            	 app.page.listBrd();
	         		list({pageNum:1});
	             }
	           });
		});
		
	};
	var detail=x=>{
		$('#wrapper').html(app.page.detailBrd());
		$.getJSON($.ctx()+'/board/detail/'+x,d=>{
			console.log('d.detail : '+d.detail.title);
			$('#td_content1').html(d.detail.num);
			$('#td_content2').html(d.detail.title);
			$('#td_content3').html(d.detail.writer);
			$('#td_content4').html(d.detail.content);
		});
		/*
		 +'<td id="td"'+i +' style="width: 160px; text-align: center;"></td>'
            +'<td id="td_content"'+i +' style="text-align: left;"></td>'
	                +'<tr>'
	                  +'<td style="width: 160px; text-align: center;">글제목</td>'
	                  +'<td style="text-align: left;">값불러오기</td>'
	                +'</tr>'
	                +'<tr>'
	                  +'<td style="width: 160px; text-align: center;">작성자</td>'
	                  +'<td style="text-align: left;">값불러오기</td>'
	                +'</tr>'
	                +'<tr>'
	                  +'<td style="width: 160px; text-align: center;">비밀번호</td>'
	                  +'<td style="text-align: left;">값불러오기</td>'
	                +'</tr>'
	                +'<tr>  '
	                  +'<td style="width: 160px; text-align: center;">내용</td>'
	                  +'<td style="text-align: left;">값불러오기</td>'
	                +'</tr> '
		*/
		
		
	};
	
	
	
	
	return{init:init,
			list:list,
			add:add,
			/*button:button*/
			};
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
		$('<th/>').attr({style:"width:10%; text-align: center;"}).append($('<span/>').html("NO")).appendTo('#board_thead');
		$('<th/>').attr({style:"width:60%; text-align: center;"}).append($('<span/>').html("제목")).appendTo('#board_thead');
		$('<th/>').attr({style:"width:15%; text-align: center;"}).append($('<span/>').html("작성자")).appendTo('#board_thead');
		$('<th/>').attr({style:"text-align: center;"}).append($('<span/>').html("작성일자")).appendTo('#board_thead');
		$('<tbody>').attr({id:"tbody_list"}).appendTo('#board_table');
		
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
		/*
		 * <select class="form-control" id="artist_name" name="account">
		 * 	<option>방탄소년단</option>
		 * 	<option>트와이스</option>
		 * 	<option>레드벨벳</option>
		 * </select>
		 * */
		$('<select/>').addClass("dropdown-menu").attr({'role':"menu",id:"drop_select"}).appendTo("#search_bt_div");
		$('<option/>').html('제목').appendTo("#drop_select");
		$('<option/>').html('내용').appendTo("#drop_select");
		
		$('<ul/>').addClass("dropdown-menu").attr({'role':"menu",id:"drop_ul"}).appendTo("#search_bt_div");
		$('<li/>').append($('<a/>').attr({href:"#"}).html("제목")).appendTo("#drop_ul");
		$('<li/>').append($('<a/>').attr({href:"#"}).html("내용")).appendTo("#drop_ul");
		
		$('<input/>').attr({type:"hidden",id:"search_param", name:"search_param", value:"all"}).appendTo("#in_gr");
		$('<input/>').attr({type:"text",id:"input_keyword", name:"x", placeholder:"Search.."}).addClass("form-control").appendTo("#in_gr");
		$('<span/>').addClass("input-group-btn").attr({id:"in_gr_bt"}).appendTo("#in_gr");
		$('<button>').addClass("btn btn-default").attr({id:"search_btn",type:"button"}).click(e=>{
			/* search 버튼 이벤트 */
			alert("서치 버튼 클릭");
			app.service.list({pageNum:1, keyword:$('#input_keyword').val()});
		}).appendTo("#in_gr_bt");
		$('<span/>').addClass("glyphicon glyphicon-search").appendTo("#search_btn");
		//bootstrap.min.js
		$(document).ready(function(e){
		    $('.search-panel .dropdown-menu').find('a').click(function(e) {
				e.preventDefault();
				var param = $(this).attr("href").replace("#","");
				var concept = $(this).text();
				$('.search-panel span#search_concept').text(concept);
				$('.input-group #search_param').val(param);
			});
		});
		//bootstrap.min.js 끝
		
		//글쓰기
		$('<button/>').attr({id:"write_btn"}).html("글쓰기").addClass("btn btn-default").appendTo('#btn_col')
		.click(e=>{
			alert('글쓰기 버튼 클릭');
			app.service.add();
		});

		return list_compo;
	};
	var addBrd=()=>{
		let addBrdPage = '<div id="addBrd_container" class="container">'
		      +'<div class="row">'
		        +'<div class="col-md-12">'
		            +'<table class="table table-striped" style="text-align:center; border:1px solid #dddddd;">'
		              +'<thead>'
		                +'<tr>'
		                  +'<th colspan="2" style="background-color:#eeeeee; text-align: center;">게시글 작성</th>'
		                +'</tr>       '
		              +'</thead>'
		              +''
		              +'<tbody>'
		                +'<tr>'
		                  +'<td style="width: 160px; text-align: center;">글제목</td>'
		                  +'<td><input type="text" class="form-control" id="input_title" maxlength="50"></td>'
		                +'</tr>'
		                +'<tr>'
		                  +'<td style="width: 160px; text-align: center;">작성자</td>'
		                  +'<td><input type="text" class="form-control" id="input_writer" maxlength="50"></td>'
		                +'</tr>'
		                +'<tr>'
		                  +'<td style="width: 160px; text-align: center;">비밀번호</td>'
		                  +'<td><input type="text" class="form-control" id="input_pw" maxlength="20"></td>'
		                +'</tr>'
		                +'<tr>  '
		                  +'<td style="width: 160px; text-align: center;">내용</td>'
		                  +'<td><textarea class="form-control" id="input_content" maxlength="2048" style="height:350px"></textarea></td>'
		                +'</tr> '
		              +'</tbody>'
		              
		              
		            +'</table>'
		            +'<div id="btn_div" style="text-align: right;">'
		              	+'<button id="list_btn" class="btn btn-primary pull-left">목록가기</button>'
		                +'<button id="complete_btn" class="btn btn-primary pull-right">글쓰기 완료</button>'
		            +'</div>'
		            +''
		              +'<!-- soap방식: <input type="submit" class="btn btn-primary pull-right" value="글쓰기"> -->'
		          +'</div>'
		         +'</div>'
		      +'</div>';
		
		
		//$('#addBrd_container').appendTo('#contents');
	      return addBrdPage;
	};
	var detailBrd=()=>{
		let detailPage = '<div class="container">'
		      +'<div class="row">'
		        +'<div class="col-md-12">'
		            +'<table class="table table-striped" style="text-align:center; border:1px solid #dddddd;">'
		              +'<thead>'
		                +'<tr>'
		                  +'<th colspan="2" style="background-color:#eeeeee; text-align: center;">게시글</th>'
		                +'</tr>       '
		              +'</thead>'
		              +''
		              +'<tbody>'
		              +'<tr>'
		              +'<td id="td1" style="width: 160px; text-align: center;">NO</td>'
		              +'<td id="td_content1" style="text-align: left;"></td>'
		            +'</tr>'
		            +'<tr>'
		            +'<td id="td2" style="width: 160px; text-align: center;">글제목</td>'
		              +'<td id="td_content2" style="text-align: left;"></td>'
		            +'</tr>'
		            +'<tr>'
		            +'<td id="td3" style="width: 160px; text-align: center;">작성자</td>'
		              +'<td id="td_content3" style="text-align: left;"></td>'
		            +'</tr>'
		            +'<tr>'
		            +'<td id="td4" style="width: 160px; text-align: center;">내용</td>'
		              +'<td id="td_content4" style="text-align: left;"></td>'
		            +'</tr>'
		              +'</tbody>'
	            +'</table>'
	              +'<div id="btn_div" style="text-align: right;">'
	                +'<button id="update_btn" class="btn btn-primary">수정</button>'
	                +'<button id="delete_btn" class="btn btn-primary">삭제</button>'
	              +'</div>'
	          +'</div>'
	         +'</div>'
	      +'</div>';
		return detailPage;
	};
	return{listBrd:listBrd,
		addBrd:addBrd,
		detailBrd,detailBrd};
})();


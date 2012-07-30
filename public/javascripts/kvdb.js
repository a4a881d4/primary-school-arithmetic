$(function() {

	$('#tabs').tabs();

	$( "button" ).button();
 	
	$('#get').click( function () {
		$('#TestEasy').html("");	
		$.get('./list','', function(data,textStatus) {
			if( textStatus == 'success' ) {
				var ret=JSON.parse(data);
				var str = '<ul id="tis" class="ui-widget ui-helper-clearfix">';
				for( var i in ret ) {
					console.log('key='+i);
					str += '<li class="ui-state-default ui-corner-all">';
					str += '<span class="fixwidth">';
					str += '</span>';
					str += '<input class="fixwidth" type="text"></input>';
					str += '</li>';
				}
				str += '</ul>';
				$('#TestEasy').append(str);
			}
		});
	
		$('#TestEasy ul li').each( function() {
			var max = $("#maxInt").val();
			var T = genTi( max );
			$(this).children('span').append(T['timu']);
			$(this).children('input').attr("res",T["res"]);
		});

		$('#TestEasy ul li input').blur( function () {
			var myin = $(this).val();
			var mySpan = $(this);
			if( myin.length==0 )
				mySpan.css("color","grey");
			else if( myin == $(this).attr("res") )
				mySpan.css("color","green");
			else
				mySpan.css("color","red");
		});
	
	});

	$('#set').click( function () {
		var K = $('#K' ).val();
		var V = $('#V' ).val();
		var req = { 'K':K, 'V':V };
		$.post('./set',req, function(data,textStatus) {
			alert('html return'+textStatus);
			if( textStatus == 'success' ) {
				$('span#setret').html('OK');
			}
			else {
				$('span#setret').html('ERR');
			}
		});
	});
	
	$('#buttonB').click( function () {
		var sumNc = 0;
		var sumR = 0;
		var sumE = 0;
		$('#TestEasy ul li input').each( function() {
			var myin = $(this).val();
			var mySpan = $(this);
			if( myin.length==0 )
				sumNc += 1;
			else if( myin == $(this).attr("res") )
				sumR += 1;
			else
				sumE += 1;
		});
		$('#NOC').html(sumNc);
		$('#RIGHT').html(sumR);
		$('#ERROR').html(sumE);
		$('#sinceCountdown').countdown('pause');
		$('.icons').css('display','block');
	});

	$( "#add" ).button();
	$( "#sub" ).button();
	$( "#mul" ).button();
	$( "#div" ).button();
	

});


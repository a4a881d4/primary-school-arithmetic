$(function() {

	$.ajaxSetup({ cache: false });

	$('#tabs').tabs();

	$( "button" ).button();
 	
	$('#get').click( function () {
		$('#TestEasy').html("");
		var ret={};	
		$.get('./list','', function(data,textStatus) {
			if( textStatus == 'success' ) {
				ret=JSON.parse(data);
				var str = '<ul id="tis" class="ui-widget ui-helper-clearfix">';
				for( var i in ret ) {
					console.log('key='+i);
					str += '<li class="ui-state-default ui-corner-all">';
					str += '<span class="fixwidth my">';
					str += i;
					str += '</span>';
					str += '<input class="fixwidth" type="text" value="'+ret[i]+'"></input>';
					str += '<button class="setvalue">set</button>';
					str += '</li>';
				}
				str += '</ul>';
				$('#TestEasy').append(str);
				$('button.setvalue').button();

				$('button.setvalue').click( function () {
					var P = $(this).parent();
					var K = P.children('.my').html();
					var V = P.children('input').val();
					var req = { 'K':K, 'V':V };
					console.log(K+':'+V);
					$.post('./set',req, function(data,textStatus) {
						if( textStatus == 'success' ) {
							P.find('button').html('OK');
						}
						else {
							P.find('button').html('ERR');
						}
					});
				});
			}
		});
	});


	$('#set').click( function () {
		var K = $('#K' ).val();
		var V = $('#V' ).val();
		var req = { 'K':K, 'V':V };
		$.post('./set',req, function(data,textStatus) {
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


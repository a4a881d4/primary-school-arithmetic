function randInt( max )
{
	var ret = Math.round(max*Math.random());
	return ret;
}

function genAdd( max )
{
	var a = randInt( max );
	var b = randInt( max );
	var c;
	var str="";
	if ( a > b )
	{
		str += b;
		str += "+";
		str += a-b;
		str += "=";
		c = a;
	}	
	else {
		str += a;
		str += "+";
		str += b-a;
		str += "=";
		c = b;
	}
	return { timu:str, res:c };
}

function genSub( max )
{
	var a = randInt( max );
	var b = randInt( max );
	var c;
	var str="";
	if ( a > b )
	{
		str += a;
		str += "-";
		str += b;
		str += "=";
		c = a-b;
	}	
	else {
		str += b;
		str += "-";
		str += a;
		str += "=";
		c = b-a;
	}
	return { timu:str, res:c };
}

function genMul( max )
{
	var a;
	var b;
	do {
		a = randInt( Math.sqrt(max) )+1;
		b = randInt( max/a );
	} while( a*b>max );
	var c=a*b;
	var str="";
	str += a;
	str += "&times;";
	str += b;
	str += "=";
	return { timu:str, res:c };
}

function genDiv( max )
{
	var a;
	var b;
	do {
		a = randInt( Math.sqrt(max) )+1;
		b = randInt( max/a );
	} while( a*b>max );
	var c=a*b;
	var str="";
	str += c;
	str += "&divide;";
	str += a;
	str += "=";
	return { timu:str, res:b };
}

function genTi( max )
{
	while(1)
	{
		var s = Math.floor(4.*Math.random());
		switch( s ){
			case 0:
				if( $('input#add').attr('checked')=='checked' )
					return genAdd(max);
				break;
			case 1:
				if( $('input#sub').attr('checked')=='checked' )
					return genSub(max);
				break;
			case 2:
				if( $('input#mul').attr('checked')=='checked' )
					return genMul(max);
				break;
			case 3:
				if( $('input#div').attr('checked')=='checked' )
					return genDiv(max);
				break;
			default:
				break;
		}
	}
}

$(function() {

	$('#print').prepend('<a class="print-preview">打印</a>');
	$('a.print-preview').printPreview();
	$('input[type=checkbox]').change( function() {
		if( $('input[type=checkbox]:checked').length ==0 ) {
			alert("至少选择一种运算");
			$(this).attr('checked','checked');
		}
	});

	$('#tabs').tabs();

	$( "#buttonA" ).button();
	$( "#buttonB" ).button();
 	
	$('#buttonA').click( function () {
		$('#TestEasy').html("");	
		$('#TestEasy').append(testTable);
		function testTable() {
			var num = $("#number").val();
			var str = '<ul id="tis" class="ui-widget ui-helper-clearfix">';
			for( var i = 0;i<num; i++ ) {
				str += '<li class="ui-state-default ui-corner-all">';
				str += '<span class="fixwidth">';
				str += '</span>';
				str += '<input class="fixwidth" type="text"></input>';
				str += '</li>';
			}
			str += '</ul>';
			return str;
		}
	
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
	
		$('#sinceCountdown').countdown('destroy');
		var now = new Date();
		$('#sinceCountdown').countdown({since: now,format: 'MS'})
		  					.css("display","block");
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
		var req = {};		
		$('#TestEasy ul li').each( function() {
			var i = $('#TestEasy ul li').index(this);
			var a = ""+i;			
			req[a]={};
			req[a]['K']=$(this).children('span').html();
			var str = {};
			str['right']=$(this).children('input').attr("res");
			str['answer']=$(this).children('input').val();
			req[a]['V']=JSON.stringify(str);
		});
		$.post('/set',req);
	});

	$( "#add" ).button();
	$( "#sub" ).button();
	$( "#mul" ).button();
	$( "#div" ).button();
	

});


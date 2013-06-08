;
// IE6 background image caching fix.
// Include this JavaScript at the top of your page.
try {
document.execCommand("BackgroundImageCache", false, true);
} catch(e) {}
(function($){
	$.fn.bouncyPlugin=function(option){
		var DHTMLSprite=function(params)
		{
			var width=params.width;
			var height=params.height;
			var imagesWidth=params.imagesWidth;
			var $element=params.$drawtarget.append('<div/>').find(':last');
			var elemStyle=$element[0].style;
			mathfloor=Math.floor;
			$element.css({
				position:'absolute',
				width:width,
				height:height,
				backgroundImage:'url('+params.images+')'
			});
			var that={
				draw:function(x,y){
					elemStyle.left=x+'px';
					elemStyle.top=y+'px';
				},
				changeImage:function(index){
					var hOffset=(index%(imagesWidth/width))*width;
					var vOffset=-mathfloor(index/(imagesWidth/width))*height;
			//$("element").css({"background-position":hOffset+'px'+vOffset+'px'});
			elemStyle.backgroundPosition=hOffset+'px '+vOffset+'px';
		},
		show: function () {
			elemStyle.display = 'block';
		},
		hide: function () {
			elemStyle.display = 'none';
		},
		destroy: function () {
			$element.remove();
		}
	};
	return that;
};
var bouncySprite=function(params){
	var x = params.x,
	y = params.y,
	xDir = params.xDir,
	yDir = params.yDir,
	maxX = params.maxX,
	maxY = params.maxY,
	animIndex=0;
	var that=DHTMLSprite(params);
	that.moveAndDraw=function(tCoeff){
		x += xDir * tCoeff;
		y += yDir * tCoeff;
		animIndex += xDir>0?1*tCoeff :-1*tCoeff;
		var animIndex2 = (animIndex % 5) >> 0;
		animIndex2 += animIndex2 < 0 ? 5 : 0;
		if ((xDir < 0 && x < 0) || (xDir > 0 && x >= maxX)) {
			xDir = -xDir;
		}
		if ((yDir < 0 && y < 0) || (yDir > 0 && y >= maxY)) {
			yDir = -yDir;
		}
		that.changeImage(animIndex2);
		that.draw(x, y);
	}
	return that;
};

var bouncyBoss = function (numBouncy, $drawtarget) {
	var bouncys = [];
	timer = timeInfo(40);
	for (var i = 0; i < numBouncy; i++) {
		bouncys.push(bouncySprite({
			images: 'sprite.png',
			imagesWidth: 256,
			width: 64,
			height: 64,
			$drawtarget: $drawtarget,
			x: Math.random() * ($drawtarget.width() - 64),
			y: Math.random() * ($drawtarget.height() - 64),
			xDir: Math.random() * 4 - 2,
			yDir: Math.random() * 4 - 2,
			maxX: $drawtarget.width() - 64,
			maxY: $drawtarget.height() - 64
		}));
	}
	var moveAll = function () {
		var timeData = timer.getInfo();
		var len = bouncys.length;
		for (var i = 0; i < len; i++) {
			bouncys[i].moveAndDraw(timeData.coeff);
		}
		setTimeout(moveAll, 10);
	}
// Call the moveAll() function to start.
moveAll();
};
option=$.extend({},$.fn.bouncyPlugin.defaults,option);
return this.each(function(){
	var $drawtarget = $(this);
	$drawtarget.css('background-color',option.bgColor);
	bouncyBoss(option.numBouncy,$drawtarget);
});
};
$.fn.bouncyPlugin.defaults={
	bgColor:"#f00",
	numBouncy:10
};
})(jQuery);
var timeInfo = function (goalFPS) {
	var oldTime, paused = true,
	iterCount = 0,
	totalFPS = 0;
	totalCoeff = 0;
	return {
		getInfo: function () {
			if (paused == true) {
				paused = false;
				oldTime = +new Date();
				return {
					elapsed: 0,
					coeff: 0,
					FPS: 0,
					averageFPS: 0,
					averageCoeff: 0
				};
			}
var newTime = +new Date(); // get time in milliseconds
var elapsed = newTime - oldTime;
oldTime = newTime;
var FPS = 1000 / elapsed;
iterCount++;
totalFPS += FPS;
var coeff = goalFPS / FPS;
totalCoeff += coeff;
return {
	elapsed: elapsed,
	coeff: goalFPS / FPS,
	FPS: FPS,
	averageFPS: totalFPS / iterCount,
	averageCoeff: totalCoeff / iterCount
};
},
pause: function () {
	paused = true;
}
};
};
$(document).ready(function() {
	$('.draw-target').bouncyPlugin({
		numBouncy: 200,
		bgColor: '#8ff'
	});
});
	/*var params={
		images:"sprite.png",
		imagesWidth:256,
		width:64,
		height:64,
		$drawtarget:$("#canvas"),
		x:20,
		y:30,
		xDir:10,
		yDir:10,
		maxX:500-64,
		maxY:300-64
	};
	var params2={
		images:"sprite.png",
		imagesWidth:256,
		width:64,
		height:64,
		$drawtarget:$("#canvas"),
		x:40,
		y:70,
		xDir:20,
		yDir:10,
		maxX:500-64,
		maxY:300-64
	};
	var sprite1=bouncySprite(params);
	var sprite2=bouncySprite(params2);*/
	//bouncyBoss(100,$("#canvas"));
	//x=0;
	//setInterval(function() {
	//	sprite1.moveAndDraw();
	//	sprite2.moveAndDraw();
	//	x++;
	//}, 40);
//});
/* the html for this
body{
	margin: 0px;
	padding: 0px;
}
#canvas
{
	width:500px;
	height:300px;
	background-color: black;
	position: relative;
}
.draw-target {
width:100%;
height:100%;
position:relative;
float:left;
margin:1px;
}*?
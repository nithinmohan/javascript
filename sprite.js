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
	that.moveAndDraw=function(){
		x += xDir;
		y += yDir;
		animIndex += xDir > 0 ? 1:-1;
		animIndex %= 4;
		animIndex += animIndex < 0 ? 4 : 0;
		if ((xDir < 0 && x < 0) || (xDir > 0 && x >= maxX)) {
			xDir = -xDir;
		}
		if ((yDir < 0 && y < 0) || (yDir > 0 && y >= maxY)) {
			yDir = -yDir;
		}
		that.changeImage(animIndex);
		that.draw(x, y);
	}
	return that;
};

var bouncyBoss = function (numBouncy, $drawtarget) {
	var bouncys = [];
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
var len = bouncys.length;
for (var i = 0; i < len; i++) {
bouncys[i].moveAndDraw();
}
setTimeout(moveAll, 10);
}
// Call the moveAll() function to start.
moveAll();
};
$(document).ready(function(){
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
	bouncyBoss(100,$("#canvas"));
	x=0;
	setInterval(function() {
	//	sprite1.moveAndDraw();
	//	sprite2.moveAndDraw();
		x++;
	}, 40);
});
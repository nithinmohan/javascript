
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
		},
		pos:function(){
			return{
				x:parseInt(elemStyle.left),
				y:parseInt(elemStyle.top)
			}
		}
	};
	return that;
};

var ctrlSprite=function(params){
	var that=DHTMLSprite(params);
	that.move=function(x,y){
		var coeff=y/x;
		if(x==0 &&y>0)
		coeff=1;
		if(x==0 &&y<0)
		coeff=-1;
		var fps=1;
		ycoeff=fps*coeff;
		xcoeff=fps;
		if(x==0)
			xcoeff=0;
		if(y==0)
			ycoeff=0;
		if(x==0 && y==0)
		{
		clearTimeout();
		return true;
	    }
	    else
	    {
		oldpos=that.pos();
		var a=oldpos.x;
		var b=oldpos.y;
		that.draw(a+xcoeff,b+ycoeff);
		setTimeout(function(){that.move(x-xcoeff,y-ycoeff)},20);
	}
	};
	that.isbound=function()
	{
		var pos=that.pos();
		return{
		xbound:pos.x>=params.xmin && pos.x<=params.xmax,
		ybound:pos.y>=params.ymin && pos.y<=params.ymax
	}
	};
	that.right=function()
	{
		if(that.isbound().xbound==true)
		that.move(4,0);
	    return that.isbound().xbound;
	};
	that.left=function()
	{
		if(that.isbound().xbound==true)
		that.move(-4,0);
	    return that.isbound().xbound;
	};
	that.up=function()
	{
		if(that.isbound().ybound==true)
		that.move(0,-4);
	 	return that.isbound().ybound;
	};
	that.down=function()
	{
		if(that.isbound().ybound==true)
		that.move(0,4);
	 	return that.isbound().ybound;
	};
	that.jump=function(height)
	{
		/*setInterval(function(){that.up();},20);
		if(that.pos().y>=maxpos)
		clearInterval();*/
		//else ifthat.down();

		status=that.move(0,-height);
		/*setInterval(function() {if(status==true)
			that.move(0,height);clearInterval();},4);*/
		//that.move(0,height);

	}
	return that;
};

$(document).ready(function() {
	
	var params={
		images:"sprite.png",
		imagesWidth:256,
		width:64,
		height:64,
		$drawtarget:$("#canvas"),
		xmin:0,
		xmax:400,
		ymin:0,
		ymax:300
	    };
	    var sprite1=ctrlSprite(params);
	    sprite1.draw(40,140);
	    //setInterval(function(){sprite1.right();sprite1.down();},40);
	   // sprite1.move(5,70);

	  //  sprite1.draw(40,40);
	    //sprite1.move(120,150);
	   sprite1.jump(100);
	   //setInterval(function(){sprite1.jump(0);},40);
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
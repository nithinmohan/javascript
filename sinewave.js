var fastSin = function(steps) {
var table = [],
ang = 0,
angStep = (Math.PI * 2) / steps;
do {
table.push(Math.sin(ang));
ang += angStep;
} while (ang < Math.PI * 2);
return table;
};
var makedivs=function()
{
divs="";
for(i=0;i<500;i++)
{
	divs=divs+"<div style='position:absolute;width:1px;height:40px;top:0px;background-color:red;left:"+i+"px;'></div>";
}
$("#canvas").append(divs);
};
var drawsine=function(height,ang,freq)
{
	var sinTable = fastSin(4096);
	bars=$("#canvas").children();
	for(i=0;i<500;i++)
	{
		bars[i].style.top=140+height*Math.sin(ang+i*freq);
	}
}
$(document).ready(function(){
makedivs();
drawsine(10,30,.2);
});
x=1;
setInterval(function() {
drawsine(10, x,.2);
x++;
}, 50);
//drawsine(x*50,32-Math.sin(x*20)*16,50-Math.sin(x*10)*20);
//html,css code for the sinewave
/*<html>
<head>
<script src="jquery.js"></script>
<script src="sinewave.js"></script>
<style>
body{
	margin: 0px;
	padding: 0px;
}
#canvas
{
	width:500px;
	height:300px;
	background-color: black;
}
</style>
</head>
<body>
<div id="canvas"></div>
</body>
</html>*/
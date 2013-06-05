var person=function(name,age)
{
	var that={name:name,
		getage:function(){return that.name+' has '+age+' age'}};
		return that;
}
var student=function(name,age,stnd)
{
	var that=person(name,12);
	that.class=stnd;
	return that;
}
var sasi=student("sasi",8,4);
sasi.name=14;
alert(sasi.getage());

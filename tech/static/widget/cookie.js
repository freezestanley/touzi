define( [], function(){
	var cookie = {};
	cookie.setCookie = function(name,value,time)
	{
		function getsec(str)
		{
			var str1=str.substring(1,str.length)*1;
			var str2=str.substring(0,1);
			if (str2=="s")
			{
			return str1*1000;
			}
			else if (str2=="h")
			{
			return str1*60*60*1000;
			}
			else if (str2=="d")
			{
			return str1*24*60*60*1000;
			}
		}
		var strsec = getsec(time);
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec*1);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
	};
	cookie.delCookie = function delCookie(name)
	{
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=cookie.getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	};
	cookie.getCookie = function(name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	};


    return cookie;

});
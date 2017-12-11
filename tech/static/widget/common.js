define(['/widget/cookie.js'], function(cookie){
	window.cok = cookie;
	window.dateFormat = function dateFormat(time,detail,prefix){
		if(!time) return;
		function fixlength(n){
			return n.toString().length<2?'0'+n:n;
		};
		var fix = prefix || '-';
		var dtime = new Date(time);
		var year = dtime.getFullYear();
		var month = dtime.getMonth()+1;
		month= fixlength(month);
		var date = dtime.getDate();
		date= fixlength(date);

		var hours = dtime.getHours();
		hours= fixlength(hours);
		var minutes = dtime.getMinutes();
		minutes= fixlength(minutes);
		var seconds = dtime.getSeconds();
		seconds= fixlength(seconds);

		var result = detail?(year+fix+month+fix+date+' '+hours+':'+minutes+':'+seconds):(year+fix+month+fix+date);

			return result;

	};

    return common;

});

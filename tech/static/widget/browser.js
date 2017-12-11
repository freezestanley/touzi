(function(){
   var test = document.createElement('div');
   test.innerHTML = '<!--[if lte IE 10]>1<![endif]-->';
   if ('1' === test.innerHTML) {
   	window.location.href='/update.html';
   }
 })();

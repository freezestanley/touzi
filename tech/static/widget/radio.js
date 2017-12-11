define(function (){

	   function radioSon(obj){
	   		this.son = $(obj).find('.radio');
	   		this.input = $(obj).find('.radioval');
	   		var _self = this;
	   		this.son.on('click',function(e){
	   			var target = $(e.target);
	   			_self.son.removeClass('seled');
	   			target.addClass('seled');
	   			$(_self.input).val(target.attr('data-value'));
	   		});
	   };
	   function radio(){
	   		var _self = this;
	   		var radio = $('.vRadio');
	   		for(var i=0;i<radio.length;i++){
	   			var ele = new radioSon(radio[i]);
	   		};

	   };

	   function select(obj){
	   		var _self = this;
	   		this.input = $(obj).find('.selectval');
	   		this.selectDom = $(obj).find('.selectDom');
	   		this.selectTxt = $(obj).find('.selectTxt');
	   		this.selectDom.on('change',function(e){
	   			var val = _self.selectDom.val();
	   			_self.input.val(val);
	   			_self.selectTxt.html(_self.selectDom.find("option:selected").text());
	   		});
	   };


　　　　return {
			vradio: radio,
			vselect:select
　　　　};
　　});
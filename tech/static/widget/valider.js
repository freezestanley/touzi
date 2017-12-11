define(['./radio.js'],function (Radio){
	   var _this;
	   var rules = {};
	    rules.len = function(obj,conf){
	    	var str = $.trim(obj);
	    	var con = conf.split('-');
	    	var min = con[0];
	    	if(con.length == 2){
	    		var max = con[1];
	    		if(str.length<min){
	    			return false;
	    		};
	    		if(str.length>max){
	    			return false;
	    		};
	    		return true;
	    	}else if(con.length == 1){
	    		if(str.length == min){
	    			return true;
	    		}else{
	    			return false;
	    		};
	    	};
	    };
	    rules.equal = function(obj,conf){
	    		var str = $.trim(obj);
	    		return (str == $.trim($(conf).val()))?true:false;
	    };
	   	rules.phone = function(obj,conf){
	   			 var reg = new RegExp(/^1[3|4|5|8|7|9][0-9]\d{8}$/);
	             return reg.test($.trim(obj));
	   		};
	   	rules.email=function(obj,conf){
	   			var reg = new RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/);
	             return reg.test($.trim(obj));
	   		};
	   	rules.numOrEn=function(obj,conf){
	   			var str = $.trim(obj);
	   			if(conf){
	   				var status = rules.len(str,conf);
	   				if(!status) 
	   					 return false;
	   			};
	   			var reg = new RegExp(/^[0-9a-zA-Z]*$/i);
	   			return reg.test($.trim(obj));
	   		};
	   	rules.numEn=function(obj,conf){
	   			var str = $.trim(obj);
	   			if(conf){
	   				var status = rules.len(str,conf);
	   				if(!status) 
	   					 return false;
	   			};
	   			var reg = new RegExp(/^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i);
	   			return reg.test($.trim(obj));
	   		};
	    rules.num=function(obj,conf){
	    		var str = $.trim(obj);
	    		if(conf){
	   				var status = rules.len(str,conf);
	   				if(!status) 
	   					 return false;
	   			};
	   			var reg = new RegExp(/^[0-9]*$/);
	   			return reg.test($.trim(obj));
	   		};
	   	rules.english = function(obj,conf){
	   			var str = $.trim(obj);
	   			if(conf){
	   				var status = rules.len(str,conf);
	   				if(!status) 
	   					 return false;
	   			};
	   			var reg = new RegExp(/^[A-Za-z]+$/);
	   			return reg.test(str);
	   		};
	   	rules.chinese= function(obj,conf){
	   			var str = $.trim(obj);
	   			if(conf){
	   				var status = rules.len(str,conf);
	   				if(!status) 
	   					 return false;
	   			};
	   			var reg = new RegExp(/^[\u4e00-\u9fa5],{0,}$/);
	   			return reg.test(str);
	   		};
	   	rules.bankCard = function(obj){
	   			var reg = new RegExp(/^\d{10,}$/);	
		    	return reg.test($.trim(obj));
	   		};
	   	rules.idCard=function(num){
	   			num = $.trim(num.toUpperCase());
		        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
		        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
		            //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。'); 
		            return false;
		        }
		        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
		        //下面分别分析出生日期和校验位 
		        var len, re;
		        len = num.length;
		        if (len == 15) {
		            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		            var arrSplit = num.match(re);

		            //检查生日日期是否正确 
		            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		            var bGoodDay;
		            bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		            if (!bGoodDay) {
		                //alert('输入的身份证号里出生日期不对！');   
		                return false;
		            } else {
		                //将15位身份证转成18位 
		                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
		                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		                var nTemp = 0,
		                    i;
		                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
		                for (i = 0; i < 17; i++) {
		                    nTemp += num.substr(i, 1) * arrInt[i];
		                }
		                num += arrCh[nTemp % 11];
		                return true;
		            }
		        }
		        if (len == 18) {
		            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		            var arrSplit = num.match(re);

		            //检查生日日期是否正确 
		            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		            var bGoodDay;
		            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		            if (!bGoodDay) {
		                //alert(dtmBirth.getYear()); 
		                //alert(arrSplit[2]); 
		                //alert('输入的身份证号里出生日期不对！'); 
		                return false;
		            } else {
		                //检验18位身份证的校验码是否正确。 
		                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
		                var valnum;
		                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		                var nTemp = 0,
		                    i;
		                for (i = 0; i < 17; i++) {
		                    nTemp += num.substr(i, 1) * arrInt[i];
		                }
		                valnum = arrCh[nTemp % 11];
		                if (valnum != num.substr(17, 1)) {
		                    //alert('18位身份证的校验码不正确！应该为：' + valnum); 
		                    return false;
		                }
		                return true;
		            }
		        }
		        return false;
	   		};

　　　　var init = function(obj){
			_this = obj;
		   var form = $('.vForm');
		   var _formArray =[];
		   for(var i=0;i<form.length;i++){
		   		var a = new vForm(form[i]);
		   		_formArray.push(a);
		   };
		   return _formArray;
　　　　};


	   function vForm(obj,parent){
	   		var _self = this;
	   		this.parent = parent||window;
	   		this.form = obj;
	   		this.init();
	   		var radio = new Radio.vradio();
	   		this.valid = function(){
	   			this.init();
	   			var status=true,ele,result;
	   			check:for(var i in this.require){
	   				ele = this.require[i];
	   				result = ele.valid();
	   				ele.toggle(result);
	   				if(!result){
	   					status = result;
	   					break check;
	   				};
	   			};
	   			if(!status) return false;

	   			checkhalf:for(var i in this.halfrequire){
	   				ele = this.halfrequire[i];
	   				var val = $.trim($(ele.dom).value());
	   				if(val.length==0)
	   						continue;
	   				result = ele.valid();
	   				ele.toggle(result);
	   				if(!result){
	   					status = result;
	   				};
	   			};
	   			if(!status){
	   			 	return false;
	   			}else{
	   				return true;
	   			}
	   		};
	   		this.submit = function(){
	   			this.form.submit();
	   		}
	   };
	   vForm.prototype.init=function(){
	   			this.require = [];
		   		this.halfrequire = [];
		   		this.unrequire = [];
		   		
		   		this.children = this.form.find("[data-rules]");
		   		for(var i=0;i<this.children.length;i++){
		   			var ele = this.children[i];
		   			var input = new vInput(ele,this);
		   			if(input.require == 'true'){
		   				this.require.push(input);
		   			}else if(input.require == 'false'){
		   				this.unrequire.push(input);
		   			}else if(input.require == 'halfRequire'){
		   				this.halfrequire.push(input);
		   			};
		   		};
	   		
	   };
	   function vInput(obj,parent){
	   		var _self = this;
	   		this.parent = parent||window;
	   		this.dom = obj;
	   		//var dataset = obj.dataset;//$(obj).attr("data-type").split('|');
	   		this.msg = $(obj).attr("data-msg") ||'';
	   		this.require = $(obj).attr("data-require") || '';
	   		this.task = [];
	   		this.parent = $(obj).parents('.loginTable');
	   		this.error = $('<div>').html("<div>"+this.msg+"</div>");
	   		this.error.addClass('inputCheckTip');
	   		this.error.hide();
	   		this.parent.append(this.error);
	   		var rulesType = $(obj).attr("data-rules");
	   		if(rulesType){
	   			var c = rulesType.split(',');
	   			for(var u in c){
	   				this.task.push(c[u]);
	   			};
	   		};
	   		var ievent = $(obj).attr("data-event");
	   		if(ievent){
		   		var t = ievent.split(',');
		   		for(var i in t){
		   			var ele = t[i].split(':');
		   			switch(ele[0]){
		   				case 'change':
		   					this[ele[0]] = parent.parent[ele[1]];
		   				break;
		   				case 'blur':
		   					this[ele[0]] = parent.parent[ele[1]];
		   				break;
		   				case 'focus':
		   					this[ele[0]] = parent.parent[ele[1]];
		   				break;
		   				case 'click':
		   					this[ele[0]] = parent.parent[ele[1]];
		   				break;
		   				default:
		   					this[ele[0]] = ele[1];
		   			}
		   		};
		   	};

	   		this.valid=function(){
	   			var task = this.task;
	   			var result = false;
	   			check:for(var i in task){
	   				var ele = task[i].split('@');
	   				var ele1 = ele[0];
	   				var ele2 = ele[1];
	   				
	   				var status = ele2?
	   					rules[ele1](this.dom.value,ele2):
	   					rules[ele1](this.dom.value);



	   				if(status){
	   					result = status;
	   					break check;
	   				}
	   			};
	   			return result;
	   		};
	   		this.toggle = function(obj){
	   			obj?this.error.hide():this.error.show();
	   		};
	   		$(this.dom).on('change',function(e){
	   			if(_self.change){
	   				_self.change(e,_self);
	   			}else{
	   				_self.toggle(_self.valid());
	   			};
	   		});
	   		$(this.dom).on('blur',function(e){
	   			if(_self.blur){
	   				_self.blur(e,_self);
	   			}else{
	   				_self.toggle(_self.valid());
	   			};
	   		});
	   		$(this.dom).on('focus',function(e){
	   			if(_self.focus){
	   				_self.focus(e,_self);
	   			}else{
	   				_self.toggle(true);
	   			};
	   		});
	   		$(this.dom).on('click',function(e){
	   			if(_self.focus){
	   				_self.focus(e,_self);
	   			}else{
	   				_self.toggle(true);
	   			};
	   		});
	   };
　　　　return {
			vForm: vForm
　　　　};
　　});
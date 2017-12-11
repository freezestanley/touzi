define(['/widget/valider.js'],function(valider){
	var login =function(){
		$('.userInfoLogin').hide();
			Zero.ajax({
                url:'/queryLoginAccount.action',
                type:'POST',
            }, function(result){
                if(!!result["resultFlag"]){
                	$('.userInfoLogin').show();
                	$('#userLoginName').html(result['resultContent']['name']);
                	$('#userTime').html(dateFormat(result['resultContent']['lastTime'],true));
                };
            },function(e,h){
            });
        var _self = this;
        $('.modifyUserInfo').on('click',function(e){
            _self.resetUser(e);
        });
        $('.modifyUserPw').on('click',function(e){
            _self.editPW(e);
        });
	};

    var pt = login.prototype;
    pt.resetUser = function(e){
        var ele = e.currentTarget,
            uid= $(ele).attr('data-uid'),
            rname = $(ele).attr('data-name'),
            account = $(ele).attr('data-account'),
            email = $(ele).attr('data-email'),
            phone = $(ele).attr('data-phone'),
            _self = this,
            template =  _.template($("#resInfo").html())({name:rname,account:account,phone:phone,email:email});


        Zero.confirm( template, {
             title: '修改用户信息',
             ok:{
                callback:function(){
                    var result = _self.form.valid();
                    var confirm = this;
                    if(result){
                         Zero.ajax({
                            url:'/user/modifyAccount.action',
                            type:'post',
                            data:{
                                    email:$.trim($('#resemail').val()) || '',
                                    phone:$.trim($('#resPhone').val()) || '',
                                    name:$.trim($('#resAccountName').val()) || '',
                                    id:uid
                                 },
                            //type:'POST'
                        }, function(result){
                            confirm.hide();
                            if(!result.resultFlag){
                                dialog('<div class="errorBox">'+result.resultMsg+'</div>');
                            }else{
                                dialog('<div class="successBox">用户信息修改成功</div>');
                                _self.init(1,10);
                            };
                        },function(e,h){
                            confirm.hide();
                        });
                    }else{
                        //return this.hide();
                    };
                }
             },
            cancel:{
                callback:function(){
                    //do something
                    this.hide();
                }
             }
        });
        this.form = new valider.vForm($('.vForm'),this);
    };

    
    pt.editPW = function(e){
        var ele = e.currentTarget,
            uid= $(ele).attr('data-uid'),
            _self = this,
            template =  _.template($("#modifyPW").html())();

        Zero.confirm( template, {
             title: '修改密码',
             ok:{
                callback:function(){
                    var result = _self.form.valid();
                    var confirm = this;
                    if(result){
                         Zero.ajax({
                            url:'/modifyAcctPwd.do',
                            type:'post',
                            data:{
                                    oldpwd:$.trim($('#oldpw').val()),
                                    pwd:$.trim($('#newpw').val()),
                                    id:uid
                                 },
                            //type:'POST'
                        }, function(result){
                            confirm.hide();
                            if(!result.resultFlag){
                                dialog('<div class="errorBox">'+result.resultMsg+'</div>');
                            }else{
                                dialog('<div class="successBox">用户密码修改成功</div>');
                            };
                        },function(e,h){
                            confirm.hide();
                        });
                    }else{
                        //return this.hide();
                    };
                }
             },
            cancel:{
                callback:function(){
                    //do something
                    this.hide();
                }
             }
        });
        this.form = new valider.vForm($('.vForm'),this);
    };

	return (new login);
});
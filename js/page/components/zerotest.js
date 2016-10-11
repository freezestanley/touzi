define( [ 'controller', 'ui/pagination', 'ui/datepicker', 'tool/fileupload' ] , function( BaseController, Pagination, Datapicker, FileUpload ){
    
    var controller = BaseController.extend({
        
        run: function( data ){
         
            // datePicker
            this.$('#datePicker').datetimepicker();
            
            //  文件
            this.initUpload();
        }
        
    })
    
    var pt = controller.prototype;
    
    pt.initUpload = function(){
        
        var uploader = new FileUpload({
            accept: '.xls,.xlsx',
            action: 'http://10.139.110.157:6080/travel/BatchUpload.htm',
            // 每次开始上传前执行的回调(没有特殊操作，走默认即可)
            /*beforeUpload: function(){
                
                Zero.showLoading( '拼命上传中，请稍后...' )
                // return false; // 取消 本次上传
            },*/
            // 上传结果回调
            afterUpload: function( data ){
                if( data.error == 1 ){
                    Zero.alert( '已上传' );
                    // 销毁上传组件
                    // this.destroy();
                }
                else{
                    Zero.alert( data.errormsg )
                }
            }
        });
        
        this.$('#fileUpload').on('change', function(e){
            uploader.upload( this ); 
        })
    }
    
    pt.alert = function(e){
        
        // 第2个参数可选
         Zero.alert( 'hello, 王利军!', function(){
                
            alert('true alert');
            this.hide();
             
        });
    }
    
    pt.confirm = function(e){
        
         Zero.confirm( '确认要吊打王利军吗!', {
             title: '取消订单'
         });
    }
    
    pt.confirm2 = function(e){
        
         Zero.confirm( '确认要吊打王利军吗!', {
             title: '取消订单',
             btns: [{
                 text: '打酱油',
//                 className: 'dajiangyou', // 每个按钮都可以传递一个class
                 callback: function(){
                     alert('已打')
                     this.hide();
                 }
             }]
         });
    }
    
    pt.displayPager = function(e){
        
        new Pagination( this.$('#pager'), 256, {
            num_edge_entries: 1, //边缘页数
			num_display_entries: 5, //主体页数
			items_per_page:0,//每页显示1项
        });
    }
    
    return controller;
})
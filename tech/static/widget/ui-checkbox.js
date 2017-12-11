define([], function() {
    "use strict";

    $.fn.iSimulateCheckbox = function(iSet) {
        var iSet = $.extend({
            checkboxCls: 'icheckbox', //string类型,外围class名
            curCls: 'checked', //string类型，默认显示class名
            mode: 1,//0:single单选 1:mutiple多选
            required: 0, //0:非必选 1:必选
            cancelCb: $.noop, //取消回调
            selectCb: $.noop, //选中回调
            formTarget: '',
            rule:'',
            data: [],
        }, iSet || {});

        function render(checkbox) {
          var html = '';
          checkbox.each(function() {
              var classname = $(this).is(':checked')?iSet.checkboxCls + ' ' + iSet.curCls:iSet.checkboxCls;
              html += '<i data-value="' + ($(this).attr('data-value') || '') + '" data-name="' + ($(this).prop('name') || '') + '" class="' + classname + '"></i>' + ($(this).attr('data-text') || '');
          });
          checkbox.after(html).hide();
        }

        function bindEvents(checkbox){
          checkbox.on('click',function(){
            var $self = $(this);
            var $cbxs = $('[data-name='+$(this).attr('data-name')+']');
            var flag = 0;
            var index = $cbxs.index($self);

            if($(this).hasClass(iSet.curCls)){
              $cbxs.each(function(idx){
                if(index == idx) return;
                if($(this).hasClass(iSet.curCls)){
                   flag = 1;
                }else{
                   flag = 0;
                }
              });
              if(iSet.required && !flag){
                  return;
              }
              $(this).removeClass(iSet.curCls);
              iSet.cancelCb();
            }else{
              !iSet.mode && $cbxs.removeClass(iSet.curCls);
              $(this).addClass(iSet.curCls);
              iSet.selectCb();
            }

            createHideInp($cbxs,iSet.formTarget);
          });
        }

        function createHideInp($cbxs,formTarget){
          var html = '<input type="hidden" data-rule=' + iSet.rule + ' id="checkbox-' + $cbxs.attr('data-name') + '" name='+$cbxs.attr('data-name')+' value="';
          var data = '';
          var box  = '<div id="icheckboxsform"></div>';
          $cbxs.each(function(idx,item){
            if($(item).hasClass(iSet.curCls)){
              data += $(item).attr('data-value') + ',';
            }
          });
          data = data.slice(0,-1);
          html += data;
          html += '" />';

          iSet.data[0] = {name:$cbxs.attr('data-name'),value:data};

          // console.log({iSet:iSet});

          $("#checkbox-" + $cbxs.attr('data-name')).remove();
          if(formTarget && $(formTarget).length){
              $(formTarget).append(html);
              return;
          }
          !$('#icheckboxsform').length && $('body').append(box);
          $('#icheckboxsform').append(html);
        }

        this.each(function() {
            //$self: single origin select
            var $self = $(this);
            //将模拟的dl插到select后面
            render($self);

            var $pureCheckbox, cIndex = [];
            //当前模拟checkbox元素
            $pureCheckbox = $self.next('.' + iSet.checkboxCls);
            //当前模拟checkbox初始选中元素
            // thisCurVal = $pureCheckbox.find('.' + iSet.curCls);

            bindEvents($pureCheckbox);
        });

        return {iSet:iSet};
    }
});

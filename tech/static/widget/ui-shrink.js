define([], function() {
    "use strict";

    $.fn.iShrink = function(iSet) {
        var iSet = $.extend({
            boxCls: 'shrink-box', //string类型,外围class名
            btnCls: 'shrink-btn',
            btnCurCls: 'expanded', //string类型，默认显示class名
            btnText: '收起',
            btnCurText: '展开', //string类型，默认显示class名
            width: 200, //number类型，模拟select的宽度
            height: 30, //number类型，模拟select的高度
            zindex: 20, //层级顺序
            initCallback: $.noop
        }, iSet || {});

        var cIndex = 0, $self = this;

        function render($self) {
          var ret = $self.find('.' + iSet.boxCls);
          ret.length && ret.after('<div class="shrink-btn">'+ iSet.btnText +'</div>')
          return ret;
        }

        return this.each(function(idx,item) {
            var thisBox = render($(item));
            var thisBtn = thisBox.siblings('.' + iSet.btnCls);

            // var heightState = 'auto';
            var clickTimes = 0;
            thisBtn.on('click',function() {
              clickTimes++;
              thisBox.toggle();
              $(this).toggleClass(iSet.btnCurCls);
              clickTimes%2!=0?thisBtn.text(iSet.btnCurText):thisBtn.text(iSet.btnText);
            });
        });
    }
});

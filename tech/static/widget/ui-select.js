define([], function() {
    "use strict";

    $.fn.iSimulateSelect = function(iSet) {
        var iSet = $.extend({
            selectBoxCls: 'select', //string类型,外围class名
            curSCls: 'currentselected', //string类型，默认显示class名
            optionCls: 'selectoption', //string类型，下拉列表class名
            selectedCls: 'selected', //string类型，当前选中class名
            width: 200, //number类型，模拟select的宽度
            height: 30, //number类型，模拟select的高度
            zindex: 20, //层级顺序
            callback: $.noop
        }, iSet || {});


        function renderOption(select,html) {
          select.find('option').each(function() {
              if ($(this).is(':selected')) {
                  html += '<dd data-value="' + $(this).attr('value') + '" class="' + iSet.selectedCls + '">' + $(this).text() + '</dd>';
              } else {
                  html += '<dd data-value="' + $(this).attr('value') + '">' + $(this).text() + '</dd>';
              }
          });
          html += '</dl></div>';
          select.after(html);
        }

        function render(select) {

            var width = iSet.width == 'auto'?
                                      'auto':
                                        (iSet.width.toString().indexOf('%')>=0?
                                        iSet.width:
                                        iSet.width+'px');

            var html = '<div class="' + iSet.selectBoxCls + '" style="z-index:' + iSet.zindex + '"><div class="arrow"><span class="down_arrow"></span></div><div class="' + iSet.curSCls + '" style="width:' + width + '">' + select.find('option:selected').text() + '</div><dl class="' + iSet.optionCls + '" style="display:none;width:' + width + '">';
            //判断select中是否有optgroup
            //用dt替代optgroup，用dd替代option
            if (select.find('optgroup').size() > 0) {
                select.find('optgroup').each(function() {
                    html += '<dt>' + $(this).attr('label') + '</dt>';
                    renderOption(select,html);
                });
            } else {
                    renderOption(select,html);
            }
        }

        return this.each(function() {
            //$self: single origin select
            var $self = $(this);
            //将模拟的dl插到select后面
            render($self);
            var thisBox, thisCurVal, thisSelect, cIndex = 0;
            //当前模拟select外围box元素
            thisBox = $self.next('.' + iSet.selectBoxCls);
            //当前模拟select初始值元素
            thisCurVal = thisBox.find('.' + iSet.curSCls);
            //当前模拟select列表
            thisSelect = thisBox.find('.' + iSet.optionCls);
            //计算模拟select宽度
            var widthState = 'auto';
            if (iSet.width == 'auto') {
                widthState = $self.width();
                // console.log(widthState);
                thisCurVal.width(widthState)
                thisSelect.width(widthState)
            }

            //若同意页面还有其他原生select
            /*<thisSelect class="bgi"></thisSelect>frame();*/

            //若模拟select高度超出限定高度，则自动overflow-y：auto
            if (thisBox.height() < iSet.height) {
                var cssObj = {
                    'height': iSet.height,
                    'line-height': iSet.height + 'px'
                };
                thisBox.css(cssObj);
                thisSelect.css({
                    'top': iSet.height
                });
                thisSelect.find('dd').css(cssObj);
            }
            // if (thisSelect.height() > iSet.height) {
            //     thisSelect.height(iSet.height);
            //     console.log(thisSelect);
            // }

            //弹出模拟下拉列表
            thisCurVal.click(function() {
                //alert('test');
                $('.' + iSet.optionCls).hide();
                $('.' + iSet.selectBoxCls).css('zIndex', iSet.zindex);
                $self.next('.' + iSet.selectBoxCls).css('zIndex', iSet.zindex + 1);
                //alert(thisSelect.html());
                thisSelect.show();
            });

            //模拟列表点击事件-赋值-改变y坐标位置
            thisSelect.find('dd').click(function() {
                $(this).addClass(iSet.selectedCls).siblings().removeClass(iSet.selectedCls);
                cIndex = thisSelect.find('dd').index(this);
                thisCurVal.text($(this).text());
                $self.find('option').removeAttr('selected').eq(cIndex).attr('selected', 'selected');
                $('.' + iSet.selectBoxCls).css('zindex', iSet.zindex);
                thisSelect.hide();
                iSet.callback.call(null,$(this).attr('data-value'));
            })

            //非模拟列表处点击隐藏模拟列表
            $('html,body').click(function(e) {
              if (e.target.className.indexOf(iSet.curSCls) == -1) {
                thisSelect.hide();
                $('.' + iSet.selectBoxCls).css('zIndex', iSet.zindex);
              }
            });

            //取消模块列表处默认点击事件
            thisSelect.click(function(e) {
              e.stopPropagation();
            });

            $self.hide();
        });
    }
});

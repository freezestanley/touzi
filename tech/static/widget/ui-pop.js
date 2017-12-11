define([], function() {
    "use strict";

    var UIpop = function(conf) {
      // this.init(conf);
    }

    var UIpopPt = UIpop.fn = UIpop.prototype;

    UIpopPt.super = function (conf) {
      var conf = $.extend({
          class: 'ui-pop',
          width: 500,
          // height: 500,
          title: '1',
          zindex: 10010,
          defaultCloser: {show:true},
          defaultContent: {html:''},
          defaultConfirm: {show:false,conf:null},
          showCallback: $.noop,
          hideCallback: $.noop,
          initCallback: $.noop
      }, conf || {});
      return conf;
    }

    UIpopPt.setPos = function () {
      this.$el.css({'margin-left':-(this.$el.width()/2)+'px','margin-top':-(this.$el.height()/2)+'px'});
    }

    UIpopPt.render = function (conf) {
      var dom = $('<div class="ui-pop" style="width:'+ conf.width + 'px;height:' + conf.height + 'px;z-index:' + conf.zindex +';"><div class="title"><div class="title-in">'+ conf.title +'</div><div class="closer" style="display:none">×</div></div><div class="htmlBox"></div></div>');
      $('body').append(dom);
      this.$el = dom;
    }

    UIpopPt.show = function () {
      var self = this;
      Zero.showMask();
      this.$el.show();
    }

    UIpopPt.hide = function () {
      var self = this;
      Zero.hideMask();
      this.conf.hideCallback(this.$htmlBox || '');
      this.$el.hide();
    }

    UIpopPt.showCloser = function() {
      var self = this;
      var closer = this.$closer =  this.$el.find('.closer');
      self.bindCloseEvent(closer);
      closer.show();
    }

    UIpopPt.bindCloseEvent = function(closer) {
      var self = this;
      closer.on('click',function() {
        self.hide();
        Zero.hideMask();
      });
    }

    UIpopPt.addConfirm = function(configs) {
      var self = this;
      var htmlBox = this.$htmlBox =  this.$el.find('.htmlBox');
      var btns = configs || [{text:'',callback:$.noop},{text:'',callback:$.noop}];
      var html = '<div class="confirm">';
      for (var i = 0; i < btns.length; i++) {
        html += '<span>' + btns[i].text + '</span>';
      }
      html += '</div>';
      htmlBox.after(html);
      // htmlBox.css({'max-height':this.conf.height-150});
      btns.$el = htmlBox.siblings('.confirm').find('span');
      btns.$el.each(function(idx,item){
        $(item).on('click',function() {
          self.hide();
          Zero.hideMask();
          btns[idx].callback();
        });
      });
    }

    UIpopPt.addElements = function(conf) {
      var self = this;
      var htmlBox = this.$htmlBox =  this.$el.find('.htmlBox');
      var conf = conf || {html:'',callback:$.noop};
      var html = htmlBox.html() + conf.html;
      // console.log(conf.html);
      htmlBox.html(html);
      conf.callback && conf.callback();
      self.setPos();
    }

    UIpop.init = function (conf) {
      var instance = new UIpop(conf);
      var $instance = $.extend(instance,{});
      var conf = $instance.conf = $instance.super(conf);
      $instance.render(conf);
      $instance.addElements({html:$instance.conf.defaultContent.html,callback:$.noop});
      // console.log($instance.conf.defaultContent.html);
      $instance.conf.defaultCloser.show && $instance.showCloser();
      $instance.conf.defaultConfirm.show && $instance.addConfirm($instance.conf.defaultConfirm.btns);
      $instance.setPos();
      $(window).resize(function() {
        $instance.setPos();
      })
      // console.log($instance);
      return $instance;
    }

    return UIpop;

});

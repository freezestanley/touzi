(function($) {
    function Reslider() {
        this.defaults = {
            speed: 1000,
            delay: 5000,
            imgCount: 4,
            dots: true,
            autoPlay: true
        }
        this.count = 0;
        this.timer = null;
    }
    var _repro = Reslider.prototype;
    _repro.init = function() {
        this.doEvent();
        this.setBackground();
        this.autoPlay();
        if (this.defaults.dots) {
            this.dots()
        }
        this.setUrl(this.count);
    }
    _repro.setBackground = function() {
        $('.slider-block').eq(0).css({
            'z-index': '98',
            'opacity': '1'
        })
        $('.slider-direction').css({
            'z-index': parseInt($('.slider-block').css('z-index')) + 1
        })
    }
    _repro.doEvent = function() {
        var _self = this;
        $('.slider-direction-next').on('click', function() {
            _self.next()
        });
        $('.slider-direction-prev').on('click', function() {
            _self.prev()
        });
        $('.jquery-reslider').on('mouseenter', function() {
          clearTimeout(_self.timer);
      });
        $('.jquery-reslider').on('mouseleave', function() {
          _self.autoPlay();
      });
    }
    _repro.nextNormal = function(position) {
        var _self = this;
        _self.setUrl(position);
        $('.slider-block').eq(position).clearQueue().animate({
            'opacity': '1'
        }, _self.defaults.speed).addClass('ani');
        // !$('.slider-block').eq(position).length && $('.slider-block').eq(0).removeClass('ani');
        $('.slider-block').eq(position).siblings('.slider-block').clearQueue().animate({
            'opacity': '0'
        }, _self.defaults.speed).removeClass('ani');
    }
    _repro.next = function() {
        var _self = this;
        if (_self.count >= (_self.defaults.imgCount - 1)) {
            _self.count = 0;
            _self.dotsActive($('.slider-dots ul li').eq(_self.count));
            $('.slider-block').eq(_self.defaults.imgCount-1).removeClass('ani');
            $('.slider-block').eq(0).clearQueue().animate({
                'opacity': '1'
            }, 1000).addClass('ani');
        } else if (_self.count >= 0 && (_self.defaults.imgCount - 1)) {
            _self.nextNormal(_self.count + 1)
            _self.dotsActive($('.slider-dots ul li').eq(_self.count + 1));
            _self.count++;
        }
    }
    _repro.prev = function() {
        var _self = this;
        $('.slider-block').eq(_self.count).clearQueue().animate({
            'opacity': '0'
        }, _self.defaults.speed).removeClass('ani');
        if (_self.count > 0) {
          _self.setUrl(_self.count);
          $('.slider-block').eq(_self.count).prev().clearQueue().animate({
              'opacity': '1'
          }, _self.defaults.speed).addClass('ani');
          _self.dotsActive($('.slider-dots ul li').eq(_self.count - 1));
          _self.count--;
      } else {
        _self.count = _self.defaults.imgCount-1;
        _self.setUrl(_self.count);
        _self.dotsActive($('.slider-dots ul li').eq(_self.count));
        $('.slider-block').eq(_self.count).clearQueue().animate({
            'opacity': '1'
        }, _self.defaults.speed).addClass('ani');
            // console.log(_self.count);
        }
    }
    _repro.autoPlay = function() {
        var _self = this;
        if (_self.defaults.autoPlay) {
            _self.timer = setInterval(function() {
                _self.next()
            }, _self.defaults.delay)
        } else {
            clearInterval(_self.timer);
        }
    }
    _repro.dots = function() {
        var _self = this;
        for (var i = 0; i < this.defaults.imgCount; i++) {
            $('.slider-dots ul').append('<li></li>')
        }
        $('.slider-dots').css({
            'z-index': parseInt($('.slider-block').css('z-index')) + 1
        })
        $('.slider-dots ul li').eq(0).addClass('active');
        $('.slider-dots ul li').on('click', function() {
            _self.dotsActive($(this));
            _self.nextNormal(($(this).index()));
            _self.count = $(this).index();
        })
    }
    _repro.dotsActive = function(elements) {
        elements.addClass('active').siblings().removeClass('active')
    }
    _repro.setUrl = function(index) {
        var $url = $('.slider-block').eq(index).attr('data-url');
        $('.slider-block').eq(index).css({
            'background-image': 'url(' + $url + ')'
        })
    }
    $.fn.reSlider = function(options) {
        var reSlider = new Reslider();
        $.extend(reSlider.defaults, options)
        reSlider.init()
    }
})(jQuery)
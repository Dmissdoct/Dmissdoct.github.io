/* scroll load */
(function($){$.fn.scrollLoading=function(options){var defaults={attr:"data-url",container:$(window),callback:$.noop,queryParams: $.noop,before:$.noop,after:$.noop};var params=$.extend({},defaults,options||{});params.cache=[];$(this).each(function(){var node=this.nodeName.toLowerCase(),url=$(this).attr(params["attr"]),queryParams=params['queryParams'];var data={obj:$(this),tag:node,url:url,queryParams:queryParams};params.cache.push(data)});var callback=function(){if($.isFunction(params.callback)){params.callback.apply(this, arguments)}};var loading=function(){var contHeight=params.container.height();if($(window).get(0)===window){contop=$(window).scrollTop()}else{contop=params.container.offset().top}$.each(params.cache,function(i,data){var o=data.obj,tag=data.tag,url=data.url,post,posb,queryParams=data.queryParams;if(o){post=o.offset().top-contop,posb=post+o.height();if((post>=0&&post<contHeight)||(posb>0&&posb<=contHeight)){if(url){params.before(o.get(0), tag);if(tag==="img"){callback(o.attr("src",url))}else{$.get(url, $.isFunction(queryParams) ? queryParams(o) : ($.isPlainObject(queryParams) ? queryParams : {}),function(data){callback(o.get(0), data)})}params.after(o.get(0), tag);}else{callback(o.get(0))}data.obj=null;}}})};loading();params.container.bind("scroll",loading)}})(jQuery);

(function ($, expert) {
	var xst = expert.xst = typeof xst != 'undefined' ? xst : {};
	var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" +  "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

	//用户对象
    var user = xst.user = {};
    user.info = {
        userId  : 0,
        username: '',
        name    : '',
        email   : '',
        avater  : ''
    };
	user.getAvaterUrl = function() {
		var avater = user.info.avater;
		return 'http://f.xsteach.cn/uploaded/'+avater.substr(0,2)+'/'+avater.substr(2,2)+'/'+avater.substr(4,2)+'/'+avater+'.jpg';
    };

	//Cookie读取。如果给定值,则设定cookie的值
    var cookie = xst.cookie = function (name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options = $.extend({}, options);
                options.expires = -1;
            }
            var expires = '';
            if (options.expires
                && (typeof options.expires == 'number'
                || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                }
                else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [
                name,
                '=',
                encodeURIComponent(value),
                expires,
                path,
                domain,
                secure
            ].join('');
        }
        else {
            // 读取cookie值
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++
                    ) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

    var encode64 = xst.encode64 = function (input) {
        input = escape(input);
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                keyStr.charAt(enc1) +
                keyStr.charAt(enc2) +
                keyStr.charAt(enc3) +
                keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return output;
    }

    var decode64 = xst.decode64 = function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            console && console.log("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return unescape(output);
    }

	xst.isIE = function(x){
		var ua = navigator.userAgent.toLowerCase();
		return /msie/.test(ua) && !/opera/.test(ua) && (ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1] == '' + x + ".0";
	};

	xst.isIE78 = function(){
		return xst.isIE(7) || xst.isIE(8);
	};

	xst.isIE789 = function(){
		return xst.isIE(7) || xst.isIE(8) || xst.isIE(9);
	};

    xst.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

	xst.getImgName = function(imgUrl){
		if(typeof imgUrl != 'string'){
			debug('参数imgUrl不是字符串类型的图片地址');
			return false;
		}
		var ret = false; imgUrl = imgUrl.split('@')[0],
			regEx = /\/uploaded\/.{2}\/.{2}\/.{2}\/(.{35})\.([jpg|jpeg|png|gif]+)/;
		var res = imgUrl.match(regEx);
		if(res && res[1]){
			ret = res[1];
		}
		return ret;
	};

	xst.getImgUrl = function(imgs, imgSize, replace){
		var ret = [], imgLen = imgs.length, sizeLen = imgSize.length;
		for(var i=0; i < imgLen; i++){
			if(typeof imgs[i] != 'string') continue;
			var url = $.trim(imgs[i].split('@')[0]);
			if(replace){
				if(typeof replace == 'object'){
					url = url.replace(replace[0], replace[1]);
				}else{
					var zoomUrl = 'i.xsteach.cn';
					url = url.replace('f.xsteach.cn', zoomUrl).replace('bbs.xsteach.com', zoomUrl).replace('www.xsteach.com', zoomUrl);  //如果参数replace的值为true默认会将f.xsteach.cn, www.xsteach.com和bbs.xsteach.com替换为i.xsteach.cn;
				}
			}
			var res = url.match(/\/uploaded\/.{2}\/.{2}\/.{2}\/(.+)\.([jpg|jpeg|png|gif]+)/);
			if(res && res[2]){
				var object = {};
				for(var j=0; j<sizeLen; j++){
					var size = imgSize[j], type = res[2];
					if(size == 'origin' || (res[2] == 'gif' && size != '@100h_0e_1c_1l_90Q_1x.')){
						object[size] = url;
					}else{
						//*var type = res[0].split('.')[1];
						if(res[2] == 'gif'){
							type = 'jpg';
						}
						object[size] = url + size + type;
					}
				}
				if(object){
					ret.push(object);
				}
			}
		}
		return ret;
	};

	//Debug函数
	expert.debug = function(x){
		var $d = $('#debug');
		if($d.length > 0){
			$d.html(x);
		}else{
			if(typeof console == 'undefined' || typeof console.log == 'undefined'){
				return;
			}
			console.log(x);
		}
	}

    var popLayer = xst.popLayer  = function(layer,gbbtn,showMaster,closed_fn){
     showMaster=("undefined" == typeof showMaster)? true : showMaster ;
     var _this=this;
     this.layer=layer;
     this.gbbtn=gbbtn;
     this.showMaster=showMaster;
     this.setCenter=function(){
       wh=$(window).height();
       ww=$(window).width();
       oh=$(_this.layer).height();
       ow=$(_this.layer).width();
       ot=(wh-oh)/2-10;
       ol=(ww-ow)/2;
       if(ot<5) ot=5;
       //if(ol<5) ol=5;
       if($(_this.layer).css("position")=="absolute"){
       st=jQuery(document).scrollTop();
  	 sl=jQuery(document).scrollLeft();
       ot=ot+st;
       ol=ol+sl;
      }
       $(_this.layer).css({"left":ol,"top":ot});
     }
     this.showMasker=function(){
       $(_this.layer).show();
       _this.setCenter();
       if(_this.showMaster){
    	   $("body").append("<div id='maskler' style='height:100%;'></div>");
    	   $("#maskler").hide().fadeIn("1000");
       }
     }
     this.exitMasker=function(){
         $(_this.layer).hide();
         _this.showMaster && $("#maskler").remove();
         typeof(closed_fn)=="function" && closed_fn();
     }
     $(this.gbbtn).on("click",function(){
      _this.exitMasker();
      });
     $(window).scroll(function(){
      if(($(_this.layer).length && !$(_this.layer).is(":hidden"))){
  	    if($(_this.layer).css("position")=="absolute"){
  	    	_this.setCenter();
  	    }
       }
      });
     $(window).resize(function(){
      if(($(_this.layer).length && !$(_this.layer).is(":hidden"))){
       _this.setCenter();
       }
      });
    }

    var authCookieName = window.config && window.config.authCookieName ? window.config.authCookieName : '__xst__';
    var xstCookieValue = cookie(authCookieName);
    if (xstCookieValue != null && xstCookieValue != '') {
        var userInfo = decode64(xstCookieValue).split(',');
        user.info = {
			userId : userInfo[0],
			username : $.parseJSON(userInfo[1]),
			name : $.parseJSON(userInfo[2]),
			email : userInfo[3].replace(/"/g, ''),
			avater : userInfo[4].replace(/"/g,'')
		};
    }

    //提取webIM的cookie值
    var im = xst.im = {
        user : '',
        via  : '',
        tk   : ''
    };
    var IMCookieName = window.config && window.config.imCookieName ? window.config.imCookieName : '__im_bw__';
    var IMCookieValue = cookie(IMCookieName);
    if (IMCookieValue != null && IMCookieValue != '') {
        IMInfo = $.parseJSON(decode64(IMCookieValue));
        xst.im = {
			user : IMInfo[0],
			via  : IMInfo[1],
			tk   : IMInfo[2]
		}
    }


    function getUserId() {
        return user.info.userId;
    }

    /**
     * 显示登录对话框
     */
    function showLoginDialog() {
        window.location.href = '/login?goto=' + encodeURIComponent(window.location.href);
    }

    /**
     * 确保用户登录
     */
    function requireLogin() {
        if (getUserId() > 0) {
            return false;
        }
        showLoginDialog();
        return true;
    }
    /**
     * 判断是否登录
     *
     * @returns {{}|*|{userId: number, name: string, username: string, email: string}|string}
     */
    window.hasLogin = function () {
        return getUserId() > 0;
    }
    /**
     * 未登录重定向
     *
     * @returns {boolean}
     */
    window.notLoginRedirect = function (loginUrl) {
        if (!hasLogin()) {
        	if($('#xs-pop-login-form').length > 0) {
        		var pop =new popLayer($('#xs-pop-login-form'),$('#xs-pop-login-form .pop-close'));
        		pop.showMasker();
        	} else {
                window.top.location.href = loginUrl || 'http://www.xsteach.com/login?goto=' + encodeURIComponent(window.top.location.href);
        	}
            return true;
        }
        return false;
    }
    $(document).on('click', '.xs-pop-login-quick', function () {
        if (!hasLogin()) {
            if ($('#xs-pop-login-form').length > 0) {
                var pop = new popLayer($('#xs-pop-login-form'), $('#xs-pop-login-form .pop-close'));
                pop.showMasker();
                return false;
            } else {
                window.top.location.href = loginUrl || 'http://www.xsteach.com/login?goto=' + encodeURIComponent(window.top.location.href);
                return false;
            }
        }
    });
})(jQuery, window);

function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}

function adjustfooter() {
	var bdHt = $('body').height();
	var winHt = $(window).height();
	if($('#ft.ft-fixed').length > 0) {
		bdHt = bdHt + $('#ft').height() + 20;
	}
	if(bdHt > winHt) {
		$('#ft.ft-fixed').removeClass('ft-fixed');
	} else {
		$('#ft').addClass('ft-fixed');
	}
}

function fixedSideBar(bottom){
	var $kj = $('#kj'), winH = $(window).height(), ftH = $('#ft').outerHeight(), kjH = $kj.height(), ftTop = $('#ft').offset().top, sTop = $(window).scrollTop();
	if(sTop + winH - bottom + 10 > ftTop){
		$kj.removeClass('kj-fixed').css('bottom', sTop + winH + 10 - ftTop);
	}else{
		$kj.addClass('kj-fixed');
	}
}

function getSmsCode(o){
	var $btn = o.$btn, countdown = o.countdown || 60, timer = null;
	if(!$btn.hasClass('disabled')){
		$btn.addClass('disabled');
		handle(countdown);
		timer = setInterval(function(){
			handle(--countdown);
			debug('si');
		}, 1000);
	}
	function handle(num){
		if(num > 0){
			var tipsText = '重新获取 (' + countdown + ')';
			//var tipsText = countdown + '秒后重新获取';
		}else{
			clearInterval(timer);
			$btn.removeClass('disabled');
			var tipsText = '获取验证码';
		}
		$btn.text(tipsText);
	}
}

function ieAddPlayerIcon($t){
	var $target = $t || $('.g4-icon li');
	if(xst && typeof xst.isIE789 != 'undefined' && xst.isIE789()){
		$target.mouseover(function(){
			var $this = $(this), $a = $this.find('a').eq(0);
			if($a.find('i').length <= 0){
				$a.append($('<i/>'));
			}
		});
	}
}

function xsTab($xsTabs){
	var $wraps = $xsTabs || $('.xs-tab');
	if($wraps && $wraps.length > 0){
		$wraps.each(function(){
			var $wrap = $(this);
			$wrap.find('.tab-btn').click(function(){
				var $this = $(this), index = $this.index();
				$wrap.find('.tab-btn').removeClass('xs-active');
				$this.addClass('xs-active');
				$wrap.find('.tab-bd').addClass('xs-hide').eq(index).removeClass('xs-hide');
			});
		});
	}
}

function xsHover(wrapClassName){
	var wpClass = '.' + wrapClassName || '.xs-hover', hoverClass = 'xs-hover-show';
	$(document).on('mouseenter', wpClass, function(){
		var $wrap = $(this);
		clearTimeout(xst.hoverTimer);
		$(wpClass).removeClass(hoverClass);
		$wrap.addClass(hoverClass);
	}).on('mouseleave', wpClass, function(){
		xst.hoverTimer = setTimeout(function(){
			$(wpClass).removeClass(hoverClass);
		}, 200);
	});
}

function xsCollapse($xsCollapses){
	var $wraps = $xsCollapses || $('.xs-collapse');
	if($wraps && $wraps.length > 0){
		$wraps.each(function(){
			var $wrap = $(this);
			$wrap.find('.collapse-btn').click(function(){
				var $this = $(this);
				if($this.hasClass('xs-active')){
					$this.removeClass('xs-active');
					$wrap.find('.collapse-bd').slideUp();
				}else{
					$this.addClass('xs-active');
					$wrap.find('.collapse-bd').slideDown();
				}
			});
		});
	}
}

function createPlayer(param){
	var ua = navigator.userAgent, url = param.url, $object = param.object, autostart = param.autostart, start = param.start;
	if(url.indexOf('=') != -1){
		var vid = url.split('=')[1];
	}else{
		var regEx = new RegExp();
		regEx.compile(/(.*)\/videos\/([0-9a-zA-Z_-]*).swf/i);
		var vid = regEx.exec(url)[2];		
	}
	if(typeof vid != 'string'){
		console && console.log(':-( createPlayer(): 传递的视频地址获取不到vid');
		return false;
	}
	if (ua.match(/iP(od|hone|ad)/i) || ua.match(/Android/i) || ua.match(/Linux/i) || ua.match(/AppleWebKit.*Mobile.*/i)) {
		var baseUrl ="http://v3.polyv.net";
		var setUrl = baseUrl + "/uc/video/settings";
		var hlsUrl = baseUrl + '/hlsIndex/' + vid + ".m3u8";
		var userid = vid.substring(0,10);
		if(typeof $object == 'undefined'){
			var videoParam = {
				width : '100%', height : '100%', controls : 'controls',
				post : baseUrl + '/uc/video/getImage?vid=' + vid
			};
			$object = $('<video/>').attr(videoParam);
			var ret = 1;
		}
		if(typeof autostart != 'undefined'){
			$object.attr('autoplay', 'autoplay');
		}else{
			$object.removeAttr('autoplay');
		}
		$.ajax({
			url: setUrl + "/videoJson?vid=" + vid,
			type: "GET",
			dataType: "jsonp",
			success: function(data){
				//hlsUrl = hlsUrl.replace("hlsIndex/", "hlsIndex/" + data.hash + "/");
				hlsUrl = data.hlsIndex;
				$object.attr('src', hlsUrl).bind('play',function(){
					try{
						s2j_onPlayStart();
					}catch(e){
						console && console('Can not run s2j_onPlayStart()');
					}
				}).bind('ended',function(){
					s2j_onPlayOver();
				});
				if (ua.match(/WebKit/i)) {
					$object.bind('click',function(){
						this.play();
					});
				}
			}
		});
		if(ret){
			return $object;
		}
	}else{
		if(typeof autostart == 'undefined'){
			autostart = 0;
		}else{
			autostart = autostart;
		}
        var startVar = typeof start == 'undefined' || !start ? '' : '&watchStartTime='+parseInt(start);
		var htmlStr = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"  data="' + url +
			'" width="100%" height="100%" class="xui-player" id="xsteach-player"><param name="movie" value="http://player.polyv.net/videos/player.swf"><param name="allowscriptaccess" value="always"><param name="wmode" value="Transparent"><param name="flashvars" value="vid=' + vid +
			'&amp;autoplay=' + autostart + '&barrage_rollTime=20'+startVar+'" /><param name="allowFullScreen" value="true" /><param name="autoplay" value="' + autostart + '">' +
			'<embed src="http://player.polyv.net/videos/player.swf" width="100%" height="100%" type="application/x-shockwave-flash" allowscriptaccess="always" wmode="Transparent" name="xsteach-player" allowFullScreen="true" flashvars="vid=' + vid + '&amp;autoplay=' + autostart + '&barrage_rollTime=20'+startVar+'" /></object>';
		if(typeof $object == 'undefined'){
			return $(htmlStr);
		}else{
			$object.replaceWith($(htmlStr));
		}
	}
}


function xsPlayList($playWrap, $playLists, index){
	$playLists.click(function(){
		var $this = $(this);
		if($this.hasClass('xs-active') || $this.parent().hasClass('xs-active')){
			return false;
		}
		var url = $this.attr('data-url'), regEx = new RegExp();
		regEx.compile(/(.*)\/videos\/([0-9a-zA-Z_-]*).swf/i);
		if(typeof createPlayer == 'function' && typeof regEx.exec(url) == 'object'){
			$this.parent().addClass('xs-active').siblings().removeClass('xs-active');
			var $player = createPlayer({url : url});
			$playWrap.empty().append($player);
		}
	});
	if(typeof index == 'number'){
		$playLists.eq(index).click();
	}
}

$(function () {
	//QQ登录提示
	$(document).on('click', '.btn-qqlogin-tips', function(e){
		e.preventDefault();
		var $pop = '<div class="pop-up pop-tips pop-qqlogin-tips"><div class="wrap" style="height: 270px;"><div class="hd"><a class="fr btn-close iconfont" href="javascript:;">&#xe623;</a><h2>温馨提示</h2></div><div class="bd"><div class="center" style="padding: 0 10px;"><p>您好，由于腾讯方面QQ登录功能出现故障，目前已暂停使用。</p><p class="mt10" style="margin-top: 10px">请使用"邮箱+密码" 或 "用户名+密码"方式登录。</p><p class="mt10" style="margin-top: 10px">如您忘记了账号密码，请联系您的班主任或官网客服为您处理或<a href="/site/forgot-password" target="_top">点击这里重置密码</a>。</p><p class="mt10" style="margin-top: 10px">很抱歉给您造成了不便，我们会尽快催促腾讯方面修复好并重新开放QQ登录功能。</p></div></div></div><div class="pop-layer"></div>';
		$('body').append($pop);
		$('.pop-qqlogin-tips').on('click', '.btn-close', function(e){
			$('.pop-qqlogin-tips').remove();
		});
	});

	//检查是否在其他地方登录
	if (xst.cookie('_lost_xs_') == '1') {
		alert('该账号已在其他地方登录，您将退出登录状态！');
		xst.cookie('_lost_xs_', '0', {'domain': '.xsteach.com', 'path': '/', 'expires': -1});
	}

	//隐藏迅雷插入网页中的标记
	var $divs = $('body>div'), len = $divs.length;
	for(var i = len; i > 0; i--){
		if(/^xunlei_com_/.test($divs[i - 1].id)){
			$($divs[i - 1]).hide();
		}
	}

	//全站通用TAB切换
	if(typeof xsTab == 'function'){
		xsTab($('.xs-tab'));
	}

	//全站通用折叠菜单
	if(typeof xsCollapse == 'function'){
		xsCollapse($('.xs-collapse'));
	}

	//全站通用Hover显示
	if(typeof xsHover == 'function'){
		xsHover('xs-hover');
	}

	//全站 - 头部用户下拉菜单
	var dropSt, $dropMenu;
	$(document).on('mouseover', '#hd2 .btn-drop, #hd2 .menu', function(){
		var $this = $(this), $parent = $this.parent();
		clearTimeout(dropSt);
		$dropMenu && $dropMenu.removeClass('drop-hover');
		$parent.addClass('drop-hover');
		$dropMenu = $parent;
	}).on('mouseout', '#hd2 .btn-drop, #hd2 .menu', function(){
		var $this = $(this);
		dropSt = setTimeout(function(){
			$this.parent().removeClass('drop-hover');
		}, 200);
	});

	//全站 - 页脚
	if($('#ft').length > 0){
		//底部微信二维码
		var timer_wx = null;
		$('#ft .dropdown').hover(function () {
			$(this).next('img').removeClass('hide');
		}, function () {
			   $(this).next('img').stop().addClass('hide');
		});

		//页面高度过小时页脚固定到底部
		adjustfooter();
		setTimeout(function(){adjustfooter();},500);
		$(window).resize(function(){
			adjustfooter();
		});
	}

	//全站 - 调整右边浮动按钮
	if($('#ft').length > 0 && $('#kj').length > 0){
		$(window).resize(function(){
			fixedSideBar(100);
		});

		fixedSideBar(100);
		$(window).scroll(function(){
			fixedSideBar(100);
		});
	}

	//全站 - 回到顶部
	var $kjTop = $('#kj .top');
	$kjTop.click(function(e){
		e.preventDefault();
		$('body,html').stop().animate({scrollTop: 0}, 300);
		return false;
	});
	if($(window).scrollTop() >= 200){
		$kjTop.removeClass('hidden');
	}
	$(window).scroll(function(){
		var sTop = $(window).scrollTop(),
			winH = 200; //$(window).height();
		if(sTop >= winH){
			$kjTop.removeClass('hidden');
		}else{
			$kjTop.addClass('hidden');
		}
	});

	//全站 - 在线客服
	$(document).on('click', '.ol-cs, .con-online', function () {
		doyoo.util.openChat('g=10046647');
		//return false;
	});

	//图片延迟加载
	if($(".g4 img").scrollLoading){
		$(".g4 img").scrollLoading();
	}
	if($(".i-wp .lazy").scrollLoading){
		$(".i-wp .lazy").scrollLoading();
	}

	//IE下公开课和正式课图片移上去添加播放器图标
	ieAddPlayerIcon();

	//轮播类初始化
	if(typeof XstSlide != 'undefined'){
		var $xstSlide = $('.xst-slide');
		$xstSlide.each(function(){
			new XstSlide({wrap : $(this), countdown : 5});
		});
	}

	//分类TAB
	var $gCatTab = $('.g-cat-tab');
	$gCatTab.find('.btn').click(function(e){
		e.preventDefault();
		var $this = $(this), index = $this.index(),
			$ul = $gCatTab.find('.g4').eq(index);
		if($ul.length > 0 && !$this.hasClass('active')){
			$this.addClass('active').siblings().removeClass('active');
			var $area = $ul.find('textarea');
			if($area.length > 0){
				$ul.html($area.text());
				if($ul.parent().hasClass('g4-icon')){
					ieAddPlayerIcon($ul.find('li'));
				}
			}
			$ul.removeClass('hide').siblings().addClass('hide');
		}
	});
	$('.xs-tab-delay').on('click', '.tab-btn', function(){
		var $this = $(this), index = $this.index(),
			$tabBd = $this.closest('.xs-tab-delay').find('.tab-bd').eq(index);
		debug($tabBd.length);
		if($tabBd.length > 0){
			var $area = $tabBd.find('textarea');
			if($area.length > 0){
				debug($area.length);
				$tabBd.html($area.text());
				if($tabBd.parent().hasClass('g4-icon')){
					ieAddPlayerIcon($tabBd.find('li'));
				}
			}
		}
	});

    /***
     * 关注功能
     */

    //xs_www = 'http://dev.xsteach.com'; //此行注意不要放到外网去

    if(typeof xs_www == 'undefined') {
        var xs_www = 'http://www.xsteach.com';
    }
    var follow_url = xs_www + '/home/set-follower';
    $(document).on('click', '.xs-follow-user', function() {
        if(window.notLoginRedirect()) {
            return false;
        }
        var $this = $(this);
        var uid = $this.attr('data-fid');
        var data = {'uid' : uid};
        var $stay = $('.pop-box .bd .follow');
        var $cur = '';
        if($('.pop-box .nav > li.active').hasClass('meFollow')) {
            var $cur = $('.aside .about .bd li .state.meFollow');
        } else if($('.pop-box .nav > li.active').hasClass('followMe')) {
            var $cur = $('.aside .about .bd li .state.followMe');
        }
        $.ajax({
            url : follow_url,
            type : 'get',
            dataType : 'jsonp',
            data : data,
            success : function(res) {
                if(res == 'canceled') {
                    $this.removeClass('followed').removeClass('friend').addClass('btn-primary');
                    $this.html('<i class="iconfont">&#xe65b;</i>加关注');
                } else if(res == 'followed'){
                    $this.removeClass('friend').removeClass('btn-primary').addClass('followed');
                    $this.html('<i class="iconfont">&#xe622;</i>已关注');
                } else if(res == 'friend') {
                    $this.removeClass('followed').removeClass('btn-primary').addClass('friend');
                    $this.html('<i class="iconfont">&#xe653;</i>相互关注');
                }

                $cur && $cur.data('flw',$stay.html());
            }
        });
    });
    $(document).on('mouseenter', '.xs-follow-user', function() {
        if($(this).hasClass('followed')) {
            $(this).html('取消关注');
        } else if($(this).hasClass('friend')){
            $(this).html('取消关注');
        }
    });
    $(document).on('mouseleave', '.xs-follow-user', function() {
        if($(this).hasClass('followed')) {
            $(this).html('<i class="iconfont">&#xe622;</i>已关注');
        } else if($(this).hasClass('friend')) {
            $(this).html('<i class="iconfont">&#xe653;</i>相互关注');
        }
    });
    $('#fixed-app-down .close').click(function(){
    	$(this).parents('#fixed-app-down').addClass('hide');
    });

    var timer = null;
    $('#kj .mobile,#kj .app-down').hover(function() {
      if (timer) {
        clearTimeout(timer);
      }
      $('#kj .app-down').show();
    }, function() {
      timer = setTimeout(function() {
        $('#kj .app-down').stop().hide();
      }, 500);
    });

	//聊天事件绑定
    var chat = new xsOpenChatWin();
    chat.bindChatEvent();
});

//聊天按钮弹出聊天窗口
function xsOpenChatWin(o) {
    //var _www = 'http://dev.xsteach.com'; //此处不要更新到外网

    var that = this;
    var o = o || {};
    this.www = typeof _www == 'undefined' ?  'http://www.xsteach.com' : _www;
    this.btnChatClass = o.btnChatClass || '.xs-exchanger-chat';
    this.imVal= o.imVal || '--xs-opc--';
    this.imOn = o.imOn || '--ck-in--';
    this.ckLong = this.ckLong || 900;
    this.chatUrl = this.www + '/user/message/chat';
    this.imUrl = this.www + '/message/person/user-im';
    this.isBinded = false;
    var $newer = $('#xs-new-win');
    if(!$newer.length) {
        $newer = $('<a id="xs-new-win" href="javascript:;" style="display:none" target="_blank"></a>');
        $('body').append($newer);
    }
    xst.newWin = this.newWin = function(href){
        var $newer = $('#xs-new-win');
        if($newer.length) {
            $newer.attr('href',href);
        } else {
            $newer = $('<a id="xs-new-win" href="'+href+'" style="display:none" target="_blank"></a>');
            $('body').append($newer);
        }
        $newer[0].click();
    };
    this.xsOpenChat = function(info) {
        if(window.notLoginRedirect()) {
            return false;
        }
        if(xst.cookie(that.imOn) == null || xst.cookie(that.imOn) == '') {
            var pm = info.uid ? "?rid=" + info.uid : "" ;
            that.newWin(that.chatUrl + pm);
        } else {
            if(info.uid) {
                $.ajax({
                    url     : that.imUrl,
                    type    : "get",
                    data    : {uid: info.uid},
                    cache : false,
                    dataType: "jsonp",
                    success : function (res) {
                        var _info = res.im+ ',' +info.uid+ ',' +info.name;
                        xst.cookie(that.imVal, _info, {'domain': '.xsteach.com', 'path': '/'});
                    }
                });
            } else {
                xst.cookie(that.imVal, '0,0,0', {'domain': '.xsteach.com', 'path': '/'});
            }
            return false;
        }
        return false;
    };
    this.bindChatEvent = function() {
        $(document).on('click',this.btnChatClass,function() {
            var info = {
                uid: $(this).attr('data-rid'),
                name: $(this).attr('data-name')
            };
            that.xsOpenChat(info);
        });
    };
    window.chatCheck = this.chatCheck = function() {
      debug('isOn:'+xst.cookie(that.imOn));
    };
    this.dataTest = function() {
      setInterval("window.chatCheck();",this.ckLong);
    };
}

String.prototype.trim = function() {
	return (this + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}
String.prototype.strLen = function() {
	return (BROWSER.ie && this.indexOf('\n') != -1) ? this.replace(/\r?\n/g, '_').length : this.length;
}
String.prototype.gbkLen = function() {
	var len = this.length, count = 0;
	for(var i = 0; i < len; i++) {
		count += this.charCodeAt(i) < 0 || this.charCodeAt(i) > 255 ? 2 : 1;
	}
	return count;
}

//轮播类
function XstSlide(o){
	this.$wrap = o.wrap || $('#xst_slide');

	this.current = o.current || 0;
	this.countdown = o.countdown || 0;
	this.isDelay = o.isDdelay || 1;
	this.direction = 1;
	this.speed = o.speed || 500;
	this.timer = o.timer || 0;
	this.init();
}

XstSlide.prototype.init = function(){
	this.$nav = this.$wrap.find('.nav');
	this.$navLi = this.$nav.find('li');
	this.$list = this.$wrap.find('.list');
	this.$li = this.$list.find('li');
	this.liNum = this.$li.length;
	this.wrapWidth = this.$wrap.width();
	this.$prev = this.$wrap.find('.prev');
	this.$next = this.$wrap.find('.next');
	if(this.$li.length <= 1){
		this.$nav.addClass('hide');
		this.$prev.addClass('hide');
		this.$next.addClass('hide');
	}else{
		var $first = this.$li.eq(0).clone(), $last = this.$li.eq(this.liNum - 1).clone();
		this.$list.append($first).prepend($last);
	}

	this.reset().bind();
	return this;
};

XstSlide.prototype.reset = function(){

	this.$li = this.$list.find('li');
	this.liNum = this.$li.length;
	this.wrapWidth = this.$wrap.width();
	if(this.wrapWidth && this.liNum){
		this.$li.width(this.wrapWidth);
		this.$list.width(this.wrapWidth * this.liNum);
		if(this.$li.length <= 1){
			return this;
		}
		this.current = 1;
		this.$list.css({'left' : - this.wrapWidth});
	}else{
		debug('error');
		return false;
	}
	this.setStatus();
	return this;
};

XstSlide.prototype.bind = function(){
	var that = this;

	$(window).resize(function(){
		that.reset();
	});

	if(this.$li.length <= 1){
		return this;
	}

	if(this.$navLi.length > 0){
		this.$navLi.click(function(){
			var $this = $(this);
			if($this.hasClass('active')) return;
			var index = $this.index();
			that.current = index + 1;
			that.slideTo();
		});
	}

	this.$prev.click(function(e){
		e.preventDefault();
		that.current--;
		that.slideTo();
	});

	this.$next.click(function(e){
		e.preventDefault();
		that.current++;
		that.slideTo();
	});

	//设置间隔X秒自动滑动
	if(this.countdown){
		this.autoSlide();
	}

	//鼠标进入清除，移出设置自动滑动
	this.mouseHover(this.$wrap).mouseHover(this.$nav).mouseHover(this.$prev).mouseHover(this.$next);

	return this;
};

XstSlide.prototype.slideTo = function(x){
	var that = this;
	this.setStatus();
	var left = this.current * this.wrapWidth;
	this.$list.stop().animate({'left' : - left}, this.speed);
	return this;
};

XstSlide.prototype.setStatus = function(){
	var left, index, exit;
	if(this.current < 0){
		this.current = this.liNum - 2;
		left = this.wrapWidth * this.current;
		this.current--;
		index = this.current;
	}else if(this.current > this.liNum - 1){
		this.current = 1;
		left = this.wrapWidth * this.current;
		this.current++;
		index = this.current;
	}else{
		index = this.current;
		if(this.current == 0){
			index = this.liNum - 2;
		}else if(this.current == this.liNum - 1){
			index = 1;
		}
		exit = true;
	}
	if(this.isDelay){
		this.delayLoad(index);
		if(index == this.liNum - 2){
			this.delayLoad(0);
		}
	}

	if(this.$navLi.length > 0){
		var $current = this.$navLi.eq(index - 1);
		this.$navLi.removeClass('active');
		if($current.length > 0){
			$current.addClass('active');
		}
	}
	if(exit){
		return this;
	}
	this.$list.css({'left' : - left});
	return this;
};

XstSlide.prototype.autoSlide = function(){
	var that = this;
	clearInterval(this.timer);
	this.timer = setInterval(function(){
		that.direction ? that.current++ : that.current--;
		that.slideTo();
	}, this.countdown * 1000);
	return this;
};

XstSlide.prototype.mouseHover = function(t){
	var that = this;
	t.mouseover(function(e){
		e.stopPropagation();
		clearInterval(that.timer);
	}).mouseout(function(e){
		e.stopPropagation();
		that.autoSlide();
	});
	return this;
};

//延迟加载指定图片
XstSlide.prototype.delayLoad = function(index){
	if(typeof index != 'undefined'){
		var $item = this.$list.find('.item').eq(index);
		if($item.length > 0){
			var $img = $item.find('img'), url = $img.attr('data-url');
			if(url){
				if($img.hasClass('bg')){
					$img.css('background-image', 'url(' + url +')');
				}else{
					$img.attr('src', url);
				}
				$img.removeAttr('data-url');
			}
		}
	}
	var $all = this.$list.find('*[data-url]');
	if(!$all.length){
		this.isDelay = 0;
	}
	return this;
};

/*输入字数计算类
  o = {} 对象 初始化参数
  o.input 字符串 需要监控的输入框查询字符串
  o.func 字符串或函数。回调函数。如果使用类中定义的方法，需要传入方法名。如果是自定义函数则是函数名
  o.xxx 其他参数根据回调函数的需要自定义
*/
function InputCount(o){
	this.input = o.input || '#xsInput';
	this.func = o.func || function(){};
	o.input = null, o.func = null;
	this.param = o;
	this.init(o).bind();
}
InputCount.prototype.init = function(o){
	return this;
};
InputCount.prototype.bind = function(){
	var that = this;
	$(document).on('keyup change', this.input ,function(e){
		var inputText = $(this).val(), gbkLen = $.trim(inputText).gbkLen(),
			inputLen = Math.ceil(gbkLen / 2);
		if(typeof that.func == 'string'){
			that[that.func](inputLen);
		}else{
			that.func(inputLen, that.param);
		}
	});
};
InputCount.prototype.limit = function(inputLen){
	var o = this.param, $send = $(o.send), $tips = $(o.tips),
		left = o.maxLength - inputLen,
		tipsHtml = '还可以输入<span>' + left + '</span>字';
	if(inputLen == 0){
		$send.addClass('btn-disabled');
	}else if(left >= 0){
		tipsHtml = '还可以输入<span>' + left + '</span>字';
		$send.removeClass('btn-disabled');
	}else{
		tipsHtml = '已超出<span class="err">' + Math.abs(left) + '</span>字';
		$send.addClass('btn-disabled');
	}
	$tips.html(tipsHtml);
};

function inputCountLimit(inputLen, o){
	var $send = $(o.send), $tips = $(o.tips),
		left = o.maxLength - inputLen,
		tipsHtml = '还可以输入<span>' + left + '</span>字';
	if(inputLen == 0){
		$send.addClass('btn-disabled');
	}else if(left >= 0){
		tipsHtml = '还可以输入<span>' + left + '</span>字';
		$send.removeClass('btn-disabled');
	}else{
		tipsHtml = '已超出<span class="err">' + Math.abs(left) + '</span>字';
		$send.addClass('btn-disabled');
	}
	$tips.html(tipsHtml);
};

function AjaxPage(o) {
    this.wrap = o.wrap || '.content-wrap';
    this.$wrap = $(this.wrap);
    this.pageWrap = o.pageWrap || '.pagination';
    this.menuWrap = o.menuWrap || '.menu-warp';
    this.loadingClass = o.loadingClass || 'loading';
    this.menuSelector = typeof o.menuSelector == 'undefined' ? ' a' : (o.menuSelector ? ' '+o.menuSelector : '');
    this.$wrap.data('ajaxed',false);
    this.init();
}
AjaxPage.prototype.init = function() {
    $(this.pageWrap +' > li > a').each(function(){
        $(this).attr('href','javascript:;');
    });
    this.pageBind();
    return this;
};
AjaxPage.prototype.pageJump = function (url, data, success, fail) {
    var _this = this;
    if(this.$wrap.data('ajaxed')) return false;
    _this.$wrap.addClass(_this.loadingClass);
    _this.$wrap.html("<div class='loading-wrap'><img alt='加载中' src='/static/images/loading.gif'></div>");
    _this.$wrap.data('ajaxed',true);
    $.get(url, data, function(res) {
        _this.$wrap.data('ajaxed',false);
        _this.$wrap.removeClass(_this.loadingClass);
        _this.$wrap.html(res);
        $('.pagination > li > a').each(function(){
            $(this).attr('href','javascript:;');
        });
        if(typeof success == 'function') {
            success(res);
        }
    }).fail(function(jqxhr, textStatus, error) {
        _this.$wrap.data('ajaxed',false);
        if(typeof fail == 'function') {
            fail();
        }
    });
    return this;
}
AjaxPage.prototype.pageBind = function() {
    var _this = this;
    $(document).on('click', this.pageWrap +' > li > a', function() {
        if($(this).closest('li').hasClass('active')) return false;
        var $cur = $(_this.menuWrap + ' .active' + _this.menuSelector);
        var url = $cur.attr('jump');
        var page = parseInt($(this).attr('data-page'))+1;
        var data = {'page' : page};
        _this.pageJump(url,data);
    });
    return this;
};
AjaxPage.prototype.menuBind = function(callback) {
    var _this = this;
    $(_this.menuWrap + ' li a').click(function() {
        var $this = $(this);
        if($this.closest('li').hasClass('active')) return false;
        var url = $this.attr('jump');
        _this.pageJump(url,{}, function (data) {
            $(_this.menuWrap + ' li').removeClass('active');
            $this.closest('li').addClass('active');
            if(typeof callback == 'function') {
              callback(data);
            }
            adjustfooter();
        });
    });
    return this;
};

/**
* jquery.face.js
* 
* Copyright (c) 2016/5/24 Han Wenbo
*
**/

;(function($, window, document, undefined) {
    var plugName = "face",
        defaults = {
            open: true,//默认开启功能
            src: 'src/yun/',//表情路径
            rowNum: 5,//每行最多显示数量，此属性不适用于常用语
            btnAttr: ['0px', '5px', '20px', '20px'],//[left bottom width height] 触发按钮相对targetEl的位置和宽高  要写单位
            ctnAttr: ['0px', '30px', '40px', '40px'],//[left bottom width height] 表情框相对targetEl位置和里面的表情格子宽高  要写单位
            triggerEl: null,//触发按钮(不存在则自己生成，不要由a包裹)
            targetEl: null,//父级参照物(用于appendTo和定位)
            hideAdv: false,//是否隐藏广告
            advClass: 'FA_advCtn',//广告样式
            callback: function(data) {},//获取表情符后的回调函数
        };
    
    function Face($el, options) {
        this.plugName = plugName;
        this.$el = $el;
        this.prop = {};
        this.obj = {};
        this.$obj = {};
        this.defaults = defaults;
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    Face.prototype = {
        init: function() {
            this.variable();//声明变量
            if(this.options.open) {
                this.baseProp();//$el的基础属性
                this.baseEl();//生成外边框
                this.event();//绑定事件
            }
        },
        //声明变量
        variable: function() {
            this.obj.face = {//表情包
                '旺旺表情': [
                    ['微笑', '/::)'],
                    ['撇嘴', '/::~'],
                    ['色', '/::B'],
                    ['发呆', '/::|'],
                    ['得意', '/:8-)'],
                    ['流泪', '/::<'],
                    ['害羞', '/::$'],
                    ['闭嘴', '/::X'],
                    ['尴尬', '/::-|'],
                    ['发怒', '/::@'],//10
                    ['调皮', '/::P'],
                    ['呲牙', '/::D'],
                    ['惊讶', '/::O'],
                    ['难过', '/::('],
                    ['酷', '/::+'],
                    ['吐', '/::T'],
                    ['偷笑', '/:,@P'],
                    ['愉快', '/:,@-D'],
                    ['困', '/:|-)'],
                    ['惊恐', '/::!'],//10
                    ['流汗', '/::L'],
                    ['憨笑', '/::>'],
                    ['奋斗', '/:,@f'],
                    ['疑问', '/:?'],
                    ['嘘', '/:,@x'],
                    ['晕', '/:,@@'],
                    ['衰', '/:,@!'],
                    ['骷髅', '/:!!!'],
                    ['再见', '/:bye'],
                    ['糗大了', '/:&-('],//10
                    ['坏笑', '/:B-)'],
                    ['鄙视', '/:>-|'],
                    ['委屈', '/:P-('],
                    ['亲亲', '/::*'],
                    ['可怜', '/:8*'],
                    ['玫瑰', '/:rose'],
                    ['凋谢', '/:fade'],
                    ['嘴唇', '/:showlove'],
                    ['爱心', '/:heart'],
                    ['心碎', '/:break']//10
                ],
                '微信表情': [
                    ["微笑", "/::)"],
                    ["撇嘴", "/::~"],
                    ["色", "/::B"],
                    ["发呆", "/::|"],
                    ["得意", "/:8-)"],
                    ["流泪", "/::<"],
                    ["害羞", "/::$"],
                    ["闭嘴", "/::X"],
                    ["睡", "/::Z"],
                    ["大哭", "/::'("],//10
                    ["尴尬", "/::-|"],
                    ["发怒", "/::@"],
                    ["调皮", "/::P"],
                    ["呲牙", "/::D"],
                    ["惊讶", "/::O"],
                    ["难过", "/::("],
                    ["酷", "/::+"],
                    ["冷汗", "/:--b"],
                    ["抓狂", "/::Q"],
                    ["吐", "/::T"],//10
                    ["偷笑", "/:,@P"],
                    ["愉快", "/:,@-D"],
                    ["白眼", "/::d"],
                    ["傲慢", "/:,@o"],
                    ["饥饿", "/::g"],
                    ["困", "/:|-)"],
                    ["惊恐", "/::!"],
                    ["流汗", "/::L"],
                    ["憨笑", "/::>"],
                    ["悠闲", "/::,@"],//10
                    ["奋斗", "/:,@f"],
                    ["咒骂", "/::-S"],
                    ["疑问", "/:?"],
                    ["嘘", "/:,@x"],
                    ["晕", "/:,@@"],
                    ["疯了", "/::8"],
                    ["哀", "/:,@!"],
                    ["骷髅", "/:!!!"],
                    ["敲打", "/:xx"],
                    ["再见", "/:bye"],//10
                    ["擦汗", "/:wipe"],
                    ["抠鼻", "/:dig"],
                    ["鼓掌", "/:handclap"],
                    ["糗大了", "/:&-("],
                    ["坏笑", "/:B-)"],
                    ["左哼哼", "/:<@"],
                    ["右哼哼", "/:@>"],
                    ["哈欠", "/::-O"],
                    ["鄙视", "/:>-|"],
                    ["委屈", "/:P-("],//10
                    ["快哭了", "/::'|"],
                    ["阴险", "/:X-)"],
                    ["亲亲", "/::*"],
                    ["吓", "/:@x"],
                    ["可怜", "/:8*"],
                    ["菜刀", "/:pd"],
                    ["西瓜", "/:<W>"],
                    ["啤酒", "/:beer"],
                    ["篮球", "/:basketb"],
                    ["乒乓", "/:oo"],//10
                    ["咖啡", "/:coffee"],
                    ["饭", "/:eat"],
                    ["猪头", "/:pig"],
                    ["玫瑰", "/:rose"],
                    ["凋谢", "/:fade"],
                    ["嘴唇", "/:showlove"],
                    ["爱心", "/:heart"],
                    ["心碎", "/:break"],
                    ["蛋糕", "/:cake"],
                    ["闪电", "/:li"],//10
                    ["炸弹", "/:bome"],
                    ["刀", "/:kn"],
                    ["足球", "/:footb"],
                    ["瓢虫", "/:ladybug"],
                    ["便便", "/:shit"],
                    ["月亮", "/:moon"],
                    ["太阳", "/:sun"],
                    ["礼物", "/:gift"],
                    ["拥抱", "/:hug"],
                    ["强", "/:strong"],//10
                    ["弱", "/:weak"],
                    ["握手", "/:share"],
                    ["胜利", "/:v"],
                    ["抱拳", "/:@)"],
                    ["勾引", "/:jj"],
                    ["拳头", "/:@@"],
                    ["差劲", "/:bad"],
                    ["爱你", "/:lvu"],
                    ["NO", "/:no"],
                    ["OK", "/:ok"],//10
                    ["爱情", "/:love"],
                    ["飞吻", "/:<L>"],
                    ["跳跳", "/:jump"],
                    ["发抖", "/:shake"],
                    ["怄火", "/:<O>"],
                    ["转圈", "/:circle"],
                    ["磕头", "/:kotow"],
                    ["回头", "/:turn"],
                    ["跳绳", "/:skip"],
                    ["投降", "/:oY"],//10
                    ["激动", "/:#-0"],
                    ["乱舞", "/:hiphot"],
                    ["献吻", "/:kiss"],
                    ["左太极", "/:<&"],
                    ["右太极", "/:&>"]
                ]
            }
            this.obj.faceType = [];
            if(this.options.src.indexOf('wang')+1) {//旺旺表情
                this.obj.faceType[0] = '旺旺表情';
                this.obj.faceType[1] = 'bmp';
                this.obj.faceType[2] = 'gif';
            }
            if(this.options.src.indexOf('wx')+1) {//微信表情
                this.obj.faceType[0] = '微信表情';
                this.obj.faceType[1] = 'png';
                this.obj.faceType[2] = 'gif';
            }
            this.obj.maxNum_y = Math.ceil(this.obj.face[this.obj.faceType[0]].length/this.options.rowNum);//云问表情最大行数

            this.obj.showTip = false;//是否显示提示框
            this.obj.lastStrLen = 1;//
        },
        //基础属性
        baseProp: function() {
            this.prop.winW = $(window).width();
            this.prop.winH = $(window).height();

            this.prop.width = this.$el.width();
            this.prop.height = this.$el.height();
            this.prop.outerWidth = this.$el.outerWidth();
            this.prop.outerHeight = this.$el.outerHeight();

            this.prop.zIndex = this.$el.css('zIndex');

            this.prop.paddingLeft = parseInt(this.$el.css('paddingLeft'));
            this.prop.paddingTop = parseInt(this.$el.css('paddingTop'));
            this.prop.borderWidth = parseInt(this.$el.css('borderTopWidth'));

            this.prop.position = this.$el.position();
            this.prop.offset = this.$el.offset();

            this.prop.bottom = this.prop.winH - this.prop.offset.top;

            //是否rem
            this.prop.baseRem = parseInt($('html').css('fontSize'));
        },
        //生成触发按钮和表情框
        baseEl: function() {
            var This = this,
                isRem = false;

            //rem
            if(This.options.ctnAttr.join(',').indexOf('rem') != -1) {//rem
                isRem = true;
                
                for(var i=0; i<This.options.ctnAttr.length; i++) {
                    This.options.ctnAttr[i] = parseInt(parseFloat(This.options.ctnAttr[i]) * This.prop.baseRem);

                }
            }

            //触发按钮(可配置)
            if(this.options.triggerEl) {
                this.$obj.$FA_triBtn = this.options.triggerEl;
            }else {
                this.$obj.$FA_triBtn = $('<div class="FA_triBtn"></div>').css({
                    width: this.options.btnAttr[2],
                    height: this.options.btnAttr[3],
                }).appendTo(this.options.targetEl);

                //触发按钮定位
                this.$obj.$FA_triBtn.css({
                    left: this.options.btnAttr[0],
                    bottom: this.options.btnAttr[1],
                });
            }

            //背景框
            this.$obj.$FA_backCtn = $('<div class="FA_backCtn"></div>').hide().css({
            }).appendTo(this.options.targetEl);

            //滚动框
            this.$obj.$FA_ScrollCtn = $('<div class="FA_ScrollCtn"></div>').css({
                width: parseFloat(this.options.ctnAttr[2])*this.options.rowNum,
                height: parseFloat(this.options.ctnAttr[3])*4,
            }).appendTo(this.$obj.$FA_backCtn);

            //rem
            if(isRem) {//rem
                //背景框padding
                This.$obj.$FA_backCtn.css({
                    padding: (This.prop.baseRem - This.$obj.$FA_ScrollCtn.outerWidth())/2,
                });
            }

            //表情框
            this.$obj.$FA_faceCtn = $('<div class="FA_faceCtn"></div>').appendTo(this.$obj.$FA_ScrollCtn);

            //广告框
            this.$obj.$FA_advCtn = $('<div></div>').addClass(this.options.advClass).insertBefore(this.$obj.$FA_ScrollCtn);

            //关闭广告框
            this.$obj.$FA_closeAdvCtn = $('<div class="FA_closeAdvCtn" title="不再显示">×</div>').appendTo(this.$obj.$FA_advCtn);

            if(this.options.hideAdv) {//隐藏广告
                this.$obj.$FA_advCtn.hide();
            }

            this.obj.moodIndex = 0;
            for(var key in this.obj.face) {
                this.obj.moodIndex++;
                if(key == this.obj.faceType[0]) {//选择表情
                    var mood = this.obj.face[key],
                        html = '';
                    for(var i=0; i<this.options.rowNum*this.obj.maxNum_y; i++) {
                        var srcHtml = '',
                            title = '',
                            mark = '';

                        if(i < mood.length) {
                            srcHtml = '<img FA-src="'+ this.options.src + i +'.'+ this.obj.faceType[1] +'">';
                            title = mood[i][0];
                            mark = mood[i][1];
                        }

                        html += '<div class="FA_moodCtn" title="'+ title +'" mark="'+ mark +'" group="'+ key +'"><div class="FA_srcCtn" style="width: '+ parseInt(this.options.ctnAttr[2]) +'px; height: '+ parseInt(this.options.ctnAttr[3]) +'px">'+ srcHtml +'</div></div>';
                    }
                    this.$obj.$FA_faceCtn.append(html);
                }
            }

            //背景框定位
            this.$obj.$FA_backCtn.css({
                left: this.options.ctnAttr[0],
                bottom: this.options.ctnAttr[1],
            });

            //提示表情滚动框
            this.$obj.$FA_tipScrollCtn = $('<div class="FA_tipScrollCtn"></div>').css({
                width: this.options.ctnAttr[2]+50,
                height: this.options.ctnAttr[3]*4,
            }).appendTo('body');

            var $allMood = $('.FA_moodCtn[group=云问表情]').clone();

            $allMood.each(function() {
                var mark = $(this).attr('mark');

                $(this).find('.FA_srcCtn').css({
                    textIndent: 5,
                    textAlign: 'left',
                    width: This.options.ctnAttr[2]+50,
                }).find('img').after('<span>'+ mark +'</span>');
            });

            //提示表情框
            this.$obj.$FA_tipMoodCtn = $('<div class="FA_tipMoodCtn"></div>').append($allMood).appendTo(this.$obj.$FA_tipScrollCtn);

            //计算文字框
            this.$obj.$FA_countLenCtn = $('<div class="FA_countLenCtn"></div>').css({
                width: this.prop.width,
                height: this.prop.height,
                left: this.prop.offset.left+15,
                bottom: this.prop.bottom-this.prop.outerHeight-30,
                padding: this.prop.paddingTop +'px '+ this.prop.paddingLeft +'px',
                border: this.prop.borderWidth +'px solid blue',
                opacity: 0,
                zIndex: -999,
            }).hide().appendTo('body');

            //计算文字标识符
            this.$obj.$FA_markPos = $('<span class="FA_markPos"></span>').css({
            }).appendTo(this.$obj.$FA_countLenCtn);

        },
        //绑定事件
        event: function() {
            var This = this;

            //调用滚动插件(表情框)
            This.obj.scrollbar = This.$obj.$FA_ScrollCtn.scrollbar({
            });
            This.$obj.$FA_tipScrollCtn.hide();//调用滚动插件后才能隐藏

            //选择表情
            This.options.targetEl.on('click.FA', '.FA_moodCtn', function() {
                var val = This.$el.val(),
                    cursortPos = Base.getCursortPos(This.$el[0]),
                    fromVal = val.substr(0, cursortPos),
                    toVal = val.substr(cursortPos, val.length-1),
                    mark = $(this).attr('mark');

                This.$el.val(fromVal + mark + toVal);
                Base.setCaretPos(This.$el[0], cursortPos+mark.length);
                This.options.callback(This.$el.val());
                This.$obj.$FA_backCtn.hide();
            });
            
            //初始化切换按钮状态
            $('.FA_switchBtn').eq(0).addClass('FA_switchBtn_focus').siblings().removeClass('FA_switchBtn_focus');

            //点击切换
            $('body').on('click.FA', '.FA_switchBtn', function() {
                $(this).addClass('FA_switchBtn_focus').siblings().removeClass('FA_switchBtn_focus');
                if($(this).is('.FA_switchBtn_1')) {//云问表情
                    This.obj.scrollbar.scrollTo(This.obj.top1);
                }
            });

            //显隐
            $(document).on('click.FA', function(e) {
                if(e.target == This.$obj.$FA_triBtn[0]) {
                    $('[FA-src]').each(function() {//避免首次加载表情文件
                        $(this).attr('src', $(this).attr('FA-src')).removeAttr('FA-src');
                    });

                    This.$obj.$FA_backCtn.stop().show();

                    This.obj.scrollbar.update();
                    This.obj.scrollbar.scrollTo('top');

                    //显示后才能获取top
                    This.obj.top1 = 0;
                }else if($(e.target).is(This.$obj.$FA_backCtn) || $(e.target).parents('.FA_backCtn')[0]) {
                    return false;
                }else {
                    This.$obj.$FA_backCtn.stop().hide();
                }
            });

            //关闭广告
            This.$obj.$FA_closeAdvCtn.on('click.FA', function() {
                This.$obj.$FA_advCtn.stop().fadeOut();
            });

            This.$el.on('keydown.FA', function(e) {
                if(e.keyCode == 8) {
                    This.obj.bindInput = false;
                }else {
                    This.obj.bindInput = true;
                }
            });
        },
        update: function() {
            this.obj.scrollbar.update();
        },
        //转义表情
        replaceFace: function(data) {
            var src = this.options.src,
                faceType = this.obj.faceType,
                face = this.obj.face;

            for(var i in face) {
                if(i == faceType[0]) {
                    for(var j=0; j<face[i].length; j++) {//考虑到含有特殊字符，不用正则
                        while(data.indexOf(face[i][j][1])+1) {
                            var index = data.indexOf(face[i][j][1]),
                                len = face[i][j][1].length,
                                str1 = data.substr(0, index),
                                str2 = data.substr(index+len);
                            data = str1 +'<img src="'+ src + j +'.'+ faceType[2] +'">'+ str2;
                        }
                    }
                }
            }
            return data;
        }
    }

    $.fn.extend({
        face: function(options) {
            return new Face($(this), options);
        }
    })
})(jQuery, window, document);

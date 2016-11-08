/**   
* jquery.input.js plugin   
*/    
;(function($, window, document, undefined) {    
    'use strict';

    var plugName = "input",    
        defaults = {   
            noInput: '',// 不使用该插件的元素 
            maxLengthFormat: '$/$',//  最大字数显示格式
        };    
    
    function Input($this, options) {    
        this.name = plugName;    
        this.defaults = defaults;    
        this.options = $.extend({}, defaults, options);
        this.$el = $this;    
        this.init();    
    }    
    
    Input.prototype = {    
        init: function() {    
            this.createEl();// 生成元素
            this.events();// 绑定事件
        },    
        // 生成元素
        createEl: function() {  
            var This = this; 

            var style =
                ''; 
  
            //$('<style>'+ style +'</style>').appendTo('head');   

             
        },  
        // 绑定事件
        events: function() {
            var This = this;
            $('input:not('+ This.options.noInput +'), textarea:not('+ This.options.noInput +')', This.$el).each(function() {
                $(this).wrap('<div class="IN-wrapCtn"></div>');
                $(this).after('<span class="IN-placeholder">'+ $(this).attr('IN-placeholder') +'</span>');// 提示语
                //if($(this).attr('IN-maxLength')) {
                $(this).after('<span class="IN-maxLength"></span>');// 最大字数
                //}
            }).on("input.IN propertychange.IN keyup.IN", function() {  
                This.maxLength($(this));  
                if($(this).val()) {
                    $(this).next().hide();
                }else {
                    $(this).next().show();
                }
            });
            
        },
        // 最大字数
        maxLength: function($obj/*$input, $tip, $word*/) {
            var maxNum = $(obj).attr('IN-maxLength'),
                maxLengthFormat = this.options.maxLengthFormat.split('');

            if(maxNum && maxLengthFormat[0]) {
                var prefix = maxLengthFormat[0],
                    suffix = maxLengthFormat[0];
            }

            /*var nowNum = 0,
                maxNum = this.options.remainWordNum,
                word = $input.val(),
                len = word.toString().length;

            if(len > maxNum) {
                word = word.substr(0, maxNum);
                $input.val(word);
                len = word.toString().length;
            }
            $word.text(maxNum - len);*/
        }
    }    
    
    $.fn.extend({    
        input: function(options) {    
            return this.each(function() {    
                new Input($(this), options);    
            })    
        }    
    })    
})(jQuery, window, document);
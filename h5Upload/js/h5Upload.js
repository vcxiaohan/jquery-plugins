/**
* jquery.h5Upload.js
* 
* Copyright (c) 2017/4/25 Han Wenbo
*
**/

;(function($, window, document, undefined) {
	var plugName = "h5Upload",
		defaults = {
			url: '',// 上传接口，后台接口须支持接收多文件
			maxNum: 0,// 单次最大上传数量
			$trigger: null,// 触发上传的input
			$drag: $(document),// 上传进度和图片预览显示的框
			startcall: function(ran) {},// 开始上传时的回调
			callback: function(data, ran) {},// 上传结束后的回调
			type: '',// 允许上传的文件格式，如：gif|jpeg|bmp|jpg|png 为空时不限制格式
			typecall: function(noSuit) {},// 不符合文件类型时的回调
		};
	
	function H5Upload($el, options) {
		this.plugName = plugName;
		this.$el = $el;
		this.defaults = defaults;
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	H5Upload.prototype = {
		init: function() {
			this.variable();// 声明变量
			this.event();// 绑定事件
		},
		// 声明变量
		variable: function() {
			var style = 
				'.upFileMask {'+
					'width: 100%;'+
					'height: 100%;'+
					'top: 0;'+
					'left: 0;'+
					'background: rgba(0, 0, 0, 0.4);'+
					'position: fixed;'+
					'z-index: 19930606;'+
				'}'+
				'.upFileCtn {'+
					'padding: 10px;'+
					'text-align: center;'+
					'position: absolute;'+
					'top: 50%;'+
					'left: 50%;'+
					'transform: translate(-50%, -50%);'+
					'max-height: 80%;'+
					'overflow: auto;'+
				'}'+
				'.upFileItem {'+
					'display: inline-block;'+
					'padding: 0 5px;'+
				'}'+
				'.upFileImg {'+
					'border: 0;'+
					'max-height: 200px;'+
				'}'+
				'.upFileName {'+
					'color: #fff;'+
					'font-size: 12px;'+
					'text-align: center;'+
					'margin-bottom: 5px;'+
				'}'+
				'.upFileAbort {'+
					'position: absolute;'+
					'right: 0;'+
					'top: 0;'+
					'background: #3d3f40;'+
					'color: #fff;'+
					'border-radius: 100%;'+
					'font-size: 12px;'+
					'cursor: pointer;'+
					'width: 15px;'+
					'height: 15px;'+
					'line-height: 15px;'+
				'}'+
				'.upFileOuter {'+
					'height: 5px;'+
					'background: #1a1a1a;'+
					'position: relative;'+
					'border-radius: 5px;'+
					'overflow: hidden;'+
				'}'+
				'.upFileInner {'+
					'display: inline-block;'+
					'height: 100%;'+
					'background: #5e90d6;'+
					'position: absolute;'+
					'top: 0;'+
					'left: 0;'+
				'}';

			if(!$('[UP]')[0]) {
				$('head').append('<style UP>'+ style +'</style>');
			}

			// 无法预览base64    
			this.base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABYCAYAAABiQnDAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI1Q0NBQjg1NUExNzExRTY5RTEzREZFNTRENzc4RkFGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI1Q0NBQjg2NUExNzExRTY5RTEzREZFNTRENzc4RkFGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjVDQ0FCODM1QTE3MTFFNjlFMTNERkU1NEQ3NzhGQUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjVDQ0FCODQ1QTE3MTFFNjlFMTNERkU1NEQ3NzhGQUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4+S+GgAAAGC0lEQVR42uyc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';
			this.fileData = [];// fileData 为数组 
		},
		// 绑定事件
		event: function() {
			var This = this;

			This.options.$drag.on('drop.UP', function(e) {
				e.stopPropagation();
			    This.fileData = e.originalEvent.dataTransfer.files;  
			    This.autoUpload(This.options.url, This.options.$trigger, This.options.startcall, This.options.callback, This.options.type, This.options.typecall);
				return false;
			}).on('dragleave.UP dragenter.UP dragover.UP', function(e) {
				e.stopPropagation();
				return false;
			})
			This.h5Upload(This.options.url, This.options.maxNum, This.options.$trigger, This.options.startcall, This.options.callback, This.options.type, This.options.typecall);
		},
		// 上传方法 
		h5Upload: function(url, maxNum, $trigger, startcall, callback, type, typecall) {
			var This = this;

			$trigger.on('change.UP', function() {    
			    This.fileData = [];  
			    try {
			        var len = maxNum ? (maxNum>$trigger[0].files.length?$trigger[0].files.length:maxNum) : $trigger[0].files.length;
			        for(var i=0; i<len; i++) {//IE9-不支持files    
			            This.fileData[i] = $trigger[0].files[i];  
			        }  
			        This.autoUpload(url, $trigger, startcall, callback, type, typecall);
			    }catch(e) {}
			});    
		},
		// 自动上传
		autoUpload: function(url, $trigger, startcall, callback, type, typecall) {
			var This = this;

			if(!this.fileData[0]) {    
			    return;    
			}    

			This.uploadFile({    
			    url: url,   
			    data: {    
			        file: This.fileData,// fileData 为数组  
			    },    
			    beforeload: function(formData) {
			        var noSuit = [];// 不符合类型的文件

			        typeReg = new RegExp('\.'+ type, 'i');
			        for(var key in formData) {  
			            var val = formData[key];  
			            if(val instanceof Array) {//hack数组对象 

			                for(var i=0,len=val.length; i<len; i++) { 
			                    if(typeReg.test(val[i].name)) {// 文件类型允许
			                    }else {// 文件类型禁止
			                        noSuit.push(val[i]);
			                        val[i] = [];
			                    }
			                }  
			            }
			        }
			        typecall && typecall(noSuit);  
			        return formData;
			    },
			    loadstart: function(e, ran, xhr) {   
			        startcall && startcall(ran);//开始时的回调

			        var $upFileCtn = $('<div class="upFileCtn"></div>'),  
			            $upFileAbort = $('<span class="upFileAbort">×</span>'),  
			            $upFileOuter = $('<div class="upFileOuter"></div>'),  
			            $upFileInner = $('<em class="upFileInner"></em>');  
			
			        for(var i=0,len=This.fileData.length; i<len; i++) { 
			            if(!(This.fileData[i] instanceof Array)) {
			                var $upFileItem = $('<div class="upFileItem" size="'+ This.fileData[i].size +'"></div>'),  
			                    $upFileName = $('<p class="upFileName" size="'+ This.fileData[i].size +'" hasRead="0">'+ This.fileData[i].name +'</p>');  
			  
			                $upFileName.appendTo($upFileItem);  
			                $upFileItem.appendTo($upFileCtn);  
			  
			                try {  
			                    var reader = new FileReader();//IE9-不支持FileReader  
			                    if(This.fileData[i].type.indexOf('image')+1) {//可预览  
			                        reader.readAsDataURL(This.fileData[i]);  
			                        reader.onload = function(e) {  
			                            var $upFileImg = $('<img class="upFileImg" src="'+ e.target.result +'">');  
			                            var $upFileName = $('.upFileName');  
			                            for(var j=0,len=$upFileName.length; j<len; j++) {  
			                                var $cur_upFileName = $upFileName.eq(j);  
			                                if((e.total==$cur_upFileName.attr('size')) && !parseInt($cur_upFileName.attr('hasRead'))) {  
			                                    $cur_upFileName.attr('hasRead', '1').before($upFileImg);  
			                                    break;  
			                                }  
			                            }  
			                        }  
			                    }else {  
			                        var $upFileImg = $('<img class="upFileImg" src="'+ This.base64 +'">');  
			                        $upFileImg.insertBefore($upFileName);  
			                    }  
			                }catch(e) {}  
			            }
			        }  
			           
			        var $upFileMask = $('<div class="'+ ran +' upFileMask"></div>');
			        $upFileCtn.append($upFileAbort);    
			        $upFileCtn.append($upFileOuter);    
			        $upFileOuter.append($upFileInner); 
			        $upFileCtn.append($upFileOuter); 
			        $upFileMask.append($upFileCtn); 
			        
			        $('body').append($upFileMask);  
			
			        //取消上传    
			        $upFileAbort.on('click', function() {  
			            xhr.abort();    
			            $upFileMask.remove();  
			            $('.FA_'+ ran).parents('.MN_ask').remove();
			        });  
			        $trigger[0].value = null;//清空文件路径    
			    },    
			    progress: function(e, ran, xhr) { 
			        if (e.lengthComputable) {    
			            var $upFileInner = $('.'+ ran +' em');    
			
			            $upFileInner.width(e.loaded/e.total*100 +'%');  
			        }    
			    },    
			    load: function(e, ran) {    
			        var $upFileMask = $('.'+ ran).remove();  
			        callback && callback(JSON.parse(e.currentTarget.response), ran);  
			    }    
			});    
		},
		// 上传文件
		uploadFile: function(options) {
			var form = new FormData(),//FormData 对象    
			    ran = ('ran'+ Math.random()).replace(/\./, ''),//唯一标识符   
			    formData = options.data;// 表单数据载体数组
			
			formData = options.beforeload(formData);

			var formLen = false;
			for(var key in formData) {  
			    var val = formData[key];  
			    if(val instanceof Array) {//hack数组对象  
			        for(var i=0,len=val.length; i<len; i++) {  
			            if(!(val[i] instanceof Array)) {
			                form.append(key, val[i]);//增加表单数据   
			                formLen = true;
			            }
			        }  
			    }
			}
			if(formLen) {// 符合文件类型
			    //创建 - 非IE6 - 第一步    
			    if (window.XMLHttpRequest) {    
			        var xhr = new XMLHttpRequest();    
			    } else { //IE6及其以下版本浏览器    
			        var xhr = new ActiveXObject('Microsoft.XMLHTTP');    
			    }    
			    
			    xhr.open("post", options.url, true);    
			    
			    //开始传输    
			    xhr.addEventListener("loadstart", function(e) {  
			        options.loadstart(e, ran, xhr);//xhr用于取消上传    
			    });    
			    //传输中    
			    xhr.upload.addEventListener("progress", function(e) {    
			        options.progress(e, ran, xhr);    
			    });    
			    //传输成功    
			    xhr.addEventListener("load", function(e) {    
			        options.load(e, ran);    
			    });    
			    
			    xhr.send(form);
			}
		},
	}

	$.fn.extend({
		h5Upload: function(options) {
			return new H5Upload($(this), options);
		}
	})
})(jQuery, window, document);
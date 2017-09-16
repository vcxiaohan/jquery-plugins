#### face说明文档

* ###### demo示例
	[http://demo.vcxiaohan.com/jquery-plugins/face/demo.html](http://demo.vcxiaohan.com/jquery-plugins/face/demo.html)

* ###### 功能简介
	1. 该 *demo* 供用户选择的表情有2种，用户也可以根据需求拓展自定义表情
	2. [微信表情压缩包下载](http://demo.vcxiaohan.com/jquery-plugins/face/src/wx.zip)
	3. 该插件需[滚动条插件](https://github.com/vcxiaohan/jquery-plugins/tree/master/scrollbar)的支持
	4. 完全支持手机端
	5. 支持rem响应设计
	
    	
* ###### 使用说明
	1. 选择好预使用的表情，点击“点击加载”按钮
	2. 调用示例

			var Face = $('.textarea').face({
            	src: 'src/yun/',//表情路径
			    rowNum: 7,//每行最多显示数量，此属性不适用于常用语
			    ctnAttr: ['0rem', '0rem', '0.133rem', '0.122rem'],//[left bottom width height] 表情框相对targetEl位置和里面的表情格子宽高  要写单位
			    triggerEl: $('.faceBtn'),//触发按钮(不存在则自己生成，不要由a包裹)
			    targetEl: $('.editHide'),//父级参照物(用于appendTo和定位)
			    hideAdv: true,//是否隐藏广告
			    callback: function(data) {// 选择表情后回调
			        console.log(data);
			    },
			});
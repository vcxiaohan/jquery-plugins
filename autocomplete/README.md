#### autocomplete 说明文档

* ###### demo 示例
	1. [http://v3.faqrobot.org/hvb/jquery-plugins/autocomplete/demo.html](http://v3.faqrobot.org/hvb/jquery-plugins/autocomplete/demo.html)

* ###### 功能简介
	1. 输入框提示插件
	2. 支持方向键上下选中
	3. 可以配置最多提示条数
	4. 请注意要修改为符合自己后台返回的格式要求

    	
* ###### 使用说明
	1. 内部名词解释
		* 在输入框中输入文字，默认延时500ms后显示提示的文字
	2. 调用示例  

			$('.input').autocomplete({
			    prefix: '/',//[string]
			    url: 'servlet/AQ?s=ig',//[string]
			    targetEl: $('.inputCtn'),//参照物(用于appendTo和定位)
			    posAttr: ['0px', '0px'],//外边框的定位[left bottom]
			    itemNum: 10,//[int] 默认全部显示
			    callback: function(data) {//获取文本后的回调函数
			        $('.showCtn').append(data);
			    }
			});

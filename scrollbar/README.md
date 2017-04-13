#### scrollbar 说明文档

* ###### demo 示例
	1. [http://v3.faqrobot.org/hvb/jquery-plugins/scrollbar/demo.html](http://v3.faqrobot.org/hvb/jquery-plugins/scrollbar/demo.html)

* ###### 功能简介
	1. 该插件需要配合 *jquery.mousewheel* 使用
	2. 可自定义滚动条样式
	3. 内容改变时可自动滚动到底部
	4. 兼容ie8+、手机端
	5. 支持嵌套使用(滚动条内部可再包含滚动条)
    	
* ###### 使用说明
	1. 内部名词解释
		* 调用插件的父级元素有且仅有一个子级元素
	2. 调用示例  

			var scrollbar = $('.bOuter').scrollbar({  
			    backClass: 'customBackClass',
			    frontClass: 'customFrontClass',
			    autoBottom: false,//内容改变，是否自动滚动到底部
			    callback: function(curPos, delta) {//滚动时事件回调
			        console.log(curPos, '当前top值为'+ curPos +'px', delta, delta==1?'向下滚':'向上滚');
			    }
			});

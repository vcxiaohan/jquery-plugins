#### dragMove说明文档

* ###### demo示例
	[demo](http://rszhang.faqrobot.net/jquery-plugins/dragMove/demo.html)

* ###### 功能简介
	1. 该 *demo* 已包含插件本身和使用示例，您也可以将插件单独抽出，引用使用
	2. 该拖动效果的实现思路是通过拖动子元素，来移动父元素
	3. 效果分为2种：
    	* 单纯的拖动  
    	* 拖动交换位置
    4. *demo* 效果介绍
    	* 第一组可以和第二组交换
    	* 第三组只能组内交换
    	* 第四组是单纯的拖动
    	* 后添加的元素都要加上 *DR_mid* 的类名(防止位置对不齐)
    	
* ###### 使用说明
	1. 内部名词解释
		* 类名 *DR_drag* 是用来分组的，是我们主动拖动的子元素
		* 类名 *DR_replace* (0-单纯拖动 1-交换位置) 是用来识别当前元素是否可与同组内元素交换位置
	2. 调用示例  

			$('body').dragMove({  
			    limit: true,// 限制在窗口内  
			    callback: function($move, $replace) {
			        console.log('拖动了'+ $('p', $move).text() +'跟'+ $('p', $replace).text() +'进行交换');
			    }  
			});

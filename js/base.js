/**  
 * base.js v-1.2.0 
 * 
 * Copyright (c) 2016/3/3 Han Wenbo 
 * 
 * Here are some common public methods! 
 * 
 **/  

;(function($, window, document, undefined) {  
    function Base() {}  
    Base.prototype = {  
        init: function() {},  
        //请求->所有的请求都需要经过(特殊的除外)    
        /*Base.request({  
            url: '...',  
            params: {  
            },  
            callback: function(data) {  
            },  
        });*/  
        request: function(options) {  
            var This = this,  
                params = { //必须参数    
                    //    
                },  
                defaults = {  
                    prefix: '../../',  
                    //接口路径前缀(不能写根路径)    
                    $formObj: $(),  
                    //被序列化的form表单    
                    dataObj: {},  
                    callback: function() {},  
                    //回调函数    
                },  
                options = $.extend({}, defaults, options);  
            formData = $.extend({}, This.formatSeriData((options.$formObj.serialize())), options.dataObj); //中文乱码,使用decodeURIComponent解码即可    
            $.ajax({  
                url: encodeURI(options.prefix + (options.url || '...')),  
                //...为基础地址    
                type:  options.type || 'get',  
                dataType: options.dataType || 'json',  
                data: $.extend({}, params, options.params, formData),  
                cache: false,  
                //IE下有用    
                success: function(data) {  
                    if (data) {  
                        options.callback(data);  
                    }  
                }  
            });  
        },
        //格式化被序列化后的数据->http://xxx.com?a=1&b=2化为{a:1, b:2}->值不能含有'='或'&'   
        formatSeriData: function(data) {  
            if (!data) {  
                return;  
            }  
            var obj = '',  
                dot = ',',  
                arr = data.match(/[^?^#^&]+=[^?^#^&]*/g); 

            for (var i = 0; i < arr.length; i++) {  
                var str = arr[i].match(/([^=]+)=([^=]*)/);  
                if (i == arr.length - 1) {  
                    dot = '';  
                }  
                obj += '"' + str[1] + '"' + ":" + '"' + str[2] + '"' + dot;  
            }  
            return JSON.parse('{' + decodeURIComponent(obj) + '}');  
        },  
        // 判断类型 array number string date function regexp object boolean null undefined    
        isType: function(obj, type) {  
            return Object.prototype.toString.call(obj).toLowerCase() === '[object ' + type + ']';  
        },  
        //判断手机还是pc->true是pc 参数bool为true时，返回具体型号
        /*if(Base.isPC()) {
            return;
        }*/
        isPC: function (bool) {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["android", "iphone",
                        "symbianos", "windows phone",
                        "ipad", "ipod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.toLowerCase().indexOf(Agents[v]) > 0) {
                    if(bool) {
                        return Agents[v];
                    }
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        //判断浏览器类型      
        myBrowser: function() {  
            var userAgent = navigator.userAgent,  
                isOpera = userAgent.indexOf("Opera") > -1;  

            if (isOpera) {  
                return "Opera";  
            };  
            if (userAgent.indexOf("Firefox") > -1) {  
                return "FF";  
            }  
            if (userAgent.indexOf("Chrome") > -1) {  
                return "Chrome";  
            }  
            if (userAgent.indexOf("Safari") > -1) {  
                return "Safari";  
            }  
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {  
                return "IE";  
            };  
        },  
        //判断IE的版本(非ie返回undefined)    
        ieVersion: function() {  
            var browser = navigator.appName;  
            var b_version = navigator.appVersion;  
            var version = b_version.split(";");  
            var trim_Version = "";  
            if (!version[1]) return;  
            trim_Version = version[1].replace(/[ ]/g, "");  
            if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {  
                return 6;  
            } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {  
                return 7;  
            } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {  
                return 8;  
            } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {  
                return 9;  
            }  
        },  
        //获取光标位置    
        getCursortPos: function(obj) {  
            var CaretPos = 0; // IE Support    
            if (document.selection) {  
                obj.focus();  
                var Sel = document.selection.createRange();  
                Sel.moveStart('character', -obj.value.length);  
                CaretPos = Sel.text.length;  
            }  
            // Firefox support    
            else if (obj.selectionStart || obj.selectionStart == '0') CaretPos = obj.selectionStart;  
            return CaretPos;  
        },  
        //设置光标位置    
        setCaretPos: function(obj, pos) {  
            if (obj.setSelectionRange) {  
                obj.focus();  
                obj.setSelectionRange(pos, pos);  
            } else if (obj.createTextRange) {  
                var range = obj.createTextRange();  
                range.collapse(true);  
                range.moveEnd('character', pos);  
                range.moveStart('character', pos);  
                range.select();  
            }  
        },  
        //禁用菜单    
        banCtxMenu: function() {  
            $(document).on("contextmenu", function(e) {  
                return false;  
            });  
        },  
        //获取格式化时间    
        getFormatDate: function() {  
            var today = new Date(),  
                year = today.getFullYear(),  
                month = this.addZero(today.getMonth() + 1),  
                date = this.addZero(today.getDate()),  
                hour = this.addZero(today.getHours()),  
                minute = this.addZero(today.getMinutes()),  
                second = this.addZero(today.getSeconds());  

            return year + "-" + month + "-" + date + ' ' + hour + ":" + minute + ":" + second;  
        },  
        //格式化秒数->7203秒化为02时00分03秒    
        formatSecond: function(num) {  
            var second = this.addZero(parseInt(num % 60)) + '秒',  
                minute = this.addZero(parseInt(num / 60 % 60)) + '分',  
                hour = this.addZero(parseInt(num / 60 / 60 % 60)) + '时';  

            if (hour == '00时') {  
                hour = '';  
                if (minute == '00分') {  
                    minute = '';  
                }  

            }  
            return hour + minute + second;  
        },  
        //格式化毫秒数->7203毫秒化为00分07秒20(原203，最后一位省略)毫秒    
        /*//设置倒计时  
        var t = 900000,//15分钟  
            timer = setInterval(function() {  
            $('.time').text(Base.formatMillisecond(t));  
            if(t <= 0) {  
                Base.layerMsg('中奖用户已揭晓，确认并跳转查看', function() {  
                    this.location.href = '';  
                });  
                clearInterval(timer);  
            }  
            t -= 25;  
        }, 25);*/  
        formatMillisecond: function(num) {  
            var millisecond = num % 1000,  
                second = this.addZero(parseInt(num / 1000 % 60)) + ':',  
                minute = this.addZero(parseInt(num / 1000 / 60 % 60)) + ':';  

            millisecond = millisecond > 99 ? (millisecond + '').substring(0, (millisecond + '').length - 1) : millisecond;  
            millisecond = this.addZero(parseInt(millisecond));  

            return minute + second + millisecond;  
        },  
        //将b转化为kb或m  
        formatSize: function(num) {  
            var kb = num/1024,  
                mb = num/1024/1024;  


            if(kb < 1024) {  
                return kb.toFixed(1) +'KB';  
            }else {  
                return mb.toFixed(1) +'MB';  
            }  
        },  
        //个位数前面加0(num必须为int)    
        addZero: function(num) {  
            return num < 10 ? "0" + num : num;  
        },  
        //多余字数加省略号    
        addDots: function(str, num, type) {  
            if (type) { //true 中文算两个字符    
                var result = '',  
                    len = 0;  

                for (var i = 0; i < str.length; i++) {  
                    if (len < num) {  
                        if (str[i].match(/[^\x00-\xff]+/)) { //匹配双字节字符(包括汉字)  [\u4e00-\u9fa5]能匹配中文字符    
                            len += 1;  
                        } else {  
                            len += .5;  
                        }  
                        result += str[i];  
                    } else {  
                        result += '...';  
                        break;  
                    }  
                }  
                return result;  
            } else {  
                str += '';  
                if (str.length > num) {  
                    str = str.substr(0, num) + '...';  
                }  
                return str;  
            }  
        },  
        //不重复获取1-maxRandom的数字，可设置允许出现的最大数    
        getRandomNum: function(maxRandom, maxNum) {  
            var arrA = [];  
            var arrX = [];  
            var arr = [];  
            for (var m = 0; m < maxRandom; m++) {  
                var res = false;  
                var ran = Math.ceil(Math.random() * maxRandom);  

                while (!res) {  
                    var x = 1;  

                    for (var i = 0; i < arrA.length; i++) {  
                        if (ran != arrA[i]) {  
                            arrX[i] = 1;  
                        } else {  
                            arrX[i] = 0;  
                        }  
                    }  

                    for (var j = 0; j < arrX.length; j++) {  
                        x *= arrX[j];  
                    }  
                    if (x) {  
                        res = true;  
                        arrA.push(ran);  
                    } else {  
                        ran = Math.ceil(Math.random() * maxRandom);  

                    }  

                }  
            }  
            for (var i = 0; i < arrA.length; i++) {  
                if (maxNum < arrA[i]) {  
                    arrA[i] = arrA[i] % maxNum ? arrA[i] % maxNum : maxNum;  
                }  
            }  

            return arrA;  
        },  
        //弹出提示框 (应用layer.js)    
        /*Base.layerMsg(data.message);*/  
        layerMsg: function(msg, callback) {  
            var index = layer.open({  
                title: false,  
                shadeClose: true,  
                content: msg,  
                closeBtn: 0,  
                area: ['270px'],  
                end: function() {  
                    if (callback) {  
                        callback();  
                    } else {  
                        layer.close(index);  
                    }  
                }  
            });  
        },  
        //是否是黑夜 7/8-18/19-day 20/21-6/7-night    
        isNight: function() {  
            var today = new Date(),  
                hour = this.addZero(today.getHours());  
            if (hour >= 7 && hour <= 19) {  
                return 'day';  
            } else {  
                return 'night';  
            }  
        },  
        // 判断类型 array number string date function regexp object boolean null undefined      
        isType: function(obj, type) {  
            return Object.prototype.toString.call(obj).toLowerCase() === '[object ' + type + ']';  
        },  
        // 获取图片真实宽高
        getNaturalSize: function(img, fn) {  
            /*if (img.naturalWidth) { //这属性很怪异(时而有效)      
                fn(img.naturalWidth, img.naturalHeight);  
            } else {}*/
            var pic = new Image();  

            pic.onload = function() { //加载完毕后(建议)      
                fn(pic.width, pic.height);  
            }  
            pic.src = img.src; //这句放在onload后面(兼容ie8)
        },  
        /*
        * imageLoad('<img src="http://a.jpg"><img src="b.png"><a href=""></a><a href="http://xxx.com"></a>')
        */
        // 匹配html中所有链接，所有图片加载完毕后执行回调
        imageLoad: function(str, callback) {
            var imgArr = str.split('').reverse().join('').match(/[^'"]+(?=['"]=(crs|ferh))/g),
            imgPromiseArr = [];

            // 反转回来
            for(var i=0; i<imgArr.length; i++) {
                imgArr[i] = imgArr[i].split('').reverse().join('');
            }
            try {// 防止ie8报错
                for(var i=0; i<imgArr.length; i++) {
                    if(/gif|jpeg|bmp|jpg|png/.test(imgArr[i])) {
                        var imgPromise = new Promise(function(resolve, reject) {
                            var pic = new Image();

                            pic.onload = function() { //加载完毕后(建议)
                                resolve(pic.src +'加载完毕');
                            }
                            pic.src = imgArr[i]; //这句放在onload后面(兼容ie8)
                        });
                        imgPromiseArr.push(imgPromise);
                    }
                }

                Promise.all(imgPromiseArr)
                .then(function(data) {
                    console && console.log(data);
                    callback && callback();
                });
            }catch(e) {}
        },
        //格式化时间 true 214321421->2016-9-9 11:23  
        formatTime(time, bool) {  
            if(!time) return '';  
            if(bool) {//true  
                var date = new Date(time*1000).toLocaleString().replace(/\//g, '-').replace(/:\d+$/, '')  
                if(date.indexOf('下午')+1) {  
                    var hour = date.match(/(\d+):/);  
                    hour = +hour[1] + 12;  
                    date = date.replace(/([\u4e00-\u9fa5]+)\d+(:)/, hour +'$2');  
                }else {  
                    date = date.replace(/[\u4e00-\u9fa5]+/, '');  
                }  
                return date;  
            }else {  
                return new Date(time).getTime()/1000;  
            }  
        },  
        //获取链接中某个参数    
        getParam: function(param, callback) {  
            var reg = new RegExp(param + '=(\d*[a-zA-Z]*[^?|^#|^&]*)'),  
                str = location.href.match(reg);  
            if (str) {  
                str = str[1];  
                callback && callback();  
                return str;  
            }  
        },  
        //获取时段    
        timePoint: function() {  
            var today = new Date(),  
                hour = +today.getHours(),  
                word = '';  
            switch (true) {  
            case (hour >= 3 && hour < 6):  
                word = "凌晨";  
                break;  
            case (hour >= 6 && hour < 8):  
                word = "早晨";  
                break;  
            case (hour >= 8 && hour < 11):  
                word = "上午";  
                break;  
            case (hour >= 11 && hour < 13):  
                word = "中午";  
                break;  
            case (hour >= 13 && hour < 17):  
                word = "下午";  
                break;  
            case (hour >= 17 && hour < 19):  
                word = "傍晚";  
                break;  
            case (hour >= 19 && hour < 23):  
                word = "晚上";  
                break;  
            case (hour >= 23 && hour < 3):  
                word = '深夜';  
                break;  
            }  
            return word;  
        },  
        // 判断网址    
        url: function(url) {  
            return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\*\+,;=]|:|@)|\/|\?)*)?$/i.test(''+ url);  
        },
        // 判断手机号
        phone: function(phone) {
            return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(''+ phone);
        },
        // 获取纯文本
        getPlainText: function(str) {
            return (str+'').replace(/<[^>]*>|/g, '');
        },
        /*var fileData = [];    
         for(var i=0,len = $('[name=file]')[0].files.length; i<len; i++) {// IE9-不支持files      
             fileData[i] = $('[name=file]')[0].files[i];
         }

         Base.uploadFile({
             url: '../../',      
             data: {      
                 file: fileData,
             },
             load: function(data) {
             }
         });*/
        //上传文件      
        uploadFile: function(options) {      
            var form = new FormData(),//FormData 对象      
                ran = ('ran'+ Math.random()).replace(/\./, '');//唯一标识符      

            for(var key in options.data) {    
                var val = options.data[key];    
                if(val instanceof Array) {//hack数组对象    
                    for(var i=0,len=val.length; i<len; i++) {    
                        form.append(key, val[i]);//增加表单数据      
                    }    
                }else {    
                    form.append(key, val);//增加表单数据      
                }    
            }      

            //创建 - 非IE6 - 第一步      
            if (window.XMLHttpRequest) {      
                var xhr = new XMLHttpRequest();      
            } else { //IE6及其以下版本浏览器      
                var xhr = new ActiveXObject('Microsoft.XMLHTTP');      
            }      

            xhr.open("post", options.url, true);      

            //开始传输      
            xhr.addEventListener("loadstart", function(e) {      
                options.loadstart && options.loadstart(JSON.parse(e.currentTarget.response), ran, xhr);//xhr用于取消上传      
            });      
            //传输中      
            xhr.upload.addEventListener("progress", function(e) {      
                options.progress && options.progress(JSON.parse(e.currentTarget.response), ran);      
            });      
            //传输成功      
            xhr.addEventListener("load", function(e) {      
                options.load && options.load(JSON.parse(e.currentTarget.response), ran);      
            });      

            xhr.send(form);      
        },
        /*getMonSunDay(1481472000000, [1481472000000, 1481472000000, 1482076800000])*/
        // 获取某天所在的周的星期一和星期日的范围，并判断某些天是否属于那周 millisecond-某天的毫秒数 milliseconds-需要判断的某些天的毫秒数的数组
        getMonSunDay: function(millisecond, milliseconds) {
            var date = new Date(millisecond),
                day = date.getDay(),
                hour = date.getHours(),
                minute = date.getMinutes(),
                second = date.getSeconds(),
                item = 24*60*60*1000,// 1天的毫秒数
                diff = hour*60*60*1000+minute*60*1000+second*1000,// 当天零头的时、分、秒
                millisecondStart = millisecond - diff,
                millisecondEnd = millisecond + item - diff;

            var range = [millisecondStart-(day-1)*item, millisecondEnd+(7-day)*item],// 本周星期一零点到下周星期一零点的范围
                result = [];
            if(milliseconds) {
                if(milliseconds[0]) {
                    for(var i=0; i<milliseconds.length; i++) {
                        if(milliseconds[i]>=range[0] && milliseconds[i]<range[1]) {
                            result[i] = true;
                        }else {
                            result[i] = false;
                        }
                    }
                }
            }
            return {
                range: range,
                result: result
            }
        },
        // 设置存储
        setStorage: function(key, val) {
            var beforeTasks = JSON.parse(localStorage.getItem(key)) || [];

            var index = 0;
            for(var i=0; i<beforeTasks.length; i++) {
                if(beforeTasks[i].taskId == val) {
                    index = ++i;
                    break;
                }
            }

            val = $.extend({}, {
                taskId: val,
                actualFinish: parseInt(new Date().getTime()/1000)
            });

            if(index) {
                beforeTasks[--index] = val;
            }else {
                beforeTasks.push(val);
            }

            localStorage.setItem(key, JSON.stringify(beforeTasks));
        },
        // 获取存储
        getStorage: function(key) {
            return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
        },
    };  

    window.Base = new Base();  



})($, window, document);
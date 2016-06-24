/*
* @object obj
* 显示当前时间
*/
function showTime(obj) {
		var weeks = [
			'星期天',
			'星期一',
			'星期二',
			'星期三',
			'星期四',
			'星期五',
			'星期六'
		];
		var myDate = new Date();
		var year = myDate.getFullYear(),
			month = myDate.getMonth() + 1,
			date = myDate.getDate(),
			day = weeks[myDate.getDay()],
			hours = checkTime(myDate.getHours()),
			minutes = checkTime(myDate.getMinutes()),
			seconds = checkTime(myDate.getSeconds()),
			timeShow = document.getElementById("time"),
			apm = 'AM';
			if(hours >= 12) {
				apm = 'PM';
			}
			obj.innerHTML = year + '年' + month + '月' + date + '日' + day + hours + ":" + minutes + ':' + seconds  + apm;
			setTimeout(showTime,500);
	}
	
	/*
	* @给定一个日期，显示从当前时间到指定日期剩余时间
	* @params object obj
	* @params string timeLine '2016/6/24, 12:24:24'
	* @return null;
	*/
	function showLeftTime(obj,timeLine) {
		var curTime = new Date(), //获取当前时间
			timer,
			endTime = new Date(timeLine), //获取截止时间
			leftTime = endTime - curTime,
			leftDay = Math.floor(leftTime / (1000 * 60 * 60 * 24)),  //剩余天数
			leftHours = Math.floor(leftTime / (1000 * 60 * 60)) % 24, //剩余小时
			leftMinutes = Math.floor(leftTime / (1000 * 60)) % 60, //剩余分钟
			leftSeconds = Math.floor(leftTime / (1000)) % 60; //剩余秒数
			leftMinutes = checkTime(leftMinutes); //十位补零
			leftSeconds = checkTime(leftSeconds);
			if(leftDay == 0 && leftHours == 0 && leftMinutes == '00' && leftSeconds == '00'){
				obj.innerHTML = '倒计时结束';
				clearTimeout(timer);
				return;
			}
			obj.innerHTML = '距离截止日期还剩余: ' + leftDay + '天' + leftHours + '小时' + leftMinutes + '分' + leftSeconds + '秒';
			timer = setTimeout(function(){
				showLeftTime(obj, timeLine);
			}); 
	}
	
	/*
	* @params integer i
	* @return string
	*/
	function checkTime(i) {
		if(i < 10) {
			i = '0' + i;
		}
		return i;
	}

/*
* 动画效果
* @object obj
* @object json
* @function fn
* return null
*/
function startMove(obj, json, fn) {
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				var flag = true;
				for(var attr in json) {

					if(attr == 'opacity') {
						var icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
					} else {
						var icur = parseInt(getStyle(obj, attr));
					}
					var speed = (json[attr] - icur) / 5;
					    speed = (speed > 0) ? Math.ceil(speed) : Math.floor(speed);
					if(icur != json[attr]) {
						flag = false;
					}
					if(attr == "opacity"){
						obj.style.filter = 'alpha(opacity='+ (icur + speed) + ')';
						obj.style[attr] = (icur + speed) / 100;
					} else {
						obj.style[attr] = icur + speed + 'px';

					}

				}
				if(flag) {
					clearInterval(obj.timer);
					if(fn) {
						fn();
					}
				}
			},30);
	}

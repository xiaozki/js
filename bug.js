/*
* 跨浏览器获取css属性
*/
function getStyle(obj, attr) { 
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

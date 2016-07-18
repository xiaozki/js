<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		*{margin:0; padding:0;}
		#clock{
			position:relative;
		}
		#pointer{
			display:block;
			position:absolute;
			left:0;
			top:0;
			z-index:-1;
		}
	</style>
</head>
<body>
	<canvas id="clock" style="display:block;"></canvas>
	<canvas id="pointer"></canvas>
	<script>
		var CLOCK_RADIUS = 180;
		var HOUR_POINTER = 70;
		var MIN_POINTER = 110;
		var SEC_POINTER = 140
		var HOUR_THETA = Math.PI * 2 / 12;
		var SEC_THETA = Math.PI * 2 / 60;
		var clock = document.getElementById("clock");   //表盘画布
		var pointer = document.getElementById("pointer"); //指针画布
		clock.width = 400;
		clock.height = 400;
		pointer.width = 400;
		pointer.height = 400;
		var ctx = clock.getContext("2d");
		var pCtx = pointer.getContext("2d");
		pCtx.translate(200,200);
		ctx.translate(200,200);
		ctx.beginPath(); //绘制表盘
		ctx.arc(0, 0, CLOCK_RADIUS, 0, 2*Math.PI);
		ctx.arc(0, 0, CLOCK_RADIUS + 10, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();

		ctx.beginPath(); //绘制圆心
		ctx.arc(0, 0, 4, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();

		ctx.font = '24px Arial'; //绘制数字
		ctx.fillStyle = '#000';
		ctx.textAlign = "center";
		ctx.textBaseLine = 'middle';
		for(var n = 1; n <= 12; n++) {
			var theta = (n - 3) * HOUR_THETA;
			var x = CLOCK_RADIUS * 0.8 * Math.cos(theta);
			var y = CLOCK_RADIUS * 0.8 * Math.sin(theta) + 10;
			ctx.fillText(n, x, y);
		}

		for(var n = 5; n < 65; n++) {
			theta = SEC_THETA * (n - 5);
			x = CLOCK_RADIUS * Math.cos(theta);
			y = CLOCK_RADIUS * Math.sin(theta);
			if(n % 5 == 0) {
				x1 = x - 10 * Math.cos(theta);
				y1 = y - 10 * Math.sin(theta);
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x1, y1);
				ctx.stroke();
			} else {
				ctx.beginPath();
				ctx.arc(x, y, 2, 0, 2*Math.PI);
				ctx.fill();
			}
		}
		setInterval(function() {          //更新时间
			var time = new Date();
			var hours = time.getHours();
			var minutes = time.getMinutes();
			var seconds = time.getSeconds();
			pCtx.beginPath();
			pCtx.arc(0,0,200,0,2*Math.PI);
			pCtx.fillStyle = "white";
			pCtx.fill();
			drawHour(hours, minutes);
			drawMin(minutes, seconds);
			drawSec(seconds);
		},500);
		function drawHour(hour, min) {  //画时针
			pCtx.restore();
			pCtx.beginPath();
			var theta = ((hour - 3) + min / 60) * HOUR_THETA;
			var x = HOUR_POINTER * Math.cos(theta);
			var y = HOUR_POINTER * Math.sin(theta);
			pCtx.strokeStyle = "red";
			pCtx.moveTo(0,0);
			pCtx.lineTo(x, y);
			pCtx.stroke();
			
		}
		function drawMin(min) {  //画分针
			pCtx.beginPath();
			var theta = (min - 14) * SEC_THETA;
			var x = MIN_POINTER * Math.cos(theta);
			var y = MIN_POINTER * Math.sin(theta);
			pCtx.moveTo(0,0);
			pCtx.lineTo(x, y);
			pCtx.strokeStyle = "orange";
			pCtx.stroke();
		}
		function drawSec(sec) {  //画秒针
			pCtx.beginPath();
			var theta = (sec - 14)* SEC_THETA;
			var x = SEC_POINTER * Math.cos(theta);
			var y = SEC_POINTER * Math.sin(theta);
			pCtx.moveTo(0,0);
			pCtx.lineTo(x, y);
			pCtx.strokeStyle = "purple";
			pCtx.stroke();
		}
	</script>
</body>
</html>

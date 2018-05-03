function getCanvasId() {
	var h5Canvas = document.getElementById('h5-circle');
	drawCircle(h5Canvas,90,'html5');
	var cssCanvas = document.getElementById('css3-circle');
	drawCircle(cssCanvas,90,'css3');
	var jsCanvas = document.getElementById('js-circle');
	drawCircle(jsCanvas,90,'javascript');
	var jqueryCanvas = document.getElementById('jquery-circel');
	drawCircle(jqueryCanvas,85, 'jquery');
	var lessCanvas = document.getElementById('less-circle');
	drawCircle(lessCanvas,85, 'less');
	var bootstrapCanvas = document.getElementById('bootstrap-circle');
	drawCircle(bootstrapCanvas,85,'bootstrap');
	var vueCanvas = document.getElementById('vue-circle');
	drawCircle(vueCanvas,85,'vue');
	var webpackCanvas = document.getElementById('webpack-circle');
	drawCircle(webpackCanvas,85,'webpack');
	var psCanvas = document.getElementById('ps-circle');
	drawCircle(psCanvas,70,'ps');
}
/**绘制百分比圆环 */
function drawCircle(element,value,lable) {
	// let lable = lable;
	let context = element.getContext("2d");
	let centerX = element.width / 2;
	let centerY = element.height / 2;
	let dAngle = Math.PI*2/100;	//每次增加的角度

	let lineWidth = 10;
	let radius = centerX - lineWidth;
	//背景圆环和项目文字标注
	function backGroundCircle() {
		context.save();
		context.beginPath();
		context.lineWidth = lineWidth;
		context.lineCap = "round";
		context.strokeStyle = "white";
		context.arc(centerX,centerY,radius,0,2*Math.PI);
		context.stroke();
		context.closePath();
		context.restore();
	}

	//动态圆环
	function dynamicCircle(n){
		context.save();
		let color = "";
		if (value >= 90) {
			color = '#1AE6E6'
		} else if (value < 90 && value >= 80) {
			color = '#22DDB8'
		} else {
			color = '#2BD591'
		}
		context.strokeStyle = color;
		context.lineWidth = lineWidth;
		context.lineCap = "round";
		context.beginPath();
		context.arc(centerX,centerY,radius,-Math.PI/2,-Math.PI/2+n*dAngle,false);
		context.stroke();
		context.closePath();
		context.restore();
	}
	//文字
	function text(n){
		let fontSize = 10
		context.save();
		context.fillStyle = "white";
		context.font = fontSize+'pt Helvetica';
		context.textAlign = 'center';
		context.textAlignBaseline = 'middle';
		let textWidth = context.measureText(n.toFixed(0)+"%").width;
		// context.moveTo(centerX,centerY);
		context.fillText(n.toFixed(0)+"%",centerX,centerY-20);
		context.fillText(lable,centerX,centerY+20);
		context.restore();
	}

	let startValue = 0;
	function start(){
		window.requestAnimationFrame(start);
		context.clearRect(0,0,element.width,element.height);
		backGroundCircle();
		text(startValue);
		dynamicCircle(startValue);
		if(startValue>=value) return;
		startValue++;
	}

	start();
}

$(document).ready(function () {
	/*滚动屏幕*/
	var wrap = document.getElementById('wrap');
	var h = Window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight;
	$('#container').height(h);
	$('.cover').height(h);

	var startTime = 0;
	endTime = 0;
	now = 0;
	//浏览器兼容      
	if ((navigator.userAgent.toLowerCase().indexOf("firefox") != -1)) {
		document.addEventListener("DOMMouseScroll", scrollFun, false);
	} else if (document.addEventListener) {
		document.addEventListener("mousewheel", scrollFun, false);
	} else if (document.attachEvent) {
		document.attachEvent("onmousewheel", scrollFun);
	} else {
		document.onmousewheel = scrollFun;
	}

	function scrollFun(e) {
		startTime = new Date().getTime();
		/*mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
	    DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动*/
		var event = e || window.event;
		var delta = event.detail || (-event.wheelDelta);
		if ((endTime - startTime) < -1000) {
			if (delta > 0 && parseInt(wrap.offsetTop) > -(h * 3)) {
				console.log(wrap.offsetTop);
				//向下滚动
				now = now - h;
				toPage(now);
			}
			if (delta < 0 && parseInt(wrap.offsetTop) < 0) {
				//向上滚动
				now = now + h;
				toPage(now);
			}
			endTime = new Date().getTime();
		} else {
			event.preventDefault();
		}
	}

	function toPage(now) {
		$('#wrap').animate({
			top: (now + 'px')
		}, 1000);
		if (now == 0) {
			var indexAnimation = document.querySelector('#home');
			setTimeout(function () {
				playAnimation(indexAnimation, 'index-animation');
			}, 200)
			// playAnimation(title, 'rubberBand');
		}
		if (now == -h) {
			var introWrap = document.querySelector('.intro-wrap');
			playAnimation(introWrap, 'rotate');
			var about = document.querySelector('#about');
			playAnimation(about, 'rubberBand');
		}
		if (now == -2 * h) {
			var exprience = document.querySelector('#exprience');
			playAnimation(exprience, 'rubberBand');
		}
		if (now == -3 * h) {
			var selfSkill = document.querySelector('#self-skill');
			playAnimation(selfSkill, 'rubberBand');
			setTimeout(function () {
				getCanvasId();
			}, 500);
		}
	}

	function playAnimation(element, className) {
		element.classList.add(className);
		element.addEventListener('animationend', function () {
			element.classList.remove(className);
		});
	}
	$('#home-btn').click(function () {
		$('.nav li').removeClass('active');
		toPage(0);
		$('#home-btn').toggleClass('active');
	})
	$('#PageOne-btn').click(function () {
		$('.nav li').removeClass('active');
		toPage(-h);
		$('#PageOne-btn').toggleClass('active');
	})
	$('#PageTwo-btn').click(function () {
		$('.nav li').removeClass('active');
		toPage(-2 * h);
		$('#PageTwo-btn').toggleClass('active');
	})
	$('#PageThree-btn').click(function () {
		$('.nav li').removeClass('active');
		toPage(-3 * h);
		$('#PageThree-btn').toggleClass('active');
	})
	/*控制音乐的播放与暂停*/
	var audioTag = document.getElementById('audio-tag');
	var isPlaying = true;
	$('.icon-wrap').click(function () {
		if (isPlaying) {
			audioTag.pause();
			isPlaying = false;
			$('.icon-wrap').css('animation-play-state', 'paused');
			$('.icon-wrap').css('-webkit-animation-play-state', 'paused');
		} else {
			audioTag.play();
			isPlaying = true;
			$('.icon-wrap').css('animation-play-state', 'running');
			$('.icon-wrap').css('-webkit-animation-play-state', 'running');
		}

	})
	/*检测屏幕大小*/
	var w = window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth;
	testScreen(w);
	$(window).resize(function () {
		setTimeout(function () {
			w = window.innerWidth ||
				document.documentElement.clientWidth ||
				document.body.clientWidth;
			testScreen(w);
			$('.cover').height(h);
		}, 200);
	})
})

function testScreen(w) {
	if (w <= 768) {
		console.log("resize");
		$('canvas').attr('width', 80);
		$('canvas').attr('height', 80);
	}
	if (w > 768) {
		console.log("daping");
		$('canvas').attr('width', 120);
		$('canvas').attr('height', 120);
	}
	getCanvasId();
}
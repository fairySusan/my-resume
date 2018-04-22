function getCanvasId(){
	var h5Canvas = document.getElementById('h5-circle');
	drawSkillCircle(90,80,h5Canvas,'html5');
	var cssCanvas = document.getElementById('css3-circle');
	drawSkillCircle(90,80,cssCanvas,'css3');
	var jsCanvas= document.getElementById('js-circle');
	drawSkillCircle(90,80,jsCanvas,'javascript');
	var jqueryCanvas= document.getElementById('jquery-circel');
	drawSkillCircle(85,80,jqueryCanvas,'jquery');
	var lessCanvas= document.getElementById('less-circle');
	drawSkillCircle(85,80,lessCanvas,'less');
	var bootstrapCanvas= document.getElementById('bootstrap-circle');
	drawSkillCircle(85,80,bootstrapCanvas,'bootstrap');
	var vueCanvas= document.getElementById('vue-circle');
	drawSkillCircle(85,80,vueCanvas,'vue');
	var webpackCanvas= document.getElementById('webpack-circle');
	drawSkillCircle(85,80,webpackCanvas,'webpack');
	var psCanvas= document.getElementById('ps-circle');
	drawSkillCircle(70,80,psCanvas,'ps');
}
function drawSkillCircle(value,average,myCanvas,text){
	var _this = $(myCanvas),//多次使用的值通过这种方式缓存起来
		value= Number(value),// 当前百分比,数值
		average = Number(average);// 平均百分比
	var color;
	if (value>89) {
		color = '#1AE6E6'
	}else if(value<90 && value>79){
		color = '#22DDB8'
	}else{
		color = '#2BD591'
	}
	var canvasW = _this.width();
	var canvasH = _this.height();
	var ctx = myCanvas.getContext("2d");
	ctx.clearRect(0,0,canvasW, canvasH);
	ctx.beginPath();
	ctx.moveTo(canvasW/2, canvasH/2);
	ctx.arc(canvasW/2,canvasH/2,canvasW/2,0,2*Math.PI);
	ctx.strokeStyle = 'transparent';
	ctx.stroke();
	ctx.closePath();
	ctx.fillStyle = '#FFF';
	ctx.fill();
	function drawBlank(cur){
		ctx.beginPath();
		ctx.moveTo(canvasW/2,0);
		ctx.arc(canvasW/2,canvasH/2,canvasW/2-10,0,2*Math.PI);
		ctx.closePath();
		ctx.fillStyle = '#70CAFF';  // 填充内部颜色
		ctx.fill();

		// 绘制内圆
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineCap = 'square';
		ctx.closePath();
		ctx.lineWidth = 10;
		ctx.arc(canvasW/2, canvasH/2, canvasH/2-5, -(Math.PI / 2), ((Math.PI * 2) * cur ) - Math.PI / 2, false);
		ctx.stroke();

		ctx.font = '10pt Arial';
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textAlignBaseline = 'middle';
		ctx.moveTo(canvasW/2, canvasH/2);
		ctx.fillText(value+"%", canvasW/2, canvasH/2-20);
		ctx.fillText(text, canvasW/2, canvasH/2+20);
	}

	var timer = null,n=0;
	function loadCanvas(nowT){
		timer = setInterval(function(){
			if (n>nowT) {
				clearInterval(timer);
			}else{
				drawBlank(n);
				n+=0.01;
			}

		},15)
	}
	loadCanvas(value/100);
	timer = null;
}

$(document).ready(function(){
	/*滚动屏幕*/
	// var wrap = $('#wrap');
	var wrap = document.getElementById('wrap');
	var h = Window.innerHeight 
				|| document.documentElement.clientHeight 
				|| document.body.clientHeight;
	$('#container').height(h);
	$('.cover').height(h);
    var startTime = 0;
			endTime = 0;
			now = 0;
	//浏览器兼容      
    if ((navigator.userAgent.toLowerCase().indexOf("firefox")!=-1)){   
        document.addEventListener("DOMMouseScroll",scrollFun,false);        
    }  
    else if (document.addEventListener) {  
        document.addEventListener("mousewheel",scrollFun,false);  
    }  
    else if (document.attachEvent) {  
        document.attachEvent("onmousewheel",scrollFun);   
    }  
    else{  
        document.onmousewheel = scrollFun;  
    }  
    function scrollFun(e){
		startTime = new Date().getTime();
		/*mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
	    DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动*/
	    var event = e || window.event;  
	    var delta = event.detail || (-event.wheelDelta);
	    if ((endTime - startTime) < -500) {
	    	if (delta>0 && parseInt(wrap.offsetTop)>-(h*3))  {
	    		console.log(wrap.offsetTop);
	    		//向下滚动
                now = now - h;
                toPage(now);
	    	}
	    	if(delta<0 && parseInt(wrap.offsetTop)<0){
	    		//向上滚动
                now = now + h;
                toPage(now);
	    	} 
	    	endTime = new Date().getTime();
	    }else{  
            event.preventDefault();    
        }   
	}
	function toPage(now){
		$('#wrap').animate({top:(now+'px')},1000);
		if (now == 0) {
			var indexAnimation = document.querySelector('#home');
			setTimeout(function(){
				playAnimation(indexAnimation,'index-animation');
			},200)
			playAnimation(title,'rubberBand');
		}
		if (now == -h) {
			var introWrap = document.querySelector('.intro-wrap');
			playAnimation(introWrap,'rotate');
			var about = document.querySelector('#about');
			playAnimation(about,'rubberBand');
		}
		if (now == -2*h) {
			var exprience = document.querySelector('#exprience');
			playAnimation(exprience,'rubberBand');
		}
		if(now == -3*h){
			var selfSkill = document.querySelector('#self-skill');
			playAnimation(selfSkill,'rubberBand');
			setTimeout(function(){
				getCanvasId();
			},500);
		}
	}
	function playAnimation(element,className){
		element.classList.add(className);
		element.addEventListener('animationend', function(){
			element.classList.remove(className);
		});
	}
	$('#home-btn').click(function(){
		$('.nav li').removeClass('active');
		toPage(0);
		$('#home-btn').toggleClass('active');
	})
	$('#PageOne-btn').click(function(){
		$('.nav li').removeClass('active');
		toPage(-h);
		$('#PageOne-btn').toggleClass('active');
	})
	$('#PageTwo-btn').click(function(){
		$('.nav li').removeClass('active');
		toPage(-2*h);
		$('#PageTwo-btn').toggleClass('active');
	})
	$('#PageThree-btn').click(function(){
		$('.nav li').removeClass('active');
		toPage(-3*h);
		$('#PageThree-btn').toggleClass('active');
	})
	/*控制音乐的播放与暂停*/
	var audioTag = document.getElementById('audio-tag');
	var isPlaying = true;
	$('.icon-wrap').click(function(){
		if (isPlaying) {
			audioTag.pause();
			isPlaying=false;
			$('.icon-wrap').css('animation-play-state','paused');
			$('.icon-wrap').css('-webkit-animation-play-state','paused');
		}else{
			audioTag.play();
			isPlaying=true;
			$('.icon-wrap').css('animation-play-state','running');
			$('.icon-wrap').css('-webkit-animation-play-state','running');
		}
		
	})
	/*检测屏幕大小*/
	var w=window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;
	testScreen(w);
	$(window).resize(function(){
		setTimeout(function(){
			w=window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;
			testScreen(w);
			},200);
	})
})
function testScreen(w){
	if (w<=768) {
		console.log("resize");
		$('canvas').attr('width',80);
		$('canvas').attr('height',80);
	}
	if(w>768){
		console.log("daping");
		$('canvas').attr('width',120);
		$('canvas').attr('height',120);
	}
	getCanvasId();
}

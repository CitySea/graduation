function star(id){

	var _canvas = document.getElementById(id);
	var _ctx = _canvas.getContext("2d");
	var dotsArray = [];
	var dots = function(){
		//画布
		this.canvas;
		this.ctx;

		//点大小
		this.dx;
		this.dy;
		this.r;

		//速度基值恒为2
		this.speed = .5;
		this.sx;
		this.sy;
		this.isMouseDot = 0;
	}
	dots.prototype = {
		//点的初始化
		init: function(canvas,dx,dy,ismousedot){
			this.canvas = canvas;
			this.ctx = this.canvas.getContext("2d");

			//一开始随机生成dx,dy
					

			if(ismousedot == 1){
				this.dx = 0;
				this.dy = 0;
			}else{
				this.dx = dx*2 || Math.random() * this.canvas.width;
				this.dy = dy*2 || Math.random() * this.canvas.height;
			}

			//半径恒为1
			this.r = 1;

			//点的轨迹速度和方向
			this.sx = ismousedot ? 0 : Math.random() * this.speed * 2 - this.speed;
			this.sy = ismousedot ? 0 : Math.random() * this.speed * 2 - this.speed;

			//绘制随机点
			this.ctx.beginPath();//开启绘制路径
			this.ctx.arc(this.dx, this.dy, this.r, 0, 2*Math.PI);//绘制弧线或圆
			this.ctx.fillStyle = "rgba(0,0,0,.5)";//设置填充颜色
			this.ctx.fill();
			this.ctx.closePath();//关闭绘制路径
		},
				//点的"移动"
		dotmove: function(){
			//下一帧点的位置
			this.dx += this.sx;
			this.dy += this.sy;
					
			if(this.dx<0 || this.dx > this.canvas.width || this.dy<0 || this.dy > this.canvas.height){
				this.init(this.canvas);
			}
					

			//绘制下一帧的点
			this.ctx.beginPath();//开启绘制路径
			this.ctx.arc(this.dx, this.dy, this.r, 0, 2*Math.PI);//绘制弧线或圆
			this.ctx.fillStyle = "rgba(208,208,208,.5)";//设置填充颜色
			this.ctx.fill();
			this.ctx.closePath();//关闭绘制路径
		},
		//鼠标固定的点
		mousedot: function(x,y) {
			this.dx = x;
			this.dy = y;

			this.ctx.beginPath();//开启绘制路径
			this.ctx.arc(this.dx, this.dy, this.r, 0, 2*Math.PI);//绘制弧线或圆
			this.ctx.fillStyle = "rgba(208,208,208,.5)";//设置填充颜色
			this.ctx.fill();
			this.ctx.closePath();//关闭绘制路径
		}
	}

	//生成点
	for(let i = 0; i < 21; i++){
		var dot = new dots();
				
				
		if( i<20 ){
			dot.init(_canvas);
		}else{
			dot.init(_canvas,0,0,1);
		}
		dotsArray.push(dot);
	}
	//Polyfilla
	window.requestAnimationFrame = (function(){
		return window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function( callback ){
			window.setTimeout(callback, 1000/60);
		}
	})();

	requestAnimationFrame(move);

	//实现移动
	function move(){
		_ctx.clearRect(0, 0, _canvas.width, _canvas.height);
		//点移动
		for(let i = 0 ; i < dotsArray.length; i++){
			dotsArray[i].dotmove();
		}
		//绘制连线
		for(let i = 0; i < dotsArray.length; i++){
			for(let j = i + 1; j < dotsArray.length; j++){
				let maxLen = 100;
				let _dx = dotsArray[i].dx - dotsArray[j].dx;
				let _dy = dotsArray[i].dy - dotsArray[j].dy;
				let reaLen = Math.abs(Math.sqrt(Math.pow(_dx, 2) + Math.pow(_dy, 2)));
				let alpha  = 0;
				if(reaLen <= maxLen){
					alpha  = (maxLen-reaLen)/maxLen;
				}
				_ctx.beginPath();
				_ctx.moveTo(dotsArray[i].dx , dotsArray[i].dy);
				_ctx.lineTo(dotsArray[j].dx , dotsArray[j].dy);
				_ctx.strokeStyle = 'rgba(208,208,208,'+alpha+')';
				_ctx.strokeWidth = 1;
				_ctx.stroke();
				_ctx.closePath();
			}
		} 
		requestAnimationFrame(move);
	}

	//canvas添加监听鼠标事件
	_canvas.addEventListener("mouseenter",dotEnter);
	_canvas.addEventListener("mousemove",dotMove);
	_canvas.addEventListener("mouseleave",dotLeave);
	//鼠标进入事件
			
	function dotEnter(e){
		dot.init(_canvas,e.pageX,e.pageY ,1);
	}
	//鼠标滑动事件
	function dotMove(e){
		let _tx = e.pageX;
		let _ty = e.pageY;
		if(_tx > 0 && _tx < _canvas.width && _ty > 0 && _ty < _canvas.height){
			dot.mousedot(_tx , _ty);
		} 
	}
	//鼠标离开事件
	function dotLeave(e){
		dot.init(_canvas);
	}
}

export { star }



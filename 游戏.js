window.onload = opengame;      //当页面加载完成是调用函数
window.onmousemove = mouseMove;   //鼠标移动事件
window.onkeydown =keyDown;        // 键盘左右键点击事件

//画布变量集体声明
var canvas,cW,cH,ctx;
//图片变量声明
var bg,ball,board;

var str;  // 定时器变量声明

var boardX,boardY,boardW,boardH;   // 挡板x、y轴坐标，宽高变量声明
boardX =400;
boardY =700;
boardW =150;
boardH =20;

var ballX,ballY,vX,vY;       // 球x、y轴坐标，沿x、y轴变化变量声明
ballX = 350;
ballY =350;
//vX =8;
//vY =4;
vX =Math.random()*10;
vY =Math.random()*10;

cW =1000;    // 画布宽
cH =800;      // 画布高

var bricks =[];   // 声明接收砖块属性的数组
var imgW,imgH;    // 砖块的宽高
imgW =150;
imgH =50;

//初始化游戏设置和参数
function opengame(){
	trace("游戏初始化完毕！");
	canvas =document.getElementById('canva');     //canvas内不能绘制
	ctx =canvas.getContext("2d");          // 绘图环境
	//背景
	bg =addImg("images/assets/bg.png");      // 调用函数addImg（）生成图片
//	bg =new Image();
//	bg.src ="images/assets/bg.png";
//	bg.onload=function(){
//		ctx.drawImage(bg,0,0);
//	}
	//球
	ball =addImg("images/assets/ball.png");
	//挡板
	board =addImg("images/assets/board.png");
	
    str =setInterval(updateCanvas,1000/60);    //定时器
    
    creatBricks();        // 调用砖块生成函数
}

//刷新画布
function updateCanvas(){
	ctx.clearRect(0,0,1200,800);     // 清除画布图片
	ctx.drawImage(bg,0,0);             // 绘制图片
	ctx.drawImage(ball,ballX,ballY);
	ctx.drawImage(board,boardX,boardY);	
	
	sportsBall();       //调用球运动函数
	ballCrashBoard();      //调用球和挡板碰撞函数
	
	drawBricks();        // 调用砖块绘制函数
	brickCrashBall();      // 调用砖块与球撞击函数
}

//生成图片
function addImg(_src){             
	var img =new Image();
	img.src =_src;
	return img;
}

//鼠标移动事件
function mouseMove(e){
	boardX =e.clientX - boardW/2;
//	boardY =e.clientY-boardH/2;
}

//键盘事件
function keyDown(e){
	if(e.keyCode ==37&&boardX>0){
		boardX -=10;
	}
	if(e.keyCode ==39){
		boardX +=10;
	}
}

//球运动
function sportsBall(){
	ballX +=vX;
	ballY +=vY;
	if(ballX >=cW-ball.width){
		vX *=-1;		
	}
	if(ballX <=0){
		vX *=-1;
	}	
	if(ballY<30){
		ballY =30;
		vY *=-1;
	}else if(ballY>700){
//		trace("Game Over!");
	}
}

//碰撞检测
function crashCheck(x1,y1,w,h,x2,y2){	
	if(x2>x1&& y2 > y1 && x2 < x1 + w && y2 < y1 + h){
		return true;
	}else{
		return false;
	}
}

//判断球与挡板碰撞
function ballCrashBoard(){
	var crash =crashCheck(boardX,boardY-50,boardW+50,boardH,ballX,ballY);
	if(crash){
//      ballY = boardY - 50;       
		vY *=-1;
		vX *=-1;
	}
}

//生成砖块
function creatBricks(){
	for(var i =0;i<6;i++){
		for(var j=0;j<4;j++){
//			var str ="images/assets/"+parseInt(Math.random()*10/2)+".png";
			var bimg =addImg("images/assets/3.png");
			var x =i*(imgW+10)+25;
			var y =j*(imgH+5)+30;
			var obj ={bimg:bimg,x:x,y:y}
			bricks.push(obj);
		}
	}

}
//绘制砖块
function drawBricks(){
	var len =bricks.length;
	for(var i =0;i<len;i++){
		var bimg =bricks[i];
		ctx.drawImage(bimg.bimg,bimg.x,bimg.y);
	}	
}

//砖块与球碰撞检测
function brickCrashBall(){
	var len =bricks.length;
	for(var i=0;i<len;i++){
		var bimg =bricks[i].bimg;
		var crash =crashCheck(bricks[i].x,bricks[i].y,bimg.width,bimg.height,ballX,ballY);
		if(crash){
			bricks.splice(i,1);
			vY *= -1;
//			bimg =null;
		}
	}
}

//简化输出信息
function trace(msg){
	console.log(msg)
}

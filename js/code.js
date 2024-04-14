$(function() {
	// 存放随机的验证码
	var showNum = []

	draw(showNum)

	$("#c1").click(function() {
		draw(showNum)
	})
	$(".register_i").click(function() {
		var s = $("#inputValue").val().toLowerCase()
		var s1 = showNum.join("")
		if (s == s1) {
			alert("提交成功")
		} else {
			alert("验证码错误")
		}
		draw(showNum)
	})

	function draw(showNum) {
		var canvas = $("#c1")
		var ctx = canvas[0].getContext("2d")
		// 画布的宽高
		var canvas_width = canvas.width()
		var canvas_height = canvas.height()
		//  清空之前绘制的内容
		ctx.clearRect(0, 0, canvas_width, canvas_height)

		var scode =
			"a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,"
		var arrCode = scode.split(",")
		var arrLength = arrCode.length
		for (var i = 0; i < 4; i++) {
			var index = Math.floor(Math.random() * arrCode.length)
			var txt = arrCode[index] //随机一个字符
			showNum[i] = txt.toLowerCase() //转化为小写存入验证码数组
			// 开始控制字符的绘制位置
			var x = 10 + 20 * i //每一个验证码绘制的起始点x坐标
			var y = 20 + Math.random() * 8 // 起始点y坐标

			ctx.font = "bold 20px 微软雅黑"
			// 开始旋转字符
			var deg = Math.random * -0.5
			// canvas 要实现绘制内容具有倾斜的效果，必须先平移，目的是把旋转点移动到绘制内容的地方
			ctx.translate(x, y)
			ctx.rotate(deg)
			// 设置绘制的随机颜色
			ctx.fillStyle = randomColor()
			ctx.fillText(txt, 0, 0)

			// 把canvas复原
			ctx.rotate(-deg)
			ctx.translate(-x, -y)

		}
		for (var i = 0; i < 30; i++) {
			if (i < 5) {
				// 绘制线
				ctx.strokeStyle = randomColor()
				ctx.beginPath()
				ctx.moveTo(Math.random() * canvas_width, Math.random() * canvas_height)
				ctx.lineTo(Math.random() * canvas_width, Math.random() * canvas_height)
				ctx.stroke()
			}
			// 绘制点
			ctx.strokeStyle = randomColor()
			ctx.beginPath()
			var x = Math.random() * canvas_width
			var y = Math.random() * canvas_height
			ctx.moveTo(x, y)
			ctx.lineTo(x + 1, y + 1)
			ctx.stroke()
		}
	}

	// 随机颜色
	function randomColor() {
		var r = Math.floor(Math.random() * 256)
		var g = Math.floor(Math.random() * 256)
		var b = Math.floor(Math.random() * 256)
		return `rgb(${r},${g},${b})`
	}
})